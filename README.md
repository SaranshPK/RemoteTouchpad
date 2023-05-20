# Remote TouchPad

Remote TouchPad is a Windows executable which will host a local Web Application that allows you to use your phone or any other touch device as a trackpad for your computer.

## Features

- Supports basic mouse operations like movement, click, double click, click and drag, double click and drag, and scroll.
- Settings to control various parameters for your conveniance.

## How to Run

There are two ways to run the TouchPad:

1. Via the executable file:
   - Download the exe file [here](
https://github.com/SaranshPK/RemoteTouchpad/raw/master/RemoteTouchPad.exe).
   - Run the exe file.
   - You will be shown a QR code which links to your local IP address.
   - Either scan the QR code or manually open your browser on your touch device and go to `http://<your-local-ip>:48080`.
   - Replace `<your-local-ip>` with the actual IP address printed by the executable.

2. Via the Python script:
   - Clone the repository.
   - Install the necessary packages using pip: `pip install -r requirements.txt`.
   - Run the Python script: `python app.py`.
   - You will be shown a QR code which links to your local IP address.
   - Either scan the QR code or manually open your browser on your touch device and go to `http://<your-local-ip>:48080`.
   - Replace `<your-local-ip>` with the actual IP address printed by the script.

NOTE: The close button minimized the program to your Tray, you can quit the App from the Tray.

## Settings

- Emit Timer: Control the frequency of messages sent to the server. Lower values make the mouse move smoother but may increase CPU usage or lag due to network speeds.
- Mouse Speed: Adjust the speed of the mouse movement. Logrithmic Scale
- Click Time Threshold: Maximum time for a touch to be considered as a click.
- Click Distance Threshold: Maximum movement for a touch to be considered as a click.
- Scroll Threshold: Percentage of space from the right side of the screen which will be used for scrolling.
- Scroll Speed: Adjust the speed of scrolling. Logrithmic Scale
- Dark Mode: By default this is enabled but if you want light mode click the sun icon.
- Left Handed Mode: Switches the location of the scroll bar.

## FAQ

1. How do I scroll?

    You can scroll with two fingers or with a single finger on the right side defined by the Scroll Threshold, look at the Settings section for more info.

2. How do I drag?

    1.5 taps
    Tap once and then on the second tap hold and move

3. How do I save my settings?

    They automatically get saved, to close the settings screen click the gear icon.
    
3. Do my settings persist?

    Yes.

4. How do I go back to the default settings?

    Click the reset button (undo icon).

5. Why did you make this even though there are so many existing products that do the same thing?

    I wanted something open source to make scrolling easier (the rest of the features are a bonus).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
