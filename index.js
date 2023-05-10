const express = require('express');
const dotenv = require("dotenv");
const Meetings = require('./models/meetings');
const { getAvailableSlots } = require('./service/getAvailableSlots');
const { scheduleMeeting } = require('./service/scheduleMeeting');
const { rescheduleMeeting } = require('./service/rescheduleMeeting');
const { cancelMeeting } = require('./service/cancelMeeting');
const { bulkUpdate } = require('./service/bulkUpdate');
const { createConnection } = require('./connection');
dotenv.config()

const app = express();


app.use(express.json())

// Connect to MongoDB
createConnection(app)
  

// API endpoints

app.get('/slots/:date', async (req,res) => {
  const {date} = req.params
  try{
    const slots = await getAvailableSlots(date)
    res.status(200).json(slots)
  }catch(e) {
    console.log(e)
    res.status(400).json(e)
  }
})

app.post('/schedule', async (req,res) => {
  const {title, startTime, endTime} = req.body
  try {
    const response = await scheduleMeeting(title, startTime, endTime)
    res.status(200).json(response)
  }catch (e) {
    console.log(e)
    res.status(400).json(e)
  }
})

app.put('/reschedule/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  const { startTime, endTime } = req.body;
  try {
    const resp = await rescheduleMeeting(meetingId, startTime, endTime)
    res.status(200).json(resp)
  } catch (e) {
    console.log(e)
    res.status(400).json(e);
  }
});

app.delete('/cancel/:meetingId', async (req,res) => {
  const { meetingId } = req.params;
  try{
    const resp = await cancelMeeting(meetingId)
    res.status(200).json(resp)
  }catch(e) {
    console.log(e)
    res.status(400).json(e)
  }
})

app.put('/bulk-update', async (req, res) => {
  const { meetingsToBeUpdated } = req.body;

  try {
    const meetings = await bulkUpdate(meetingsToBeUpdated)
    
    res.json({ message: 'Bulk update completed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/bulk-cancel', async (req, res) => {
  const {meetingIds} = req.body
  try { 
    await Meetings.deleteMany({ _id: { $in: meetingIds } });;  
    res.json({ message: 'All meetings canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred', err });
  }
});