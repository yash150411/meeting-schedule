// Helper function to add minutes to a date object
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function generateAllSlots(date) {
  // const startTime = new Date(`${date}T09:00:00.000Z`);
  // const endTime = new Date(`${date}T18:00:00.000Z`);
  const startTime = new Date('2023-11-05T09:00:00.000Z');
  const endTime = new Date('2023-11-05T18:00:00.000Z');
  const slotDuration = 30; // Slot duration in minutes

  const slots = [];
  let currentSlot = new Date(startTime);

  while (currentSlot < endTime) {
    const slot = {
      startTime: currentSlot.toISOString(),
      endTime: addMinutes(currentSlot, slotDuration).toISOString(),
    };
    slots.push(slot);
    currentSlot = addMinutes(currentSlot, slotDuration);
  }
  console.log(slots)
  return slots
  
}

module.exports = {generateAllSlots}