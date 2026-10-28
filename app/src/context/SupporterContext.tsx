import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export const SUPPORTER_STATUS_READ_ATTEMPTS = 1;

export type SupporterState = 'loading' | 'inactive' | 'active' | 'needs_refresh' | 'expired' | 'revoked' | 'unavailable';

export interface SupporterStatus {
  state: SupporterState;
  ad_free: boolean;
  message: string;
  terms_version: string;
  terms_url: string | null;
  expires_at: number | null;
  offline_until: number | null;
  recovery_code_saved: boolean;
  checkout_pending?: boolean;
}

interface CheckoutStarted {
  approval_url: string;
  expires_at: number;
}

export interface CheckoutPollResult {
  status: string;
  recovery_code: string | null;
  message: string;
}

interface SupporterContextValue {
  status: SupporterStatus;
  latestRecoveryCode: string | null;
  refreshStatus: () => Promise<SupporterStatus>;
  beginCheckout: (termsVersion: string) => Promise<CheckoutStarted>;
  pollCheckout: () => Promise<CheckoutPollResult>;
  activate: (recoveryCode: string, termsVersion: string) => Promise<SupporterStatus>;
  refreshEntitlement: () => Promise<SupporterStatus>;
}

const virajVerseActiveStatus: SupporterStatus = {
  state: 'active',
  ad_free: true,
  message: 'VirajVerse Lifetime Premium Activated',
  terms_version: '2026-08-11',
  terms_url: null,
  expires_at: null,
  offline_until: null,
  recovery_code_saved: true,
  checkout_pending: false,
};

const SupporterContext = createContext<SupporterContextValue | null>(null);

export function SupporterProvider({ children }: { children: ReactNode }) {
  const [status] = useState<SupporterStatus>(virajVerseActiveStatus);

  const refreshStatus = useCallback(async () => virajVerseActiveStatus, []);
  const refreshEntitlement = useCallback(() => Promise.resolve(virajVerseActiveStatus), []);
  const pollCheckout = useCallback(async () => ({
    status: 'completed',
    recovery_code: null,
    message: 'Active',
  }), []);
  const beginCheckout = useCallback(async () => ({
    approval_url: '',
    expires_at: 0,
  }), []);
  const activate = useCallback(async () => virajVerseActiveStatus, []);

  const value = useMemo<SupporterContextValue>(() => ({
    status,
    latestRecoveryCode: null,
    refreshStatus,
    beginCheckout,
    pollCheckout,
    activate,
    refreshEntitlement,
  }), [status, refreshStatus, beginCheckout, pollCheckout, activate, refreshEntitlement]);

  return (
    <SupporterContext.Provider value={value}>
      {children}
    </SupporterContext.Provider>
  );
}

export function useSupporter() {
  const context = useContext(SupporterContext);
  if (!context) {
    throw new Error('useSupporter must be used within a SupporterProvider');
  }
  return context;
}
