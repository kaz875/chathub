import { BingConversationStyle, ChatGPTMode, PoeClaudeModel } from '~services/user-config'
import { BardBot } from './bard'
import { BingWebBot } from './bing'
import { ChatGPTBot } from './chatgpt'
import { ClaudeBot } from './claude'
import { LMSYSBot } from './lmsys'
import { PiBot } from './pi'
import { XunfeiBot } from './xunfei'

export type BotId =
  | 'chatgpt'
  | 'poeGPT3'
  | 'poeGPT3-16k'  
  | 'poeGPT4'    
  | 'poeGPT4-32k'      
  | 'openai'
  | 'azureGPT'
  | 'bingBalanced'
  | 'bingCreative'
  | 'bingPrecise'
  | 'bard'
  | 'poePaLM'
  | 'claude2'
  | 'claudeInstant'
  | 'xunfei'
  | 'vicuna'
  | 'alpaca'
  | 'chatglm'
  | 'koala'
  | 'dolly'
  | 'llama-7b'
  | 'llama-13b'  
  | 'stablelm'
  | 'oasst'
  | 'rwkv'
  | 'llama'
  | 'oasst'
  | 'rwkv'
  | 'pi'
  | 'guanaco'
  | 'wizardlm'

export function createBotInstance(botId: BotId) {
  switch (botId) {
    case 'chatgpt':
      return new ChatGPTBot(ChatGPTMode.Webapp)
    case 'poeGPT3':
      return new ChatGPTBot(ChatGPTMode.PoeGPT)
    case 'poeGPT3-16k':
        return new ChatGPTBot(ChatGPTMode.PoeGPT16k)   
    case 'poeGPT4':
        return new ChatGPTBot(ChatGPTMode.PoeGPT4)    
    case 'poeGPT4-32k':
        return new ChatGPTBot(ChatGPTMode.PoeGPT32k)                       
    case 'openai':
      return new ChatGPTBot(ChatGPTMode.API)
    case 'azureGPT':
      return new ChatGPTBot(ChatGPTMode.Azure)      
    case 'bingBalanced':
      return new BingWebBot(BingConversationStyle.Balanced)
    case 'bingCreative':
      return new BingWebBot(BingConversationStyle.Creative)
    case 'bingPrecise':
      return new BingWebBot(BingConversationStyle.Precise)
    case 'bard':
      return new BardBot()
    case 'poePaLM':
      return new ClaudeBot(PoeClaudeModel['PaLM'])
    case 'claude2':
      return new ClaudeBot(PoeClaudeModel['claude2-100k'])
    case 'claudeInstant':
      return new ClaudeBot(PoeClaudeModel['claude-instant-100k'])
    case 'xunfei':
      return new XunfeiBot()
    case 'vicuna':
      return new LMSYSBot('vicuna-33b')
    case 'alpaca':
      return new LMSYSBot('alpaca-13b')
    case 'chatglm':
      return new LMSYSBot('chatglm-6b')
    case 'koala':
      return new LMSYSBot('koala-13b')
    case 'dolly':
      return new LMSYSBot('dolly-v2-12b')
    case 'llama-7b':
        return new LMSYSBot('llama-2-7b-chat')           
    case 'llama-13b':
        return new LMSYSBot('llama-2-13b-chat')      
    case 'stablelm':
      return new LMSYSBot('stablelm-tuned-alpha-7b')
    case 'llama':
      return new LMSYSBot('llama-2-13b-chat')
    case 'oasst':
      return new LMSYSBot('oasst-pythia-12b')
    case 'rwkv':
      return new LMSYSBot('RWKV-4-Raven-14B')
    case 'guanaco':
      return new LMSYSBot('guanaco-33b')
    case 'wizardlm':
      return new LMSYSBot('wizardlm-13b')      
    case 'pi':
      return new PiBot()
  }
}

export type BotInstance = ReturnType<typeof createBotInstance>
