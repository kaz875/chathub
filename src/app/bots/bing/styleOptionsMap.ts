import { BingConversationStyle } from '~services/user-config';

export const styleOptionsMap: Record<BingConversationStyle, string[]> = {
  [BingConversationStyle.Balanced]: [
    'nlu_direct_response_filter',
    'deepleo',
    'disable_emoji_spoken_text',
    'responsible_ai_policy_235',
    'enablemm',
    'galileo',
    'dv3sugg',
    'responseos',
    'e2ecachewrite',
    'cachewriteext',
    'nodlcpcwrite',
    'travelansgnd',
    'nojbfedge',
  ],
  [BingConversationStyle.Creative]: [
    'nlu_direct_response_filter',
    'deepleo',
    'disable_emoji_spoken_text',
    'responsible_ai_policy_235',
    'enablemm',
    'h3imaginative',
    'travelansgnd',
    'dv3sugg',
    'clgalileo',
    'gencontentv3',
    'dv3sugg',
    'responseos',
    'e2ecachewrite',
    'cachewriteext',
    'nodlcpcwrite',
    'travelansgnd',
    'nojbfedge',
  ],
  [BingConversationStyle.Precise]: [
    'nlu_direct_response_filter',
    'deepleo',
    'disable_emoji_spoken_text',
    'responsible_ai_policy_235',
    'enablemm',
    'galileo',
    'dv3sugg',
    'responseos',
    'e2ecachewrite',
    'cachewriteext',
    'nodlcpcwrite',
    'travelansgnd',
    'h3precise',
    'clgalileo',
    'nojbfedge',
  ],
};
