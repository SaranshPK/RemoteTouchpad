// Get a reference to all our new elements
const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const scrollThresholdInput = document.getElementById('scroll-threshold-input');
const emitTimerInput = document.getElementById('emit-timer-input');
const clickTimeThresholdInput = document.getElementById('click-time-threshold-input');
const clickDistThresholdInput = document.getElementById('click-dist-threshold-input');
const scrollSpeedInput = document.getElementById('scroll-speed-input');
const resetSettingsButton = document.getElementById('reset-settings-button');
const closeSettingsButton = document.getElementById('close-settings-button');

const scrollThresholdValue = document.getElementById('scroll-threshold-value');
const emitTimerValue = document.getElementById('emit-timer-value');
const clickTimeThresholdValue = document.getElementById('click-time-threshold-value');
const clickDistThresholdValue = document.getElementById('click-dist-threshold-value');
const scrollSpeedValue = document.getElementById('scroll-speed-value');
const mouseSpeedValue = document.getElementById('mouse-speed-value');

const scrollThresholdDefault = 50;
const emitTimerDefault = 10;
const clickTimeThresholdDefault = 100;
const clickDistThresholdDefault = 10;
const scrollSpeedDefault = 1.0;
const mouseSpeedDefault = 1.0;

// Check localStorage for any saved settings
let scrollThreshold = localStorage.getItem('scrollThreshold') || scrollThresholdDefault;
let emitTimer = localStorage.getItem('emitTimer') || emitTimerDefault;
let clickTimeThreshold = localStorage.getItem('clickTimeThreshold') || clickTimeThresholdDefault;
let clickDistThreshold = localStorage.getItem('clickDistThreshold') || clickDistThresholdDefault;
let scrollSpeed = localStorage.getItem('scrollSpeed') || scrollSpeedDefault;
let mouseSpeed = localStorage.getItem('mouseSpeed') || mouseSpeedDefault;
let realizedScrollSpeed = Math.pow(10, scrollSpeed - 1);
let realizedMouseSpeed = Math.pow(10, mouseSpeed - 1);

// Set the inputs to reflect the current settings
scrollThresholdInput.value = scrollThreshold;
emitTimerInput.value = emitTimer;
clickTimeThresholdInput.value = clickTimeThreshold;
clickDistThresholdInput.value = clickDistThreshold;
scrollSpeedInput.value = scrollSpeed;

scrollThresholdValue.textContent = scrollThresholdInput.value;
emitTimerValue.textContent = emitTimerInput.value;
clickTimeThresholdValue.textContent = clickTimeThresholdInput.value;
clickDistThresholdValue.textContent = clickDistThresholdInput.value;
scrollSpeedValue.textContent = parseFloat(scrollSpeedInput.value).toFixed(1);

const socket = io();
const trackpad = document.getElementById('trackpad');
let currentTouch = null;
let lastTouch = null;
let touchStartTime = null;
let emitInterval = null;
let scrollInterval = null;

trackpad.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent scrolling while touching
    newTouch();
    const touches = event.touches;
    if (touches.length === 1) {
        const touch = touches[0];
        currentTouch = lastTouch = { clientX: touch.clientX, clientY: touch.clientY };
        touchStartTime = Date.now();
        if (window.innerWidth - touch.clientX < scrollThreshold) {
            scrollInterval = setInterval(() => {
                if (currentTouch && lastTouch) {
                    const dy = currentTouch.clientY - lastTouch.clientY;
                    socket.emit('scroll', { dy: dy * realizedScrollSpeed });
                    lastTouch = { clientX: currentTouch.clientX, clientY: currentTouch.clientY };
                }
            }, emitTimer);
        } else {
            emitInterval = setInterval(() => {
                if (lastTouch && currentTouch) {
                    const dx = currentTouch.clientX - lastTouch.clientX;
                    const dy = currentTouch.clientY - lastTouch.clientY;
                    socket.emit('touchmove', { dx: dx * realizedMouseSpeed, dy: dy * realizedMouseSpeed });
                    lastTouch = { clientX: currentTouch.clientX, clientY: currentTouch.clientY };
                }
            }, emitTimer);
        }
    } else if (touches.length === 2) {
        currentTouch = lastTouch = {
            clientX: (touches[0].clientX + touches[1].clientX) / 2,
            clientY: (touches[0].clientY + touches[1].clientY) / 2
        };
        scrollInterval = setInterval(() => {
            if (currentTouch && lastTouch) {
                const dy = currentTouch.clientY - lastTouch.clientY;
                socket.emit('scroll', { dy: dy * realizedScrollSpeed });
                lastTouch = { clientX: currentTouch.clientX, clientY: currentTouch.clientY };
            }
        }, emitTimer);
    }
});

