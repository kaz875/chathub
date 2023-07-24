import WebSocketAsPromised from 'websocket-as-promised'
import { BingConversationStyle, getUserConfig } from '~services/user-config'
import { ChatError, ErrorCode } from '~utils/errors'
import { AbstractBot, SendMessageParams } from '../abstract-bot'
// import { ChatResponseMessage, ConversationInfo, InvocationEventType, ConversationResponse } from './types'
import { convertMessageToMarkdown, websocketUtils } from './utils'
import { random } from 'lodash-es'
import { FetchError, ofetch } from 'ofetch'
import { uuid } from '~utils'
import { styleOptionsMap } from './styleOptionsMap'

export interface ConversationResponse {
  conversationId: string
  clientId: string
  conversationSignature: string
  result: {
    value: string
    message: null
  }
}

export enum InvocationEventType {
  Invocation = 1,
  StreamItem = 2,
  Completion = 3,
  StreamInvocation = 4,
  CancelInvocation = 5,
  Ping = 6,
  Close = 7,
}

// https://github.com/bytemate/bingchat-api/blob/main/src/lib.ts

export interface ConversationInfo {
  conversationId: string
  clientId: string
  conversationSignature: string
  invocationId: number
  conversationStyle: BingConversationStyle
}

export interface BingChatResponse {
  conversationSignature: string
  conversationId: string
  clientId: string
  invocationId: number
  conversationExpiryTime: Date
  response: string
  details: ChatResponseMessage
}

export interface ChatResponseMessage {
  text: string
  author: string
  createdAt: Date
  timestamp: Date
  messageId: string
  messageType?: string
  requestId: string
  offense: string
  adaptiveCards: AdaptiveCard[]
  sourceAttributions: SourceAttribution[]
  feedback: Feedback
  contentOrigin: string
  privacy: null
  suggestedResponses: SuggestedResponse[]
}

export interface AdaptiveCard {
  type: string
  version: string
  body: Body[]
}

export interface Body {
  type: string
  text: string
  wrap: boolean
  size?: string
}

export interface Feedback {
  tag: null
  updatedOn: null
  type: string
}

export interface SourceAttribution {
  providerDisplayName: string
  seeMoreUrl: string
  searchQuery: string
}

export interface SuggestedResponse {
  text: string
  author: string
  createdAt: Date
  timestamp: Date
  messageId: string
  messageType: string
  offense: string
  feedback: Feedback
  contentOrigin: string
  privacy: null
}

export async function generateMarkdown(response: BingChatResponse) {
  // change `[^Number^]` to markdown link
  const regex = /\[\^(\d+)\^\]/g
  const markdown = response.details.text.replace(regex, (match, p1) => {
    const sourceAttribution = response.details.sourceAttributions[Number(p1) - 1]
    return `[${sourceAttribution.providerDisplayName}](${sourceAttribution.seeMoreUrl})`
  })
  return markdown
}

// https://github.com/acheong08/EdgeGPT/blob/master/src/EdgeGPT.py#L32
function randomIP() {
  return `13.${random(104, 107)}.${random(0, 255)}.${random(0, 255)}`
}

const API_ENDPOINT = 'https://www.bing.com/turing/conversation/create'

export async function createConversation(): Promise<ConversationResponse> {
  const headers = {
    'x-ms-client-request-id': uuid(),
    'x-ms-useragent': 'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32',
  }

  let resp: ConversationResponse
  try {
    resp = await ofetch(API_ENDPOINT, { headers, redirect: 'error' })
    if (!resp.result) {
      throw new Error('Invalid response')
    }
  } catch (err) {
    console.error('retry bing create', err)
    resp = await ofetch(API_ENDPOINT, {
      headers: { ...headers, 'x-forwarded-for': randomIP() },
      redirect: 'error',
    })
    if (!resp) {
      throw new FetchError(`Failed to fetch (${API_ENDPOINT})`)
    }
  }

  if (resp.result.value !== 'Success') {
    const message = `${resp.result.value}: ${resp.result.message}`
    if (resp.result.value === 'UnauthorizedRequest') {
      throw new ChatError(message, ErrorCode.BING_UNAUTHORIZED)
    }
    if (resp.result.value === 'Forbidden') {
      throw new ChatError(message, ErrorCode.BING_FORBIDDEN)
    }
    throw new Error(message)
  }
  return resp
}

const OPTIONS_SETS = [
  'nlu_direct_response_filter',
  'deepleo',
  'disable_emoji_spoken_text',
  'responsible_ai_policy_235',
  'enablemm',
  'iycapbing',
  'iyxapbing',
  'objopinion',
  'rweasgv2',
  'dagslnv1',
  'dv3sugg',
  'autosave',
  'iyoloxap',
  'iyoloneutral',
  'clgalileo',
  'gencontentv3',
]
export class BingWebBot extends AbstractBot {
  bingChatStyle:BingConversationStyle;

