// use-topics.ts
import useSWR from 'swr/immutable'
import { getUserConfig } from '~services/user-config' // a function that returns the user's preferences

// a type alias for string that represents the unique id of a topic
export type TopicId = string

// an object that maps topic ids to topic objects with title and content properties
export const TOPICS: Record<TopicId, { title: string; content: string }> = {
  // an example topic with id 't1', title 'React', and content 'A JavaScript library for building user interfaces'
  t1: {
    title: 'New Chat',
    content: 'Default topic before new ones are created',
  },
  // you can add more topics here with different ids and properties
}

export function useTopics() {
  const query = useSWR('topics', async () => {
    // const { topics } = await getUserConfig() // get the topics from the user's config
    return Object.keys(TOPICS)
    //   .filter((topicId) => topics.includes(topicId as TopicId)) // filter out the topics that are not in the user's config
      .map((topicId) => {
        const tid = topicId as TopicId
        return { topicId: tid, topic: TOPICS[tid] } // return an object with the topic id and topic object
      })
  })
  return query.data || [] // return the data or an empty array if not found
}