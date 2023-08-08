import { zip } from 'lodash-es'
import Browser from 'webextension-polyfill'
import { BotId } from '~app/bots'
import { ChatMessageModel } from '~types'

/**
 * conversations:$botId:$topic => Conversation[]
 * conversation:$botId:$topic:$cid:messages => ChatMessageModel[]
 */

interface Conversation {
  id: string
  createdAt: number
}

type ConversationWithMessages = Conversation & { messages: ChatMessageModel[] }

// Add a topic parameter to loadHistoryConversations
async function loadHistoryConversations(botId: BotId, topic: string): Promise<Conversation[]> {
  const key = `conversations:${botId}:${topic}`
  const { [key]: value } = await Browser.storage.local.get(key)
  return value || []
}

// Add a topic parameter to deleteHistoryConversation
async function deleteHistoryConversation(botId: BotId, topic: string, cid: string) {
  const conversations = await loadHistoryConversations(botId, topic)
  const newConversations = conversations.filter((c) => c.id !== cid)
  await Browser.storage.local.set({ [`conversations:${botId}:${topic}`]: newConversations })
}

// Add a topic parameter to loadConversationMessages
async function loadConversationMessages(botId: BotId, topic: string, cid: string): Promise<ChatMessageModel[]> {
  const key = `conversation:${botId}:${topic}:${cid}:messages`
  const { [key]: value } = await Browser.storage.local.get(key)
  return value || []
}

// Add a topic parameter to setConversationMessages
export async function setConversationMessages(botId: BotId, topic: string, cid: string, messages: ChatMessageModel[]) {
  const conversations = await loadHistoryConversations(botId, topic)
  if (!conversations.some((c) => c.id === cid)) {
    conversations.unshift({ id: cid, createdAt: Date.now() })
    await Browser.storage.local.set({ [`conversations:${botId}:${topic}`]: conversations })
  }
  const key = `conversation:${botId}:${topic}:${cid}:messages`
  await Browser.storage.local.set({ [key]: messages })
}

// Add a topic parameter to loadHistoryMessages
export async function loadHistoryMessages(botId: BotId, topic: string): Promise<ConversationWithMessages[]> {
  const conversations = await loadHistoryConversations(botId, topic)
  const messagesList = await Promise.all(conversations.map((c) => loadConversationMessages(botId, topic, c.id)))
  return zip(conversations, messagesList).map(([c, messages]) => ({
    id: c!.id,
    createdAt: c!.createdAt,
    messages: messages!,
  }))
}

// Add a topic parameter to deleteHistoryMessage
export async function deleteHistoryMessage(botId: BotId, topic: string, conversationId: string, messageId: string) {
  const messages = await loadConversationMessages(botId, topic, conversationId)
  const newMessages = messages.filter((m) => m.id !== messageId)
  await setConversationMessages(botId, topic, conversationId, newMessages)
  if (!newMessages.length) {
    await deleteHistoryConversation(botId, topic, conversationId)
  }
}

// Add a topic parameter to clearHistoryMessages
export async function clearHistoryMessages(botId: BotId, topic: string) {
  const conversations = await loadHistoryConversations(botId, topic)
  await Promise.all(
    conversations.map((c) => {
      return Browser.storage.local.remove(`conversation:${botId}:${topic}:${c.id}:messages`)
    }),
  )
  await Browser.storage.local.remove(`conversations:${botId}:${topic}`)
}