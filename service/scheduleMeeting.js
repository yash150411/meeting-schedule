const { bookSlotsWithinTime }  = require("../helpers/bookSlotWithinTime") ;
const { filterAvailableSlots } = require("../helpers/filterAvailableSlots")
const { generateAllSlots } = require("../helpers/generateAllSlots");
const { isOverlapping: isOverlappingFunc } = require("../helpers/isOverlapping");

const Meetings = require("../models/meetings");

const scheduleMeeting = (title, startTime, endTime) => {
  return new Promise(async(resolve,reject) => {
    try{
      const start = new Date(startTime);
      const end = new Date(endTime);

      const bookedSlots = await Meetings.find();
      const isOverlapping = isOverlappingFunc(bookedSlots, start, end)
      
      if (isOverlapping) {
        reject({ error: 'The requested time slot overlaps with an existing meeting.' })
      }else {
        const allSlots = generateAllSlots();
        // get all available slots 
        const availableSlots = filterAvailableSlots(allSlots, bookedSlots);        
        // Check if slots is within the booking frame
        const isAvailable = bookSlotsWithinTime(availableSlots, start, end);
      
        if(!isAvailable){
          reject({ message: 'Meeting not available within slots'})
        }
        
        const meeting = new Meetings({
          title,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        });

        await meeting.save();
        resolve({message: 'Meeting scheduled successfully.'})
      }    
    }catch(e){
      reject(e)
    }
  })
}

module.exports= {scheduleMeeting}