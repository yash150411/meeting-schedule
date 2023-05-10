const { rescheduleMeeting } = require("./rescheduleMeeting")

const bulkUpdate = (meetingsToBeUpdated) => {
  return new Promise(async(resolve,reject) => {
    try {
      for(meeting of meetingsToBeUpdated) {
        const {meetingId, startTime, endTime} = meeting
        await rescheduleMeeting(meetingId, startTime, endTime)
      }
      resolve('All Meetings have been updated')
    }catch (e) {
      reject(e)
    }
  })
}

module.exports = {bulkUpdate}