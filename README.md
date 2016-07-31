Sensor Watcher
==============

Node.js-based serial port sensor watcher.

Requirements
------------

1. Node.js (install package `nodejs` with your favorite package manager)
2. One or more serial port sensors.

Installation
------------

1. Clone project: `git clone <url>`
2. Install dependencies: `npm install`

Example Usage
-------------

Included is an example sensor program for an Arduino with a [MCP9808 temperature sensor](https://www.adafruit.com/products/1782). Ensure the sensor is connected, then start the app:

```
node app.js /dev/ttyUSB0
```