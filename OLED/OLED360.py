import board
import busio
import adafruit_ssd1306
from PIL import Image, ImageDraw, ImageFont
import RPi.GPIO as GPIO
import time

# Set up GPIO for OLED reset
RESET_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(RESET_PIN, GPIO.OUT)
GPIO.output(RESET_PIN, GPIO.HIGH)

# Reset OLED display
GPIO.output(RESET_PIN, GPIO.LOW)
time.sleep(0.1)
GPIO.output(RESET_PIN, GPIO.HIGH)
time.sleep(0.1)

# Initialize I2C
i2c = busio.I2C(board.SCL, board.SDA)

# Initialize OLED display
oled_reset = None  # Reset pin is handled manually
oled = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c, reset=oled_reset)

# Create blank image for drawing
image = Image.new("1", (oled.width, oled.height))

# Get drawing object to draw on image
draw = ImageDraw.Draw(image)

# Load a font
font = ImageFont.load_default()

# Draw "Hello" on the image
draw.text((0, 0), "Hello", font=font, fill=255)

# Display the image
oled.image(image)
oled.show()
