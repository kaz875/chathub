import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BotId } from '~app/bots'
import { usePremium } from '~app/hooks/use-premium'
import checkedIcon from '~assets/icons/checkbox-checked.svg'
import uncheckedIcon from '~assets/icons/checkbox-unchecked.svg'
import { getUserConfig, updateUserConfig } from '~services/user-config'
import PremiumFeatureModal from '../Premium/Modal'
import { requestHostPermission } from '~app/utils/permissions'
import { trackEvent } from '~app/plausible'

interface Props {
  botId: BotId
}

const WebAccessCheckbox: FC<Props> = (props) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<boolean | null>(null)
  const [premiumModalOpen, setPremiumModalOpen] = useState(false)
  const premiumState = usePremium()

  const configKey = useMemo(() => {
    if (props.botId === 'chatgpt') {
      return 'chatgptWebAccess'
    }
    if (props.botId === 'claude') {
      return 'claudeWebAccess'
    }
  }, [props.botId])

  useEffect(() => {
    getUserConfig().then((config) => {
      if (configKey) {
        setChecked(config[configKey])
      }
    })
  }, [configKey, props.botId])

  const onToggle = useCallback(async () => {
    trackEvent('toggle_web_access', { botId: props.botId })
    if (!premiumState.activated && !checked) {
      setPremiumModalOpen(true)
      return
    }
    if (!(await requestHostPermission('https://*.duckduckgo.com/'))) {
      return
    }
    setChecked(!checked)
    if (configKey) {
      updateUserConfig({ [configKey]: !checked })
    }
  }, [checked, configKey, premiumState.activated, props.botId])

  if (checked === null) {
    return null
  }

  return (
    <div className="flex flex-row items-center gap-1 shrink-0 cursor-pointer" onClick={onToggle}>
      <img src={checked ? checkedIcon : uncheckedIcon} className="w-3 h-3" />
      <span className="text-[13px] whitespace-nowrap text-light-text font-medium">{t('Web Access')}</span>
      <PremiumFeatureModal open={premiumModalOpen} setOpen={setPremiumModalOpen} source="web-access-modal" />
    </div>
  )
}

export default memo(WebAccessCheckbox)