  constructor(chatStyle:BingConversationStyle){
    super();
    this.bingChatStyle = chatStyle;
  }

  private conversationContext?: ConversationInfo

  private buildChatRequest(conversation: ConversationInfo, message: string) {
    const optionsSets = OPTIONS_SETS
    if (conversation.conversationStyle === BingConversationStyle.Precise) {
      optionsSets.push('h3precise')
    } else if (conversation.conversationStyle === BingConversationStyle.Creative) {
      optionsSets.push('h3imaginative')
    }
    return {
      arguments: [
        {
          source: 'cib',
          optionsSets,
          allowedMessageTypes: [
            'Chat',
            'InternalSearchQuery',
            'Disengaged',
            'InternalLoaderMessage',
            'SemanticSerp',
            'GenerateContentQuery',
            'SearchQuery',
          ],
          sliceIds: [
            'winmuid1tf',
            'anssupfor_c',
            'imgchatgptv2',
            'tts2cf',
            'contansperf',
            'mlchatpc8500w',
            'mlchatpc2',
            'ctrlworkpay',
            'winshortmsgtf',
            'cibctrl',
            'sydtransctrl',
            'sydconfigoptc',
            '0705trt4',
            '517opinion',
            '628ajcopus0',
            '330uaugs0',
            '529rwea',
            '0626snptrcs0',
            '424dagslnv1',
          ],
          isStartOfSession: conversation.invocationId === 0,
          message: {
            author: 'user',
            inputMethod: 'Keyboard',
            text: message,
            messageType: 'Chat',
          },
          conversationId: conversation.conversationId,
          conversationSignature: conversation.conversationSignature,
          participant: { id: conversation.clientId },
        },
      ],
      invocationId: conversation.invocationId.toString(),
      target: 'chat',
      type: InvocationEventType.StreamInvocation,
    }
  }

  async doSendMessage(params: SendMessageParams) {
    if (!this.conversationContext) {
      const [conversation, { bingConversationStyle }] = await Promise.all([createConversation(), getUserConfig()])
      this.conversationContext = {
        conversationId: conversation.conversationId,
        conversationSignature: conversation.conversationSignature,
        clientId: conversation.clientId,
        invocationId: 0,
        conversationStyle: this.bingChatStyle //bingConversationStyle,
      }
    }

    const conversation = this.conversationContext!

    const wsp = new WebSocketAsPromised('wss://sydney.bing.com/sydney/ChatHub', {
      packMessage: websocketUtils.packMessage,
      unpackMessage: websocketUtils.unpackMessage,
    })

    let receivedAnswer = false

    wsp.onUnpackedMessage.addListener((events) => {
      for (const event of events) {
        console.debug('bing ws event', event)
        if (JSON.stringify(event) === '{}') {
          wsp.sendPacked({ type: 6 })
          wsp.sendPacked(this.buildChatRequest(conversation, params.prompt))
          conversation.invocationId += 1
        } else if (event.type === 6) {
          wsp.sendPacked({ type: 6 })
        } else if (event.type === 3) {
          params.onEvent({ type: 'DONE' })
          wsp.removeAllListeners()
          wsp.close()
        } else if (event.type === 1) {
          const messages = event.arguments[0].messages
          if (messages) {
            receivedAnswer = true
            const text = convertMessageToMarkdown(messages[0])
            params.onEvent({ type: 'UPDATE_ANSWER', data: { text } })
          }
        } else if (event.type === 2) {
          const messages = event.item.messages as ChatResponseMessage[] | undefined
          if (!messages) {
            params.onEvent({
              type: 'ERROR',
              error: new ChatError(
                event.item.result.error || 'Unknown error',
                event.item.result.value === 'CaptchaChallenge' ? ErrorCode.BING_CAPTCHA : ErrorCode.UNKOWN_ERROR,
              ),
            })
            return
          }
          const limited = messages.some((message) => message.contentOrigin === 'TurnLimiter')
          if (limited) {
            params.onEvent({
              type: 'ERROR',
              error: new ChatError(
                'Sorry, you have reached chat turns limit in this conversation.',
                ErrorCode.CONVERSATION_LIMIT,
              ),
            })
            return
          }
          if (!receivedAnswer) {
            const message = event.item.messages[event.item.firstNewMessageIndex] as ChatResponseMessage
            if (message) {
              receivedAnswer = true
              const text = convertMessageToMarkdown(message)
              params.onEvent({
                type: 'UPDATE_ANSWER',
                data: { text },
              })
            }
          }
        }
      }
    })

    wsp.onClose.addListener(() => {
      params.onEvent({ type: 'DONE' })
    })

    params.signal?.addEventListener('abort', () => {
      wsp.removeAllListeners()
      wsp.close()
    })

    await wsp.open()
    wsp.sendPacked({ protocol: 'json', version: 1 })
  }

  resetConversation() {
    this.conversationContext = undefined
  }
}
