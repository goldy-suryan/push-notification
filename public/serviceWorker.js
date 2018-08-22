
self.addEventListener('push', e => {
    // getting payload (title in this case);
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: 'notification received by example'
    });
});