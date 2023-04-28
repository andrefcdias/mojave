import clock from "clock";
import { battery } from "power";
import * as document from "document";

// Tick every minute
clock.granularity = "minutes";

let hourHand = document.getElementById("hours");
let minutesHand = document.getElementById("minutes");
let moon = document.getElementById("moon");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

function batteryLevelToScale(batteryLevel) {
  return (batteryLevel / 100);
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minutesHand.groupTransform.rotate.angle = minutesToAngle(mins);
  
  const batteryScaled = batteryLevelToScale(battery.chargeLevel);
  moon.groupTransform.scale.x = batteryScaled;
  moon.groupTransform.scale.y = batteryScaled;
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);