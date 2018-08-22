const publicVapidKey = 'BN-2l85vuExC2JIohWCNf4jm6qnISRt2lwoInl2iv0nFcUgudWU8yopLs64yZ_DZ1NUY_-AczN3rZvuEVPd2w5c';

// cheking for service worker

if ('serviceWorker' in navigator) {
    send().catch(e => console.error(e));
}

async function send() {
    // registering service worker
    const register = await navigator.serviceWorker.register('/serviceWorker.js', {
        scope: '/'
    });

    // registering push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    // sending push notification
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}