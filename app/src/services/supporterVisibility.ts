export const SUPPORTER_PROMPT_INTERVAL_MS = 7 * 24 * 60 * 60 * 1_000;
export const SPONSOR_AD_INTERVAL_MS = 15 * 60 * 1_000;
export const SUPPORTER_VALUE_MOMENT_EVENT = 'virajverse-drive-supporter-value-moment';

export type SupporterValueMoment = 'upload_completed' | 'download_completed';
export type SupporterPromptTrigger = 'weekly' | 'ad_dismissed' | SupporterValueMoment;

interface SupporterVisibilityStatus {
  state: string;
  ad_free: boolean;
  recovery_code_saved?: boolean;
  checkout_pending?: boolean;
}

export function shouldShowSponsorContent(_status?: SupporterVisibilityStatus): boolean {
  return false;
}

export function sponsorAdCooldownRemaining(
  _dismissedAt: number | null,
  _now = Date.now(),
): number {
  return 0;
}

export function shouldOfferNewSupporterPurchase(_status?: SupporterVisibilityStatus): boolean {
  return false;
}

export function announceSupporterValueMoment(_moment: SupporterValueMoment): void {
  // No-op for VirajVerse
}

export function isSupporterPromptDue(
  _status?: SupporterVisibilityStatus,
  _lastShownAt?: number,
  _now = Date.now(),
): boolean {
  return false;
}

export function shouldShowSupporterPrompt(
  _status?: SupporterVisibilityStatus,
  _lastShownAt?: number,
  _now = Date.now(),
): boolean {
  return false;
}
