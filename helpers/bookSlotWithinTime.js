const bookSlotsWithinTime = (slots, start, end) => {
  const selectedStartTime = new Date(start);
  const selectedEndTime = new Date(end);

  // Check if the selected start and end times are within the available slots
  const isValidSlot = slots.some(slot => {
    const slotStartTime = new Date(slot.startTime);
    const slotEndTime = new Date(slot.endTime);
    return (
      (selectedStartTime >= slotStartTime && selectedStartTime < slotEndTime) ||
      (selectedEndTime > slotStartTime && selectedEndTime <= slotEndTime) ||
      (selectedStartTime < slotStartTime && selectedEndTime > slotEndTime)
    );
  });

  // If the selected slot is valid, return true and perform the booking logic
  if (isValidSlot) {
    // Perform the booking logic here
    // e.g., update the slots array, store the booking details, etc.
    return true;
  }

  // If the selected slot is not valid, return false or handle the error accordingly
  return false;
}

module.exports = {bookSlotsWithinTime}