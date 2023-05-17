from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from engineio.async_drivers import gevent
import pyautogui

import socket
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


app = Flask(__name__)
socketio = SocketIO(app, async_mode='gevent')

@app.route('/')
def home():
    return render_template('index.html')

@socketio.on('touchmove')
def handle_touchmove(data):
    dx = data['dx']
    dy = data['dy']
    x, y = pyautogui.position()
    pyautogui.moveTo(x + dx, y + dy, _pause=False)

@socketio.on('scroll')
def handle_scroll(data):
    dy = int(data['dy'])  # convert dy to integer
    pyautogui.scroll(dy, _pause=False)


@socketio.on('click')
def handle_click():
    pyautogui.click()

if __name__ == '__main__':
    local_ip = get_local_ip()
    print(f'Running on http://{local_ip}:8080')
    socketio.run(app, host='0.0.0.0', port=8080)

