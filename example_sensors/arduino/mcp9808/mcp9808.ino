// Sample Arduino Sketch to send periodic updates
// from a MCP9808 temperature sensor
#include <Wire.h>
#include "Adafruit_MCP9808.h"

// Create the MCP9808 temperature sensor object
Adafruit_MCP9808 tempsensor = Adafruit_MCP9808();

void setup() {
  Serial.begin(115200);
  // Check if we're connected
  if (!tempsensor.begin()) {
    Serial.println("Couldn't find MCP9808!");
    while (1);
  }
  Serial.println("Connected");
}

// For power consumption reasons we only poll for temperature
// once every 10 seconds. This can be raised for more real-time
// applications.
void loop() {
  tempsensor.shutdown_wake(0);
  // Print temperature to serial
  Serial.println(tempsensor.readTempC());
  delay(250); // Needed to actually measure temperature before shutdown
  tempsensor.shutdown_wake(1);
  delay(500);
}
