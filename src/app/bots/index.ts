import { BingConversationStyle, ChatGPTMode, PoeClaudeModel } from '~services/user-config'
import { BardBot } from './bard'
import { BingWebBot } from './bing'
import { ChatGPTBot } from './chatgpt'
import { ClaudeBot } from './claude'
import { LMSYSBot } from './lmsys'
import { XunfeiBot } from './xunfei'

export type BotId =
  | 'chatgpt'
  | 'poeGPT'
  | 'openai'
  | 'azureGPT'
  | 'bing'
  | 'bingCreative'
  | 'bingPrecise'
  | 'bard'
  | 'poePaLM'
  | 'claude'
  | 'claude100k'
  | 'xunfei'
  | 'vicuna'
  | 'alpaca'
  | 'chatglm'
  | 'koala'
  | 'dolly'
  | 'llama'
  | 'stablelm'
  | 'oasst'
  | 'rwkv'

export function createBotInstance(botId: BotId) {
  switch (botId) {
    case 'chatgpt':
      return new ChatGPTBot(ChatGPTMode.Webapp)
    case 'poeGPT':
      return new ChatGPTBot(ChatGPTMode.Poe)
    case 'openai':
      return new ChatGPTBot(ChatGPTMode.API)
    case 'azureGPT':
      return new ChatGPTBot(ChatGPTMode.Azure)      
    case 'bing':
      return new BingWebBot(BingConversationStyle.Balanced)
    case 'bingCreative':
      return new BingWebBot(BingConversationStyle.Creative)
    case 'bingPrecise':
      return new BingWebBot(BingConversationStyle.Precise)
    case 'bard':
      return new BardBot()
    case 'poePaLM':
      return new ClaudeBot(PoeClaudeModel['PaLM'])
    case 'claude':
      return new ClaudeBot(PoeClaudeModel['claude+'])
    case 'claude100k':
      return new ClaudeBot(PoeClaudeModel['claude-instant-100k'])
    case 'xunfei':
      return new XunfeiBot()
    case 'vicuna':
      return new LMSYSBot('vicuna-13b')
    case 'alpaca':
      return new LMSYSBot('alpaca-13b')
    case 'chatglm':
      return new LMSYSBot('chatglm-6b')
    case 'koala':
      return new LMSYSBot('koala-13b')
    case 'dolly':
      return new LMSYSBot('dolly-v2-12b')
    case 'llama':
      return new LMSYSBot('llama-13b')
    case 'stablelm':
      return new LMSYSBot('stablelm-tuned-alpha-7b')
    case 'oasst':
      return new LMSYSBot('oasst-pythia-12b')
    case 'rwkv':
      return new LMSYSBot('RWKV-4-Raven-14B')
  }
}

export type BotInstance = ReturnType<typeof createBotInstance>
