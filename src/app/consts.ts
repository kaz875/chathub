import alpacaLogo from '~/assets/alpaca-logo.png'
import claudeLogo from '~/assets/anthropic-logo.png'
import bardLogo from '~/assets/bard-logo.svg'
import bingLogo from '~/assets/bing-logo.svg'
import chatglmLogo from '~/assets/chatglm-logo.svg'
import chatgptLogo from '~/assets/chatgpt-logo.svg'
import llamaLogo from '~/assets/llama-logo.png'
import oasstLogo from '~/assets/oasst-logo.svg'
import piLogo from '~/assets/pi-logo.png'
import rwkvLogo from '~/assets/rwkv-logo.png'
import guanacoLogo from '~/assets/guanaco-logo.png'
import wizardlmLogo from '~/assets/wizardlm-logo.png'
import vicunaLogo from '~/assets/vicuna-logo.jpg'
import xunfeiLogo from '~/assets/xunfei-logo.png'
import { BotId } from './bots'

export const CHATBOTS: Record<BotId, { name: string; avatar: any }> = {
  chatgpt: {
    name: 'ChatGPT(Web)',
    avatar: chatgptLogo,
  },
  poegpt3: {
    name: 'GPT-3.5-Turbo',
    avatar: chatgptLogo,
  },
  "poegpt3-16k": {
    name: 'GPT-3.5-Turbo-16k',
    avatar: chatgptLogo,
  },
  "poegpt4-32k": {
    name: 'GPT-4-32k',
    avatar: chatgptLogo,
  },  
  poegpt4: {
    name: 'GPT-4',
    avatar: chatgptLogo,
  },
  poepalm: {
    name: 'PaLM',
    avatar: bardLogo,
  },
  openai: {
    name: 'OpenAI GPT',
    avatar: chatgptLogo,
  },
  azuregpt: {
    name: 'Azure GPT',
    avatar: chatgptLogo,
  },
  bing: {
    name: 'Bing',
    avatar: bingLogo,
  },
  bingcreative: {
    name: 'Bing-Creative',
    avatar: bingLogo,
  },
  bingprecise: {
    name: 'Bing-Precise',
    avatar: bingLogo,
  },
  bard: {
    name: 'Bard',
    avatar: bardLogo,
  },
  claude2: {
    name: 'Claude2-webapp',
    avatar: claudeLogo,
  },
  'claude2-100k': {
    name: 'Claude2-100k',
    avatar: claudeLogo,
  },  
  claudeinstant: {
    name: 'claudeInstant-100k',
    avatar: claudeLogo,
  },
  alpaca: {
    name: 'Alpaca',
    avatar: alpacaLogo,
  },
  vicuna: {
    name: 'Vicuna',
    avatar: vicunaLogo,
  },
  pi: {
    name: 'Pi',
    avatar: piLogo,
  },
  dolly: {
    name: 'Dolly',
    avatar: oasstLogo,
  },
  'llama2-7b': {
    name: 'Llama-2 7b',
    avatar: llamaLogo,
  },
  'llama2-13b': {
    name: 'Llama-2 13b',
    avatar: llamaLogo,
  },
  stablelm: {
    name: 'StableLM',
    avatar: oasstLogo,
  },
  chatglm: {
    name: 'ChatGLM',
    avatar: chatglmLogo,
  },
  xunfei: {
    name: 'iFlytek Spark',
    avatar: xunfeiLogo,
  },
  oasst: {
    name: 'OpenAssistant',
    avatar: oasstLogo,
  },
  rwkv: {
    name: 'ChatRWKV',
    avatar: rwkvLogo,
  },
  guanaco: {
    name: 'Guanaco',
    avatar: guanacoLogo,
  },
  wizardlm: {
    name: 'WizardLM',
    avatar: wizardlmLogo,
  },
}

export const CHATGPT_HOME_URL = 'https://chat.openai.com'
export const CHATGPT_API_MODELS = ['gpt-3.5-turbo', 'gpt-3.5-turbo-16k', 'gpt-4', 'gpt-4-32k'] as const
export const ALL_IN_ONE_PAGE_ID = 'all'

export const DEFAULT_CHATGPT_SYSTEM_MESSAGE =
  'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: 2021-09-01. Current date: {current_date}'

export type Layout = 2 | 3 | 4 | 'imageInput' | 'twoVertical'
