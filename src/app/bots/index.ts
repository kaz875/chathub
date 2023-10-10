
import { BingConversationStyle, ChatGPTMode, PoeClaudeModel } from '~services/user-config'
import { BaichuanWebBot } from './baichuan'
import { BardBot } from './bard'
import { BingWebBot } from './bing'
import { ChatGPTBot } from './chatgpt'
import { ClaudeBot } from './claude'
import { LMSYSBot } from './lmsys'
import { PiBot } from './pi'
import { QianwenWebBot } from './qianwen'
import { XunfeiBot } from './xunfei'

export type BotId =
  | 'chatgpt'
  | 'poegpt3'
  | 'poegpt3-16k'  
  | 'poegpt4'    
  | 'poegpt4-32k'      
  | 'openai'
  | 'azuregpt'
  | 'bing'
  | 'bingcreative'
  | 'bingprecise'
  | 'bard'
  | 'poepalm'
  | 'claude2'
  | 'claude2-100k'
  | 'claudeinstant'
  | 'xunfei'
  | 'vicuna'
  | 'chatglm'
  | 'dolly'
  | 'llama2-7b'
  | 'llama2-13b'  
  | 'llama2-70b'
  | 'stablelm'
  | 'pi'
  | 'wizardlm'
  | 'qianwen'
  | 'baichuan'

export function createBotInstance(botId: BotId) {
  switch (botId) {
    case 'chatgpt':
      return new ChatGPTBot(ChatGPTMode.Webapp)
    case 'poegpt3':
      return new ChatGPTBot(ChatGPTMode.PoeGPT)
    case 'poegpt3-16k':
        return new ChatGPTBot(ChatGPTMode.PoeGPT16k)   
    case 'poegpt4':
        return new ChatGPTBot(ChatGPTMode.PoeGPT4)    
    case 'poegpt4-32k':
        return new ChatGPTBot(ChatGPTMode.PoeGPT32k)                       
    case 'openai':
      return new ChatGPTBot(ChatGPTMode.API)
    case 'azuregpt':
      return new ChatGPTBot(ChatGPTMode.Azure)      
    case 'bing':
      return new BingWebBot(BingConversationStyle.Balanced)
    case 'bingcreative':
      return new BingWebBot(BingConversationStyle.Creative)
    case 'bingprecise':
      return new BingWebBot(BingConversationStyle.Precise)
    case 'bard':
      return new BardBot()
    case 'poepalm':
      return new ClaudeBot(PoeClaudeModel['PaLM'])
    case 'claude2-100k':
        return new ClaudeBot(PoeClaudeModel['claude2-100k'])
    case 'claude2':
      return new ClaudeBot(PoeClaudeModel['claude2-100k'], true)
    case 'claudeinstant':
      return new ClaudeBot(PoeClaudeModel['claude-instant-100k'])
    case 'xunfei':
      return new XunfeiBot()
    case 'vicuna':
      return new LMSYSBot('vicuna-33b')
    case 'chatglm':
      return new LMSYSBot('chatglm-6b')
    case 'dolly':
      return new LMSYSBot('dolly-v2-12b') 
    case 'stablelm':
      return new LMSYSBot('stablelm-tuned-alpha-7b')
    case 'llama2-7b':
      return new LMSYSBot('llama-2-7b-chat')           
    case 'llama2-13b':
      return new LMSYSBot('llama-2-13b-chat')   
    case 'llama2-70b':
      return new LMSYSBot('llama-2-70b-chat')
    case 'wizardlm':
      return new LMSYSBot('wizardlm-13b')      
    case 'pi':
      return new PiBot()
    case 'qianwen':
      return new QianwenWebBot()
    case 'baichuan':
      return new BaichuanWebBot()
  }
}

export type BotInstance = ReturnType<typeof createBotInstance>
