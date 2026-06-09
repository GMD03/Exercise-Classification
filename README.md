# Rehabelt (Exercise Classification) - Edge AI Deployment

Rehabelt is an ESP32-S3 based rehabilitation monitoring device that classifies patient exercises in real-time. This project is a prime example of **Edge AI**, demonstrating that the success of a powerful AI model relies heavily on **efficient hardware** and **strategic hardware deployment planning**. 

By deploying a TensorFlow Lite Micro model directly onto the ESP32-S3 via EloquentTinyML, Rehabelt bypasses the need for cloud-based inference. This ensures zero latency, complete data privacy, and significant power efficiency—all critical factors in medical IoT and wearable devices.

## The Edge AI Paradigm: Why Hardware Matters

A great AI model is useless if it cannot be deployed efficiently in the real world. Rehabelt highlights several core principles of Edge deployment:
- **Resource Constraints**: Training a model is only half the battle. Quantizing and optimizing that model to fit within the limited SRAM and flash memory of a microcontroller (like the ESP32-S3) requires careful planning.
- **Sensor Fusion at the Edge**: By interfacing directly with an Adafruit BNO055 9-DOF IMU, the hardware architecture is designed to capture raw spatial data and process it exactly where it is generated.
- **Real-Time Determinism**: In rehabilitation, immediate feedback is necessary. Relying on cloud inference introduces network latency. Edge deployment ensures deterministic, real-time predictions.
- **Power & Connectivity Planning**: The system architecture strategically isolates heavy communication (WiFi) from constant inference, maximizing battery life. The WiFi dashboard is only toggled when data retrieval is required.

## Core Features
- **Real-Time Exercise Classification**: Predicts continuous exercises locally on-device, including `Walking`, `Sit-to-Stand`, and `Supine-to-Sit`.
- **Gait Metrics Calculation**: Evaluates `Cadence`, `Lateral Sway`, and `Step Length` using custom algorithms built on top of raw IMU data.
- **Data Logging**: Automatically logs classified exercises and gait metrics to an SD card for persistence.
- **On-Demand WiFi Dashboard**: Toggleable WiFi Access Point mode (`ESP32-Rehab-Device`) to download and clear logs without interrupting the core inference loop.
- **Haptic Feedback**: Uses a vibration motor to alert the user of specific posture changes or errors.

## Hardware & Deployment Architecture
- **Processing Unit**: ESP32-S3 Microcontroller (Dual-core Xtensa LX7, optimized for AI instructions)
- **Sensor**: Adafruit BNO055 9-DOF IMU (I2C interface)
- **Storage**: SD Card Module (SPI interface) for local log retention
- **Indicators**: Status and WiFi LEDs
- **Actuator**: Vibration Motor for physical feedback
- **Switch**: Hardware toggle to strictly separate WiFi mode from inference mode, optimizing CPU cycles.

## Project Structure
- `Rehabelt_Firmware/`: Contains the optimized Arduino firmware and the deployed model header.
  - `Rehabelt_Firmware/Rehabelt_Firmware.ino`: Main ESP32-S3 source code handling inference, hardware IO, and data logging.
  - `Rehabelt_Firmware/model_data.h`: The quantized TensorFlow Lite Micro model array, baked directly into flash memory.
  - `Rehabelt_Deploy.ipynb`: Jupyter notebook demonstrating the model training pipeline and export to C header format.
- `Rehabelt System_Integration Manual.pdf`: Detailed documentation for system hardware integration.
- `ui-showcase/`: A React-based dummy UI showcasing how the model's telemetry and metrics could look in a production web application.

## Getting Started

### Prerequisites
- [Arduino IDE](https://www.arduino.cc/en/software)
- Required Arduino Libraries:
  - `Adafruit_BNO055`
  - `Adafruit_Sensor`
  - `EloquentTinyML` (for running the TF Lite Micro model)
  - ESP32 standard libraries (`WiFi`, `FS`, `SD`, `SPI`)

### Installation & Deployment
1. Clone this repository to your local machine.
2. Open `Rehabelt_Firmware/Rehabelt_Firmware/Rehabelt_Firmware.ino` in your Arduino IDE.
3. Select your ESP32-S3 board in the Arduino IDE board manager.
4. Compile and upload the sketch to the ESP32. Ensure you have the correct partition scheme selected to accommodate the model size.

### Usage
- **Inference Mode (Normal)**: The device calibrates the IMU upon startup (indicated by a blinking status LED). Once calibrated (solid LED), it continuously monitors motion. If significant motion is detected, it predicts the activity using the embedded ML model and logs it locally.
- **Dashboard Mode (WiFi)**: Flip the hardware switch to activate the WiFi Access Point. Connect to the `ESP32-Rehab-Device` network (Password: `rehab1234`) and access the dashboard to download or clear your data logs.
