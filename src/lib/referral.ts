const REFERRAL_COOKIE_NAME = 'mrcine_ref';
const REFERRAL_COOKIE_MAX_AGE = 30 * 24 * 60 * 60;

export function captureReferral(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  if (refCode && refCode.length >= 2 && refCode.length <= 50) {
    const existing = getReferralCode();
    if (!existing) {
      document.cookie = [
        REFERRAL_COOKIE_NAME + '=' + encodeURIComponent(refCode),
        'max-age=' + REFERRAL_COOKIE_MAX_AGE,
        'path=/',
        'SameSite=Lax',
        'Secure',
      ].join('; ');
      return refCode;
    }
    return existing;
  }
  return getReferralCode();
}

export function getReferralCode(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === REFERRAL_COOKIE_NAME && value) return decodeURIComponent(value);
  }
  return null;
}
