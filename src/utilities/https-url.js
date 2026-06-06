/**
 * Google Books (and some other APIs) still return http:// asset URLs.
 * Loading them from an https:// page triggers mixed-content warnings.
 */
export function httpsUrl(url) {
  if (url == null || typeof url !== 'string') return url;
  return url.startsWith('http://') ? `https://${url.slice(7)}` : url;
}
