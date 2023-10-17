import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import allInOneIcon from '~/assets/all-in-one.svg'
import collapseIcon from '~/assets/icons/collapse.svg'
import feedbackIcon from '~/assets/icons/feedback.svg'
import githubIcon from '~/assets/icons/github.svg'
import settingIcon from '~/assets/icons/setting.svg'
import themeIcon from '~/assets/icons/theme.svg'
import logo from '~/assets/logo.svg'
import minimalLogo from '~/assets/minimal-logo.svg'
import { cx } from '~/utils'
import { useEnabledBots } from '~app/hooks/use-enabled-bots'
import { sidebarCollapsedAtom, topicAtom } from '~app/state' // import topicAtom
import CommandBar from '../CommandBar'
import GuideModal from '../GuideModal'
import ThemeSettingModal from '../ThemeSettingModal'
import Tooltip from '../Tooltip'
import NavLink from './NavLink'
import PremiumEntry from './PremiumEntry'
import { doc, getDoc } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtTFuSZj2SF4NDaN3YQjlHW6jZivnzJnc",
  authDomain: "pms-data-store116.firebaseapp.com",
  projectId: "pms-data-store116",
  storageBucket: "pms-data-store116.appspot.com",
  messagingSenderId: "197380916833",
  appId: "1:197380916833:web:ee256804e4fcaf3b888c20",
  measurementId: "G-Y6GBXWVHQQ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

function IconButton(props: { icon: string; onClick?: () => void }) {
  return (
    <div
      className="p-[6px] rounded-[10px] w-fit cursor-pointer hover:opacity-80 bg-secondary bg-opacity-20"
      onClick={props.onClick}
    >
      <img src={props.icon} className="w-6 h-6" />
    </div>
  )
}

function Sidebar() {
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom)
  const [themeSettingModalOpen, setThemeSettingModalOpen] = useState(false)
  const enabledBots = useEnabledBots()
  const [topic, setTopic] = useAtom(topicAtom) // use topicAtom
  const [activeContextPath, setActiveContextPath] = useState('_No_Context_');

  // Add an event listener for keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Alt + S is pressed
      if (event.altKey && event.code === 'KeyS') {
        // Prevent default behavior
        event.preventDefault()
        // Toggle collapsed state
        setCollapsed((c) => !c)
      }
    }
    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown)
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setCollapsed])

  useEffect(() => {
    const loadActiveTopic = async () => {
      try {
        const activeTopicRef = doc(db, 'activeTopic/active');
        const activeTopicDoc = await getDoc(activeTopicRef);
        const activeTopic = activeTopicDoc.data()?.topic;
        setTopic(activeTopic || 'Untitled Topic');
      } catch (error) {
        console.error('Error loading active topic:', error);
      }
    };

    loadActiveTopic();
    
    async function getActiveContextPath() {
      try {
        const activeContextPathRef = doc(db, 'activeContextPath/active');
        const activeContextPathDoc = await getDoc(activeContextPathRef); 
        const activeContextPathData = activeContextPathDoc.data();
        setActiveContextPath(activeContextPathData?.contextPath || '_No_Context_');
      } catch (error) {
        console.error('Error loading active context path:', error);
      }
    }

    getActiveContextPath();
    
  }, [setTopic]);

  return (
    <motion.aside
  className={cx(
    'flex flex-col bg-primary-background bg-opacity-40 overflow-hidden',
    collapsed ? 'items-center px-[15px]' : 'w-[230px] px-4',
  )}
>
  <motion.img
    src={collapseIcon}
    className={cx('w-6 h-6 cursor-pointer my-5', !collapsed && 'self-end')}
    animate={{
      rotate: collapsed ? 180 : 0,
    }}
    onClick={() => setCollapsed((c) => !c)}
  />
  {collapsed ? <img src={minimalLogo} className="w-[30px]" /> : <img src={logo} className="w-[79px]" />}
  <div className="flex flex-col gap-[13px] mt-12 overflow-y-auto scrollbar-none">

  {!collapsed && (
      <Tooltip content={t('Context Path')}>
        {/* Add a text box for the context path */}
        {/* Use flexbox layout and width property to align the input element */}
        <div className="display: flex; align-items: center; width: 100%;">
          {/* <label htmlFor="contextPath" style={{ marginRight: "10px" }}>Active Context Path:</label> */}
          <input
            type="text"
            value={activeContextPath}
            readOnly
            placeholder="_No_Context_"
            className="p-[6px] rounded-[10px] w-full cursor-pointer hover:opacity-80 bg-secondary bg-opacity-20 flex: 1; width: 100%;"
            title = {activeContextPath}
            id="contextPath"
          />
        </div>
      </Tooltip>
    )}
    
    {!collapsed && (
      <Tooltip content={t('Topic')}>
        {/* Add a text box for the topic */}
        {/* Use flexbox layout and width property to align the input element */}
        <div className="display: flex; align-items: center; width: 100%;">
          {/* <label htmlFor="topic" style={{ marginRight: "10px" }}>Active Topic:</label> */}
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="p-[6px] rounded-[10px] w-full cursor-pointer hover:opacity-80 bg-secondary bg-opacity-20 flex: 1; width: 100%;"
            title = {topic}
            id="topic"
          />
        </div>
      </Tooltip>
    )}
    <NavLink to="/" text={'All-In-One'} icon={allInOneIcon} iconOnly={collapsed} />
    {enabledBots.map(({ botId, bot }) => (
      <NavLink
        key={botId}
        to="/chat/$botId"
        params={{ botId }}
        text={bot.name}
        icon={bot.avatar}
        iconOnly={collapsed}
      />
    ))}
  </div>
  <div className="mt-auto pt-2">
    {!collapsed && <hr className="border-[#ffffff4d]" />}
    {/* {!collapsed && (
      <div className="my-5">
        <PremiumEntry text={t('Premium')} />
      </div>
    )} */}
    <div className={cx('flex mt-5 gap-[10px] mb-4', collapsed ? 'flex-col' : 'flex-row ')}>
      {!collapsed && (
        <Tooltip content={t('GitHub')}>
          <a href="https://github.com/chathub-dev/chathub?utm_source=extension" target="_blank" rel="noreferrer">
            <IconButton icon={githubIcon} />
          </a>
        </Tooltip>
      )}
      {!collapsed && (
        <Tooltip content={t('Feedback')}>
          <a href="https://github.com/chathub-dev/chathub/issues" target="_blank" rel="noreferrer">
            <IconButton icon={feedbackIcon} />
          </a>
        </Tooltip>
      )}
      {!collapsed && (
        <Tooltip content={t('Display')}>
          <a onClick={() => setThemeSettingModalOpen(true)}>
            <IconButton icon={themeIcon} />
          </a>
        </Tooltip>
      )}
      <Tooltip content={t('Settings')}>
        <Link to="/setting">
          <IconButton icon={settingIcon} />
        </Link>
      </Tooltip>
    </div>
  </div>
  <CommandBar />
  <GuideModal />
  <ThemeSettingModal open={themeSettingModalOpen} onClose={() => setThemeSettingModalOpen(false)} />
</motion.aside>
  )
}

export default Sidebar