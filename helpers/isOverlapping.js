function isOverlapping (bookedSlots, startTime, endTime) {
  return bookedSlots.some(
    (meeting) =>
      (startTime >= new Date(meeting.startTime) && startTime < new Date(meeting.endTime)) ||
      (endTime > new Date(meeting.startTime) && endTime <= new Date(meeting.endTime)) ||
      (startTime <= new Date(meeting.startTime) && endTime >= new Date(meeting.endTime))
  );
}


module.exports = {isOverlapping}