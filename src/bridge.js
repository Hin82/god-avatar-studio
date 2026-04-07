/**
 * PostMessage bridge for React Native WebView communication.
 * Enables the Expo app to receive avatar data from Character Studio.
 */

const BRIDGE_PREFIX = 'god-avatar-studio';

// Check if running inside React Native WebView
export function isInWebView() {
  return typeof window.ReactNativeWebView !== 'undefined';
}

// Send message to React Native WebView
export function sendToApp(type, data = {}) {
  const message = JSON.stringify({
    source: BRIDGE_PREFIX,
    type,
    ...data,
  });

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(message);
  } else {
    // Fallback for iframe embedding
    window.parent.postMessage(message, '*');
  }
}

// Send ready signal
export function sendReady() {
  sendToApp('ready');
}

// Send avatar exported with GLB data as base64
export function sendAvatarExported(glbArrayBuffer, thumbnailDataUrl = null) {
  // Convert ArrayBuffer to base64
  const bytes = new Uint8Array(glbArrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const glbBase64 = btoa(binary);

  sendToApp('avatar-exported', {
    glb: glbBase64,
    thumbnail: thumbnailDataUrl,
    format: 'glb',
  });
}

// Send avatar selection info (traits chosen)
export function sendAvatarSelection(selection) {
  sendToApp('avatar-selection', { selection });
}

// Listen for messages from React Native
export function listenForAppMessages(handlers = {}) {
  const handleMessage = (event) => {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data?.source === 'react-native' && handlers[data.type]) {
        handlers[data.type](data);
      }
    } catch {
      // ignore non-JSON messages
    }
  };

  window.addEventListener('message', handleMessage);
  document.addEventListener('message', handleMessage); // Android WebView

  return () => {
    window.removeEventListener('message', handleMessage);
    document.removeEventListener('message', handleMessage);
  };
}

// Initialize bridge — call once on app startup
export function initBridge() {
  if (isInWebView()) {
    console.log('[Bridge] Running inside React Native WebView');
    sendReady();
  }
}
