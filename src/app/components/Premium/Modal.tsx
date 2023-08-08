import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../Button'
import Dialog from '../Dialog'
import FeatureList from './FeatureList'
import PriceSection from './PriceSection'
import LovedBy from './LovedBy'
import { trackEvent } from '~app/plausible'
import { useNavigate } from '@tanstack/react-router'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  source?: string
}

const PremiumModal: FC<Props> = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onClickBuy = useCallback(() => {
    trackEvent('click_buy_premium')
    navigate({ to: '/premium' })
  }, [navigate])

  return (
    <Dialog title={t('Premium Feature')} open={props.open} onClose={() => props.setOpen(false)} className="rounded-xl">
      <div className="flex flex-col items-center my-7 gap-7 overflow-y-auto">
        <PriceSection />
        <div className="w-full px-20">
          <FeatureList textSize="normal" />
        </div>
        <a
          href={`https://chathub.gg/api/premium/redirect?source=${props.source || ''}`}
          target="_blank"
          rel="noreferrer"
          onClick={onClickBuy}
        >
          <Button text={t('Get premium license')} color="primary" className="!py-[10px] px-16 rounded-lg" />
        </a>
        <LovedBy />
      </div>
    </Dialog>
  )
}

export default PremiumModal
