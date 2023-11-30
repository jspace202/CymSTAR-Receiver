import numpy as np
import matplotlib.pyplot as plt

# Define parameters
f1 = 400  # Frequency of excitation signal in Hz
f2 = 20   # Frequency of rotor position in Hz

T1 = 1 / f1  # Period of excitation signal
T2 = 1 / f2  # Period of rotor position

# Time vector, covering 1 period of rotor position and sampled at 100 times per excitation period
t = np.arange(0, T2, 1 / (f1 * 100))

# Generate the sine waves
y1 = np.sin(2 * np.pi * f1 * t)

rotor_angle = (2 * np.pi * f2) * t
v31 = np.sin(rotor_angle) * y1
v23 = np.sin(rotor_angle + np.deg2rad(120)) * y1
v12 = np.sin(rotor_angle + np.deg2rad(240)) * y1

# Calculate effective angle
def calculate_angle(x, y, z, s):
    # Sign of the excitation signal
    adjustment = np.sign(s)

    # Numerator and denominator, sign adjusted
    numerator = (z - x) * adjustment
    denominator = (y - ((x + z) / 2)) * (2 / np.sqrt(3)) * adjustment

    # Calculate angle and unwrap to correct for jumps between -π and +π
    rad_angle = np.unwrap(np.arctan2(denominator, numerator))

    return rad_angle

calc_angle = calculate_angle(v12, v31, v23, y1)

# Plot the results
plt.plot(t, calc_angle)
plt.xlabel('Time')
plt.ylabel('Effective Angle')
plt.title('Effective Angle vs Time')
plt.show()
