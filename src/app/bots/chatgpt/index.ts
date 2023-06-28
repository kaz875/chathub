import { ChatGPTMode, getUserConfig } from '~/services/user-config'
import { ChatError, ErrorCode } from '~utils/errors'
import { AsyncAbstractBot } from '../abstract-bot'
import { ChatGPTApiBot } from '../chatgpt-api'
import { ChatGPTAzureApiBot } from '../chatgpt-azure'
import { ChatGPTWebBot } from '../chatgpt-webapp'
import { PoeWebBot } from '../poe'

export class ChatGPTBot extends AsyncAbstractBot {
  chatgptModeSpecified:ChatGPTMode;

  constructor(mode:ChatGPTMode) {
    super()
    this.chatgptModeSpecified = mode;
  }

  async initializeBot() {
    const { chatgptMode, ...config } = await getUserConfig()
    if(!this.chatgptModeSpecified) this.chatgptModeSpecified = chatgptMode;
    if (this.chatgptModeSpecified === ChatGPTMode.API) {
      if (!config.openaiApiKey) {
        throw new ChatError('OpenAI API key not set', ErrorCode.API_KEY_NOT_SET)
      }
      return new ChatGPTApiBot({
        openaiApiKey: config.openaiApiKey,
        openaiApiHost: config.openaiApiHost,
        chatgptApiModel: config.chatgptApiModel,
        chatgptApiTemperature: config.chatgptApiTemperature,
      })
    }
    if (this.chatgptModeSpecified === ChatGPTMode.Azure) {
      if (!config.azureOpenAIApiInstanceName || !config.azureOpenAIApiDeploymentName || !config.azureOpenAIApiKey) {
        throw new Error('Please check your Azure OpenAI API configuration')
      }
      return new ChatGPTAzureApiBot({
        azureOpenAIApiKey: config.azureOpenAIApiKey,
        azureOpenAIApiDeploymentName: config.azureOpenAIApiDeploymentName,
        azureOpenAIApiInstanceName: config.azureOpenAIApiInstanceName,
      })
    }
    if (this.chatgptModeSpecified === ChatGPTMode.Poe) {
      return new PoeWebBot(config.chatgptPoeModelName)
    }
    return new ChatGPTWebBot(config.chatgptWebappModelName)
  }
}
