
import { ClaudeMode, PoeClaudeModel, getUserConfig } from '~/services/user-config'
import { AsyncAbstractBot, MessageParams } from '../abstract-bot'
import * as agent from '~services/agent'
import { ClaudeApiBot } from '../claude-api'
import { ClaudeWebBot } from '../claude-web'
import { PoeWebBot } from '../poe'

export class ClaudeBot extends AsyncAbstractBot {

  poeChatStyle:PoeClaudeModel;

  constructor(chatStyle:PoeClaudeModel, public webappMode = false){
    super();
    this.poeChatStyle = chatStyle;
  }

  async initializeBot() {
    const { claudeMode, ...config } = await getUserConfig()
    if (claudeMode === ClaudeMode.API) {
      if (!config.claudeApiKey) {
        throw new Error('Claude API key missing')
      }
      return new ClaudeApiBot({
        claudeApiKey: config.claudeApiKey,
        claudeApiModel: config.claudeApiModel,
      })
    }
    if (this.webappMode/* claudeMode === ClaudeMode.Webapp */) {
      return new ClaudeWebBot()
    }
    return new PoeWebBot(this.poeChatStyle/* config.poeModel */)
  }

  async sendMessage(params: MessageParams) {
    const { claudeWebAccess } = await getUserConfig()
    if (claudeWebAccess) {
      return agent.execute(params.prompt, (prompt) => this.doSendMessageGenerator({ ...params, prompt }), params.signal)
    }
    return this.doSendMessageGenerator(params)
  }
}
