import Fuse from 'fuse.js'
import { flatMap } from 'lodash-es'
import { FC, memo, useMemo, useRef } from 'react'
import { ViewportList } from 'react-viewport-list'
import useSWR from 'swr'
import { BotId } from '~app/bots'
import { loadHistoryMessages } from '~services/chat-history'
import { ChatMessageModel } from '~types'
import { formatTime } from '~utils/format'
import ChatMessage from './ChatMessage'
import { useAtom } from 'jotai'
import { topicAtom } from '~app/state'

type ViewportListItem =
  | {
      type: 'conversation'
      topic: string
      createdAt: number
    }
  | {
      type: 'message'
      message: ChatMessageModel
      conversationId: string
    }

const Timestamp = memo((props: { timestamp: number }) => {
  return (
    <span className="text-secondary-text bg-secondary text-xs px-2 py-1 w-fit rounded">
      {formatTime(props.timestamp)}
    </span>
  )
})

Timestamp.displayName = 'Timestamp'

const HistoryContent: FC<{ botId: BotId; keyword: string }> = ({ botId, keyword }) => {
  // Get the current topic from the topic atom
  const [topic] = useAtom(topicAtom)

  // Pass the topic parameter to loadHistoryMessages
  const historyQuery = useSWR(`history:${botId}:${topic}`, () => loadHistoryMessages(botId, topic), { suspense: true })
  const ref = useRef<HTMLDivElement | null>(null)

  const fuse = useMemo(() => {
    return new Fuse(
      flatMap(historyQuery.data, (c) => c.messages),
      { keys: ['text'] },
    )
  }, [historyQuery.data])

  const items: ViewportListItem[] = useMemo(() => {
    const results: ViewportListItem[] = []
    for (const c of Array.from(historyQuery.data).reverse()) {
      const messages = c.messages.filter((m) => m.text)
      if (!messages.length) {
        continue
      }
      results.push({ type: 'conversation', topic: messages[0].text, createdAt: c.createdAt })
      for (const m of messages) {
        results.push({ type: 'message', message: m, conversationId: c.id })
      }
    }
    return results
  }, [historyQuery.data])

  const filteredItems: ViewportListItem[] = useMemo(() => {
    if (!keyword) {
      return []
    }
    const result = fuse.search(keyword)
    return result.map((r) => ({ type: 'message', message: r.item, conversationId: '' }))
  }, [fuse, keyword])

  return (
    <div className="flex flex-col overflow-y-auto" ref={ref}>
      <ViewportList
        viewportRef={ref}
        items={filteredItems.length ? filteredItems : items}
        initialAlignToTop={true}
        initialIndex={filteredItems.length || items.length}
      >
        {(item) => {
          if (item.type === 'conversation') { //TODO: add topic
            return (
              <div className="text-center my-5" key={item.createdAt}>
                <Timestamp timestamp={item.createdAt} />
              </div>
            )
          }
          return (
            <ChatMessage
              key={item.message.id}
              botId={botId}
              message={item.message}
              conversationId={item.conversationId}
            />
          )
        }}
      </ViewportList>
    </div>
  )
}

export default HistoryContent
