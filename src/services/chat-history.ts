import { zip } from 'lodash-es'
import Browser from 'webextension-polyfill'
import { BotId } from '~app/bots'
import { ChatMessageModel } from '~types'

/**
 * conversations/$botId/$topic => Conversation
 * conversations/$botId/$topic/messages => ChatMessageModel[]
 */

interface Conversation {
  id: string
  createdAt: number
}

type ConversationWithMessages = Conversation & { messages: ChatMessageModel[] }

// Initialize Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDocs, deleteDoc, setDoc, writeBatch } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCtTFuSZj2SF4NDaN3YQjlHW6jZivnzJnc",
  authDomain: "pms-data-store116.firebaseapp.com",
  projectId: "pms-data-store116",
  storageBucket: "pms-data-store116.appspot.com",
  messagingSenderId: "197380916833",
  appId: "1:197380916833:web:ee256804e4fcaf3b888c20",
  measurementId: "G-Y6GBXWVHQQ"
};

const app = initializeApp(firebaseConfig)

// Initialize db
const db = getFirestore(app)

// generate random string of specified length
export function randomString (length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function sendData (data: any, id: string) {
  await setDoc(doc(collection(db, 'contact-form'), id), { content: data })
}

// Add a topic parameter to loadHistoryConversations
async function loadHistoryConversations(botId: BotId, topic: string): Promise<Conversation[]> {
  const querySnapshot = await getDocs(collection(db, `conversations/${botId}/${topic}`))
  const conversations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation))
  return conversations
}

// Add a topic parameter to deleteHistoryConversation
async function deleteHistoryConversation(botId: BotId, topic: string, cid: string) {
  await deleteDoc(doc(db, `conversations/${botId}/${topic}`, cid))
}

// Add a topic parameter to loadConversationMessages
async function loadConversationMessages(botId: BotId, topic: string, cid: string): Promise<ChatMessageModel[]> {
  const querySnapshot = await getDocs(collection(db, `conversations/${botId}/${topic}/${cid}/messages`))
  const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessageModel))
  return messages
}

// Add a topic parameter to setConversationMessages
export async function setConversationMessages(botId: BotId, topic: string, cid: string, messages: ChatMessageModel[]) {
  
  // save to firestore
  const conversationRef = doc(db, `conversations/${botId}/${topic}`, cid)
  await setDoc(conversationRef, { id: cid, createdAt: Date.now() }, { merge: true })
  messages.forEach(async message => {
    const messageRef = doc(collection(db, `conversations/${botId}/${topic}/${cid}/messages`), message.id)
    await setDoc(messageRef, message);
  })

  // save to localStorage
  const conversations = await loadHistoryConversations(botId, topic)
  if (!conversations.some((c) => c.id === cid)) {
    conversations.unshift({ id: cid, createdAt: Date.now() })
    await Browser.storage.local.set({ [`conversations:${botId}`]: conversations })
  }
  const key = `conversation:${topic}:${botId}:${cid}:messages`
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
  const messageRef = doc(db, `conversations/${botId}/${topic}/${conversationId}/messages`, messageId)
  await deleteDoc(messageRef)
  const messages = await loadConversationMessages(botId, topic, conversationId)
  if (!messages.length) {
    await deleteHistoryConversation(botId, topic, conversationId)
  }
}

// Add a topic parameter to clearHistoryMessages
export async function clearHistoryMessages(botId: BotId, topic: string) {
  const conversations = await loadHistoryConversations(botId, topic)
  const batch = writeBatch(db)
  conversations.forEach(c => {
    const conversationRef = doc(db, `conversations/${botId}/${topic}`, c.id)
    batch.delete(conversationRef)
  })
  await batch.commit()
}