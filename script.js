/**
 * script.js
 * Client-side logic for CloakScan.
 * No external requests, no logging, purely in-browser.
 */

// IP Detection
document.getElementById('detect-ip').addEventListener('click', detectIPs);

function detectIPs() {
  const ipDisplay = document.getElementById('public-ip');
  const localIpsDiv = document.getElementById('local-ips');
  ipDisplay.textContent = 'Detecting IP Addresses...';
  localIpsDiv.innerHTML = '';

  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel('');
  let localIPs = {};
  let publicIPs = {};

  pc.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate) return;
    parseCandidate(ice.candidate.candidate);
  };

  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .catch((err) => console.error('IP Detection Error:', err));

  function parseCandidate(candidate) {
    const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})|([a-fA-F0-9:]+:+)+[a-fA-F0-9]+/;
    const ipMatch = candidate.match(ipRegex);
    if (!ipMatch) return;

    const ip = ipMatch[0];
    if (isLocalIP(ip)) localIPs[ip] = true;
    else publicIPs[ip] = true;

    displayIPs();
  }

  function isLocalIP(ip) {
    return (
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip) ||
      ip.startsWith('fe80:') || ip.includes('::')
    );
  }

  function displayIPs() {
    ipDisplay.textContent = 'Public IP(s): ' + (Object.keys(publicIPs).join(', ') || 'Not detected');
    localIpsDiv.textContent = 'Local IP(s): ' + (Object.keys(localIPs).join(', ') || 'Not detected');
  }
}

// Geolocation
document.getElementById('detect-geo').addEventListener('click', detectGeo);

function detectGeo() {
  const geoResults = document.getElementById('geo-results');
  geoResults.textContent = 'Requesting location...';

  if (!navigator.geolocation) {
    geoResults.textContent = 'Geolocation not supported.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      geoResults.textContent = `Latitude: ${latitude}, Longitude: ${longitude} (Accuracy: ~${accuracy}m)`;
    },
    (err) => {
      geoResults.textContent = err.message || 'Error fetching location.';
    },
    { timeout: 10000 }
  );
}

// Browser Fingerprint
document.getElementById('show-fingerprint').addEventListener('click', showFingerprint);

function showFingerprint() {
  const details = getBrowserDetails();
  document.getElementById('fingerprint-details').innerHTML = `
    <p><strong>User Agent:</strong> ${details.userAgent}</p>
    <p><strong>Language:</strong> ${details.language}</p>
    <p><strong>Screen Resolution:</strong> ${details.screenResolution}</p>
    <p><strong>Timezone:</strong> ${details.timezone}</p>
  `;
}

function getBrowserDetails() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language || navigator.languages[0],
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

// Cookie and Local Storage Check
document.getElementById('check-storage').addEventListener('click', checkStorage);

function checkStorage() {
  const cookies = document.cookie.split(';').map(c => c.trim()).filter(c => c);
  const localStorageItems = Object.keys(localStorage).map(key => ({ key, value: localStorage.getItem(key) }));
  document.getElementById('storage-results').innerHTML = `
    <p><strong>Cookies:</strong> ${cookies.length}</p>
    <p><strong>Local Storage Items:</strong> ${localStorageItems.length}</p>
  `;
}

// Third-Party Requests
document.getElementById('check-third-party').addEventListener('click', checkThirdPartyRequests);

function checkThirdPartyRequests() {
  const requests = performance.getEntriesByType('resource')
    .filter(entry => {
      try {
        return new URL(entry.name).origin !== window.location.origin;
      } catch {
        return false;
      }
    });
  document.getElementById('third-party-results').innerHTML = `
    <p><strong>Third-Party Requests:</strong> ${requests.length}</p>
    ${requests.map(req => `<p>${req.name}</p>`).join('')}
  `;
}
