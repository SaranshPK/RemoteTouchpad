from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import pyautogui

app = Flask(__name__)
socketio = SocketIO(app)

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
    socketio.run(app, host='0.0.0.0', port=8080)
