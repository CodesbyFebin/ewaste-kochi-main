# Old-Site Unused Verification Token Report

Phase: OLD-SITE-GSC-CLEANUP

## Status

Unused ownership token removal was not completed from this session.

Reason:

- The required Google Search Console UI screen is authenticated.
- The in-app browser target is unavailable in this environment.
- Local Google credentials do not have Search Console API scope.
- DNS/Google Analytics/Google Tag Manager ownership tokens cannot be safely inspected or removed from this repository alone.

## Source Scan

No obvious Google Search Console verification HTML file or meta verification token was found in active V2 source during the repo identity/source scan.

Potential token locations that still require manual GSC review:

- DNS TXT record
- Google Analytics
- Google Tag Manager
- Domain provider
- Old static HTML file outside this checkout
- Old deployment artifact outside this checkout

## Manual Action Required

In Google Search Console:

1. Open Settings -> Users and permissions -> Unused ownership tokens.
2. Record verification method, associated owner/user, and token location.
3. Remove only if the token is clearly unused and its location is confirmed.
4. Click Verify removal in GSC.

Do not remove DNS, Analytics, or Tag Manager tokens blindly.
