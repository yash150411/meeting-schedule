const mongoose = require('mongoose')

const MeetingsSchema = new mongoose.Schema ({
  title: String,
  startTime: Date,
  endTime: Date,
});


const Meetings = mongoose.model('meetings', MeetingsSchema);

module.exports = Meetings