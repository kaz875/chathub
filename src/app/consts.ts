import alpacaLogo from '~/assets/alpaca-logo.png'
import claudeLogo from '~/assets/anthropic-logo.png'
import bardLogo from '~/assets/bard-logo.svg'
import bingLogo from '~/assets/bing-logo.svg'
import chatglmLogo from '~/assets/chatglm-logo.svg'
import chatgptLogo from '~/assets/chatgpt-logo.svg'
import vicunaLogo from '~/assets/vicuna-logo.jpg'
import xunfeiLogo from '~/assets/xunfei-logo.png'
import koalaLogo from '~/assets/koala-logo.jpg'
import dollyLogo from '~/assets/dolly-logo.png'
import llamaLogo from '~/assets/llama-logo.png'
import stablelmLogo from '~/assets/stablelm-logo.png'
import oasstLogo from '~/assets/oasst-logo.svg'
import rwkvLogo from '~/assets/rwkv-logo.png'
import guanacoLogo from '~/assets/guanaco-logo.png'
import wizardlmLogo from '~/assets/wizardlm-logo.png'
import { BotId } from './bots'
import i18n from './i18n'

export const CHATBOTS: Record<BotId, { name: string; avatar: any }> = {
  chatgpt: {
    name: 'ChatGPT(Web)',
    avatar: chatgptLogo,
  },
  poeGPT3: {
    name: 'GPT-3.5-Turbo',
    avatar: chatgptLogo,
  },
  "poeGPT3-16k": {
    name: 'GPT-3.5-Turbo-16k',
    avatar: chatgptLogo,
  },
  "poeGPT4-32k": {
    name: 'GPT-4-32k',
    avatar: chatgptLogo,
  },  
  poeGPT4: {
    name: 'GPT-4',
    avatar: chatgptLogo,
  },
  poePaLM: {
    name: 'PaLM',
    avatar: bardLogo,
  },
  openai: {
    name: 'OpenAI GPT',
    avatar: chatgptLogo,
  },
  azureGPT: {
    name: 'Azure GPT',
    avatar: chatgptLogo,
  },
  bingBalanced: {
    name: 'Bing',
    avatar: bingLogo,
  },
  bingCreative: {
    name: 'Bing-Creative',
    avatar: bingLogo,
  },
  bingPrecise: {
    name: 'Bing-Precise',
    avatar: bingLogo,
  },
  bard: {
    name: 'Bard',
    avatar: bardLogo,
  },
  claude2: {
    name: 'Claude2-100k',
    avatar: claudeLogo,
  },
  claudeInstant: {
    name: 'claudeInstant-100k',
    avatar: claudeLogo,
  },
  xunfei: {
    name: i18n.t('iFlytek Spark'),
    avatar: xunfeiLogo,
  },
  chatglm: {
    name: 'ChatGLM',
    avatar: chatglmLogo,
  },
  alpaca: {
    name: 'Alpaca',
    avatar: alpacaLogo,
  },
  vicuna: {
    name: 'Vicuna',
    avatar: vicunaLogo,
  },
  koala: {
    name: 'Koala',
    avatar: koalaLogo,
  },
  dolly: {
    name: 'Dolly',
    avatar: dollyLogo,
  },
  llama: {
    name: 'Llama-2 13b',
    avatar: llamaLogo,
  },  
  stablelm: {
    name: 'StableLM',
    avatar: stablelmLogo,
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
