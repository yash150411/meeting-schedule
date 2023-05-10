const {filterAvailableSlots} = require("../helpers/filterAvailableSlots")
const {generateAllSlots} = require('../helpers/generateAllSlots');

const Meetings = require("../models/meetings");

function getAvailableSlots (date) {
  return new Promise(async(resolve,reject) => {
    try {
      const meetings = await Meetings.find();
      const bookedSlots = meetings.map((meeting) => ({
        startTime: new Date(meeting.startTime),
        endTime: new Date(meeting.endTime),
      }));
      const allSlots = generateAllSlots(date);
      const availableSlots = filterAvailableSlots(allSlots, bookedSlots);
      resolve(availableSlots);
    }catch(e) {
      reject(e)
    }
  })
}

module.exports = {getAvailableSlots} 