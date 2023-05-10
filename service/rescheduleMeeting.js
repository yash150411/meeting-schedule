const { bookSlotsWithinTime } = require("../helpers/bookSlotWithinTime");
const { filterAvailableSlots } = require("../helpers/filterAvailableSlots");
const { generateAllSlots } = require("../helpers/generateAllSlots");
const { isOverlapping: isOverlappingFunc } = require("../helpers/isOverlapping");
const Meetings = require("../models/meetings");

function rescheduleMeeting (meetingId, startTime, endTime) {
    return new Promise(async(resolve,reject) => {
      try{
        // First check if there is meeting id   
        const meeting = await Meetings.findById(meetingId);
        if (!meeting) {
          reject({ error: 'Meeting not found' });
        }
        
        // check for the overlapping 
        const bookedSlots = await Meetings.find();
        const isOverlapping = isOverlappingFunc(bookedSlots, startTime, endTime)
        
        if (isOverlapping) {
          reject({ error: 'The requested time slot overlaps with an existing meeting.' });
        }
        
        // check if its within the time frame 
        const allSlots = generateAllSlots();
        const availableSlots = filterAvailableSlots(allSlots, bookedSlots);
        const isAvailable = bookSlotsWithinTime(availableSlots, startTime, endTime);
        if(!isAvailable){
          reject({ message: 'Meeting not available within slots'})
        }

        // Passed all the checks save it 
        meeting.startTime = startTime;
        meeting.endTime = endTime;
        await meeting.save();
        resolve({ message: 'Meeting rescheduled successfully' });
        
      }catch(e) {
        console.log(e)
        reject(e)
      }
    })
}

module.exports = { rescheduleMeeting }