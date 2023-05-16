const socket = io();
const trackpad = document.getElementById('trackpad');
let currentTouch = null;
let lastTouch = null;
let touchStartTime = null;
let emitInterval = null;
let scrollInterval = null;

const scrollThreshold = 50; // In pixels; Adjust this value as needed
const emitTimer = 30; // In miliseconds; Adjust this value as needed
const clickTimeThreshold = 100; // In miliseconds; Adjust this value as needed
const clickDistThreshold = 10; // In pixels; Adjust this value as needed

trackpad.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent scrolling while touching
    const touch = event.touches[0];
    currentTouch = lastTouch = { clientX: touch.clientX, clientY: touch.clientY };
    touchStartTime = Date.now();
    if (window.innerWidth - touch.clientX < scrollThreshold) {
        scrollInterval = setInterval(() => {
            if (currentTouch && lastTouch) {
                const dy = currentTouch.clientY - lastTouch.clientY;
                socket.emit('scroll', { dy });
                lastTouch = { clientX: currentTouch.clientX, clientY: currentTouch.clientY };
            }
        }, emitTimer); // Emit event every 100ms
    } else {
        emitInterval = setInterval(() => {
            if (lastTouch && currentTouch) {
                const dx = currentTouch.clientX - lastTouch.clientX;
                const dy = currentTouch.clientY - lastTouch.clientY;
                socket.emit('touchmove', { dx, dy });
                lastTouch = { clientX: currentTouch.clientX, clientY: currentTouch.clientY };
            }
        }, emitTimer); // Emit event every 100ms
    }
});

trackpad.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling while touching
    const touch = event.touches[0];
    currentTouch = { clientX: touch.clientX, clientY: touch.clientY };
});

trackpad.addEventListener('touchend', () => {
    if (emitInterval) {
        clearInterval(emitInterval);
        emitInterval = null;
    }
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
    if (currentTouch && lastTouch) {
        const dx = currentTouch.clientX - lastTouch.clientX;
        const dy = currentTouch.clientY - lastTouch.clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        if (touchDuration < clickTimeThreshold && Math.hypot(dx, dy) < clickDistThreshold) {
            socket.emit('click');
        }
    }
    currentTouch = lastTouch = null;
    touchStartTime = null;
});