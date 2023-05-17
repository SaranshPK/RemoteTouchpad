# Remote TouchPad

Remote TouchPad is a Windows executable which will host a local Web Application that allows you to use your phone or any other touch device as a trackpad for your computer.

## Features

- Supports basic mouse operations like movement, click, and scroll.
- Settings to control various parameters for a personalized experience.

## How to Run

There are two ways to run the TouchPad:

1. Via the executable file:
   - Download the exe file [here](
https://github.com/SaranshPK/RemoteTouchpad/raw/master/RemoteTouchPad.exe).
   - Run the exe file. You will be prompted with your local IP address.
   - Open your browser on your touch device and go to `http://<your-local-ip>:8080`.
   - Replace `<your-local-ip>` with the actual IP address printed by the executable.

2. Via the Python script:
   - Clone the repository.
   - Install the necessary packages using pip: `pip install -r requirements.txt`.
   - Run the Python script: `python app.py`.
   - You will be prompted with your local IP address.
   - Open your browser on your touch device and go to `http://<your-local-ip>:8080`.
   - Replace `<your-local-ip>` with the actual IP address printed by the script.

Remember to keep the script or executable running for as long as you want to use the TouchPad.

## Settings

- Emit Timer: Control the frequency of messages sent to the server. Lower values make the mouse move smoother but may increase CPU usage or lag due to network speeds.
- Mouse Speed: Adjust the speed of the mouse movement. Logrithmic Scale
- Click Time Threshold: Maximum time for a touch to be considered as a click.
- Click Distance Threshold: Maximum movement for a touch to be considered as a click.
- Scroll Threshold: Distance from the right edge of the screen to activate scrolling.
- Scroll Speed: Adjust the speed of scrolling. Logrithmic Scale

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