trackpad.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling while touching
    const touch = event.touches[0];
    currentTouch = { clientX: touch.clientX, clientY: touch.clientY };
});

trackpad.addEventListener('touchend', () => {
    reset();
    if (currentTouch && lastTouch) {
        const dx = currentTouch.clientX - lastTouch.clientX;
        const dy = currentTouch.clientY - lastTouch.clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        if (touchDuration < clickTimeThreshold && Math.hypot(dx, dy) < clickDistThreshold) {
            socket.emit('click');
        }
    }
});

// Method to handle chagen in touches
function newTouch() {
    reset();
    currentTouch = lastTouch = null;
    touchStartTime = null;
}

function reset() {
    if (emitInterval) {
        clearInterval(emitInterval);
        emitInterval = null;
    }
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// Show and hide the settings panel when the settings button is clicked
settingsButton.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
    settingsButton.classList.toggle('rotate');
});

scrollThresholdInput.addEventListener('input', () => {
    scrollThresholdValue.textContent = scrollThresholdInput.value;
    scrollThreshold = parseFloat(scrollThresholdInput.value);
    localStorage.setItem('scrollThreshold', scrollThreshold);
});

emitTimerInput.addEventListener('input', () => {
    emitTimerValue.textContent = emitTimerInput.value;
    emitTimer = parseFloat(emitTimerInput.value);
    localStorage.setItem('emitTimer', emitTimer);
});

clickTimeThresholdInput.addEventListener('input', () => {
    clickTimeThresholdValue.textContent = clickTimeThresholdInput.value;
    clickTimeThreshold = parseFloat(clickTimeThresholdInput.value);
    localStorage.setItem('clickTimeThreshold', clickTimeThreshold);
});

clickDistThresholdInput.addEventListener('input', () => {
    clickDistThresholdValue.textContent = clickDistThresholdInput.value;
    clickDistThreshold = parseFloat(clickDistThresholdInput.value);
    localStorage.setItem('clickDistThreshold', clickDistThreshold);
});

scrollSpeedInput.addEventListener('input', () => {
    scrollSpeedValue.textContent = parseFloat(scrollSpeedInput.value).toFixed(1);
    scrollSpeed = parseFloat(scrollSpeedInput.value);
    localStorage.setItem('scrollSpeed', scrollSpeed);
    realizedScrollSpeed = Math.pow(10, scrollSpeed - 1);
});

mouseSpeedInput.addEventListener('input', () => {
    mouseSpeedValue.textContent = parseFloat(mouseSpeedInput.value).toFixed(1);
    mouseSpeed = parseFloat(mouseSpeedInput.value);
    localStorage.setItem('mouseSpeed', mouseSpeed);
    realizedMouseSpeed = Math.pow(10, mouseSpeed - 1);
});


// Reset settings to default values when the reset button is clicked
resetSettingsButton.addEventListener('click', () => {
    scrollThreshold = scrollThresholdDefault;
    emitTimer = emitTimerDefault;
    clickTimeThreshold = clickTimeThresholdDefault;
    clickDistThreshold = clickDistThresholdDefault;
    scrollSpeed = scrollSpeedDefault;
    mouseSpeed = mouseSpeedDefault;
    realizedScrollSpeed = Math.pow(10, scrollSpeed - 1);
    realizedMouseSpeed = Math.pow(10, mouseSpeed - 1);

    // Reset localStorage
    localStorage.clear();

    // Set the inputs to reflect the current settings
    scrollThresholdInput.value = scrollThreshold;
    emitTimerInput.value = emitTimer;
    clickTimeThresholdInput.value = clickTimeThreshold;
    clickDistThresholdInput.value = clickDistThreshold;
    scrollSpeedInput.value = scrollSpeed;
    mouseSpeedInput.value = mouseSpeed;

    scrollThresholdValue.textContent = scrollThresholdInput.value;
    emitTimerValue.textContent = emitTimerInput.value;
    clickTimeThresholdValue.textContent = clickTimeThresholdInput.value;
    clickDistThresholdValue.textContent = clickDistThresholdInput.value;
    scrollSpeedValue.textContent = parseFloat(scrollSpeedInput.value).toFixed(1);
    mouseSpeedValue.textContent = parseFloat(mouseSpeedInput.value).toFixed(1);
});
