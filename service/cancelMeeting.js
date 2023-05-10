// Cancel meeting if the meeting has not started
const Meetings = require("../models/meetings");

const cancelMeeting = (meetingId) => {
  return new Promise(async(resolve,reject) => { 
    try {    
      const meeting = await Meetings.findById(meetingId);
      
      if (!meeting) {
        reject({ error: 'Meeting not found' });
      }
      
      const now = new Date();
      if (now < meeting.startTime) {
        await Meetings.deleteOne({ _id: meetingId });
        resolve({ message: 'Meeting cancelled successfully' });
      } else {
        reject({ error: 'Meeting has already started' });
      }
    }catch (e) {
      reject(e)
    }
  }) 
}

module.exports = { cancelMeeting }