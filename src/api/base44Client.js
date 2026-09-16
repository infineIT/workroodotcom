import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;
const configuredAppId = typeof appId === 'string' && appId.trim() ? appId : null;

// The marketing site can run without Base44. It is only used for optional blog
// content, so do not create or call a client when deployment configuration is absent.
export const hasBase44Config = Boolean(configuredAppId);
export const base44 = hasBase44Config
  ? createClient({
      appId: configuredAppId,
      token,
      functionsVersion,
      serverUrl: '',
      requiresAuth: false,
      appBaseUrl
    })
  : null;
