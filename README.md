# CloakScan - Your Privacy Sentinel

A cutting-edge, zero-log privacy tool hosted on GitHub Pages.

## Features

- **IP Detection**: Discover your public and local IPs via WebRTC (no external servers).
- **Geolocation**: Reveal your approximate location using the HTML5 Geolocation API.
- **DNS Leak Info**: Learn about DNS leaks and how to test for them manually.
- **WebRTC Leak Info**: Get tips on preventing WebRTC leaks.
- **Browser Fingerprint**: View details that make your browser unique.
- **Cookie/Local Storage**: Check for tracking data stored in your browser.
- **Third-Party Requests**: Detect any external resource loads.
- **Security Headers**: Understand important security headers.
- **VPN/Proxy Info**: Learn how VPNs and proxies can enhance your privacy.

## Mobile Compatibility

CloakScan is designed to be fully responsive and works seamlessly on mobile devices. Interactive elements are optimized for touch, and the layout adapts to various screen sizes.

## Deployment

1. Clone or fork this repository.
2. Push to GitHub (e.g., `username.github.io/cloakscan`).
3. In **Settings > Pages**, select `main` branch and `/ (root)`.
4. Visit the generated URL (e.g., `https://username.github.io/cloakscan`).

## Notes

- **No Logging**: All checks are performed client-side; no data is stored or sent.
- **DNS Limitations**: True DNS leak tests require server-side logic, which is not possible here.
- **Browser Compatibility**: WebRTC IP detection may vary across browsers.

## License

Free to use and modify under the MIT License.
