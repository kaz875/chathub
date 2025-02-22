import { defaults } from 'lodash-es'
import { ofetch } from 'ofetch'
import Browser from 'webextension-polyfill'
import { BotId } from '~app/bots'
import { ALL_IN_ONE_PAGE_ID, CHATBOTS, CHATGPT_API_MODELS, DEFAULT_CHATGPT_SYSTEM_MESSAGE } from '~app/consts'

export enum BingConversationStyle {
  Creative = 'creative',
  Balanced = 'balanced',
  Precise = 'precise',
}

export enum ChatGPTMode {
  Webapp = 'webapp',
  API = 'api',
  Azure = 'azure',
  PoeGPT = 'poeGPT3',
  PoeGPT16k = 'poeGPT3-16k',  
  PoeGPT4 = 'poeGPT4',    
  PoeGPT32k = 'poeGPT4-32k',      
  Poe = 'poe',
  OpenRouter = 'openrouter',
}

export enum ChatGPTWebModel {
  'GPT-3.5' = 'gpt-3.5',
  'GPT-4' = 'gpt-4',
}

export enum PoeGPTModel {
  'GPT-3.5' = 'chinchilla',
  'GPT-3.5-16k' = 'agouti',
  'GPT-4' = 'beaver',
  'GPT-4-32k' = 'vizcacha',  
}

export enum PoeClaudeModel {
  'claude-instant' = 'a2',
  'PaLM' = 'acouchy',
  'claude-instant-100k' = 'a2_100k',
  'claude2-100k' = 'a2_2',
  'llama2-70b' = 'llama_2_70b_chat'
}

export enum ClaudeMode {
  Poe = 'poe',
  API = 'api',
  Webapp = 'webapp',
  OpenRouter = 'openrouter',
}

export enum ClaudeAPIModel {
  'claude-2' = 'claude-2',
  'claude-instant-1' = 'claude-instant-v1',
  'claude-1' = 'claude-v1',
  'claude-1-100k' = 'claude-v1-100k',
  'claude-instant-1-100k' = 'claude-instant-v1-100k',
}

export enum OpenRouterClaudeModel {
  'claude-2' = 'claude-2',
  'claude-instant-v1' = 'claude-instant-v1',
}

const userConfigWithDefaultValue = {
  openaiApiKey: '',
  openaiApiHost: 'https://api.openai.com',
  chatgptApiModel: CHATGPT_API_MODELS[0] as (typeof CHATGPT_API_MODELS)[number],
  chatgptApiTemperature: 1,
  chatgptApiSystemMessage: DEFAULT_CHATGPT_SYSTEM_MESSAGE,
  chatgptMode: ChatGPTMode.Webapp,
  chatgptWebappModelName: ChatGPTWebModel['GPT-3.5'],
  chatgptPoeModelName: PoeGPTModel['GPT-3.5'],
  startupPage: ALL_IN_ONE_PAGE_ID,
  bingConversationStyle: BingConversationStyle.Balanced,
  poeModel: PoeClaudeModel['claude-instant'],
  poeFormKey: '',
  azureOpenAIApiKey: '',
  azureOpenAIApiInstanceName: '',
  azureOpenAIApiDeploymentName: '',
  enabledBots: Object.keys(CHATBOTS).slice(0, 8) as BotId[],
  claudeApiKey: '',
  claudeMode: ClaudeMode.Poe,
  claudeApiModel: ClaudeAPIModel['claude-2'],
  chatgptWebAccess: false,
  claudeWebAccess: false,
  openrouterOpenAIModel: CHATGPT_API_MODELS[0] as (typeof CHATGPT_API_MODELS)[number],
  openrouterClaudeModel: OpenRouterClaudeModel['claude-2'],
  openrouterApiKey: '',
}

export type UserConfig = typeof userConfigWithDefaultValue

export async function getUserConfig(): Promise<UserConfig> {
  const result = await Browser.storage.sync.get(Object.keys(userConfigWithDefaultValue))
  
  if (!result.chatgptMode && result.openaiApiKey) {
    result.chatgptMode = ChatGPTMode.API
  }
  if (result.chatgptWebappModelName === 'default') {
    result.chatgptWebappModelName = ChatGPTWebModel['GPT-3.5']
  } else if (result.chatgptWebappModelName === 'gpt-4-browsing') {
    result.chatgptWebappModelName = ChatGPTWebModel['GPT-4']
  } else if (result.chatgptWebappModelName === 'gpt-3.5-mobile') {
    result.chatgptWebappModelName = ChatGPTWebModel['GPT-3.5']
  } else if (result.chatgptWebappModelName === 'gpt-4-mobile') {
    result.chatgptWebappModelName = ChatGPTWebModel['GPT-4']
  }
  return defaults(result, userConfigWithDefaultValue)
}

export async function updateUserConfig(updates: Partial<UserConfig>) {
  console.debug('update configs', updates)
  await Browser.storage.sync.set(updates)
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) {
      await Browser.storage.sync.remove(key)
    }
  }
}
