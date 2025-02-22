import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import { trackEvent } from '~app/plausible'
import { chatFamily, topicAtom } from '~app/state'
import { setConversationMessages } from '~services/chat-history'
import { ChatMessageModel } from '~types'
import { uuid } from '~utils'
import { ChatError } from '~utils/errors'
import { BotId } from '../bots'

export function useChat(botId: BotId) {
  const chatAtom = useMemo(() => chatFamily({ botId, page: 'singleton' }), [botId])
  const [chatState, setChatState] = useAtom(chatAtom)

  const updateMessage = useCallback(
    (messageId: string, updater: (message: ChatMessageModel) => void) => {
      setChatState((draft) => {
        const message = draft.messages.find((m) => m.id === messageId)
        if (message) {
          updater(message)
        }
      })
    },
    [setChatState],
  )

  const sendMessage = useCallback(
    async (input: string, image?: File) => {
      trackEvent('send_message', { botId, withImage: !!image })

      const botMessageId = uuid()
      setChatState((draft) => {
        draft.messages.push(
          { id: uuid(), text: input, image, author: 'user' },
          { id: botMessageId, text: '', author: botId },
        )
      })

      const abortController = new AbortController()
      setChatState((draft) => {
        draft.generatingMessageId = botMessageId
        draft.abortController = abortController
      })

      const resp = await chatState.bot.sendMessage({
        prompt: input,
        image,
        signal: abortController.signal,
      })

      try {
        for await (const text of resp) {
          updateMessage(botMessageId, (message) => {
            message.text = text
          })
        }
      } catch (err: unknown) {
        if (!abortController.signal.aborted) {
          abortController.abort()
        }
        const error = err as ChatError
        console.error('sendMessage error', error.code, error)
        updateMessage(botMessageId, (message) => {
          message.error = error
        })
        setChatState((draft) => {
          draft.abortController = undefined
          draft.generatingMessageId = ''
        })
      }

      setChatState((draft) => {
        draft.abortController = undefined
        draft.generatingMessageId = ''
      })
    },
    [botId, chatState.bot, setChatState, updateMessage],
  )

  const resetConversation = useCallback(() => {
    chatState.bot.resetConversation()
    setChatState((draft) => {
      draft.abortController = undefined
      draft.generatingMessageId = ''
      draft.messages = []
      draft.conversationId = uuid()
    })
  }, [chatState.bot, setChatState])

  const stopGenerating = useCallback(() => {
    chatState.abortController?.abort()
    if (chatState.generatingMessageId) {
      updateMessage(chatState.generatingMessageId, (message) => {
        if (!message.text && !message.error) {
          message.text = 'Cancelled'
        }
      })
    }
    setChatState((draft) => {
      draft.generatingMessageId = ''
    })
  }, [chatState.abortController, chatState.generatingMessageId, setChatState, updateMessage])

  // Get the current topic from the topic atom
  const [topic] = useAtom(topicAtom)

  useEffect(() => {
    if (chatState.messages.length) {
      // Pass the topic parameter to setConversationMessages
      setConversationMessages(botId, topic, chatState.conversationId, chatState.messages)
    }
  }, [botId, topic, chatState.conversationId, chatState.messages])
  
  const chat = useMemo(
    () => ({
      botId,
      bot: chatState.bot,
      messages: chatState.messages,
      sendMessage,
      resetConversation,
      generating: !!chatState.generatingMessageId,
      stopGenerating,
    }),
    [
      botId,
      chatState.bot,
      chatState.generatingMessageId,
      chatState.messages,
      resetConversation,
      sendMessage,
      stopGenerating,
    ],
  )

  return chat
}
