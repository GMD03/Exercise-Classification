# Rehabelt (Exercise Classification)

Rehabelt is an ESP32-S3 based rehabilitation monitoring device that utilizes Machine Learning (TensorFlow Lite Micro via EloquentTinyML) and an Adafruit BNO055 IMU to classify patient exercises in real-time. It monitors movements, calculates gait metrics, and logs the data to an SD card. The device also features a built-in WiFi hotspot dashboard to retrieve the logged data.

## Features
- **Real-Time Exercise Classification**: Predicts exercises including `Walking`, `Sit-to-Stand`, and `Supine-to-Sit`.
- **Gait Metrics Calculation**: Estimates `Cadence`, `Lateral Sway`, and `Step Length` when walking is detected.
- **Data Logging**: Automatically logs classified exercises and gait metrics to an SD card (`exercise.csv` and `gait.csv`).
- **WiFi Dashboard**: Toggleable WiFi Access Point mode (`ESP32-Rehab-Device`) to download and clear logs via a web dashboard.
- **Haptic Feedback**: Uses a vibration motor to alert the user upon specific conditions.

## Hardware Components
- ESP32-S3 Microcontroller
- Adafruit BNO055 9-DOF IMU (I2C)
- SD Card Module (SPI)
- Status and WiFi LEDs
- Vibration Motor
- Hardware Switch (WiFi Mode Toggle)

## Project Structure
- `Rehabelt_Firmware/`: Contains the Arduino firmware and the deployed model header.
  - `Rehabelt_Firmware/Rehabelt_Firmware.ino`: Main ESP32-S3 source code.
  - `Rehabelt_Firmware/model_data.h`: TensorFlow Lite Micro model array.
  - `Rehabelt_Deploy.ipynb`: Jupyter notebook for model training and deployment.
- `Rehabelt System_Integration Manual.pdf`: Documentation for system integration.

## Getting Started

### Prerequisites
- [Arduino IDE](https://www.arduino.cc/en/software)
- Required Arduino Libraries:
  - `Adafruit_BNO055`
  - `Adafruit_Sensor`
  - `EloquentTinyML` (for running the TF Lite model)
  - ESP32 standard libraries (`WiFi`, `FS`, `SD`, `SPI`)

### Installation & Deployment
1. Clone this repository to your local machine.
2. Open `Rehabelt_Firmware/Rehabelt_Firmware/Rehabelt_Firmware.ino` in your Arduino IDE.
3. Select your ESP32-S3 board in the Arduino IDE board manager.
4. Compile and upload the sketch to the ESP32.

### Usage
- **Normal Mode**: The device calibrates the IMU upon startup (indicated by a blinking status LED). Once calibrated (solid LED), it continuously monitors motion. If significant motion is detected, it predicts the activity using the embedded ML model and logs it to the SD card.
- **WiFi Mode**: Flip the hardware switch to activate the WiFi Access Point. Connect to the `ESP32-Rehab-Device` network (Password: `rehab1234`) and access the dashboard to download or clear your data logs.
