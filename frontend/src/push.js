// Web Push registration and subscription logic
// You must provide your VAPID public key below
const VAPID_PUBLIC_KEY = 'BAdPn4s6LzCH3dZhh45SPcDGtvyCe8Ukp48KtvR7iLYVxWTAUY9TO8kGyQANDznJ4oQh3nEHSKhlWjlWSP0nvJc';

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    return await navigator.serviceWorker.register('/sw.js');
  }
  throw new Error('Service workers are not supported');
}

export async function subscribeUserToPush() {
  const registration = await registerServiceWorker();
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });
  // Send subscription to backend
  await fetch(`${import.meta.env.VITE_API_URL}/api/push/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription)
  });
  return subscription;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
