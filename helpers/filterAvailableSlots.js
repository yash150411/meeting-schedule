function filterAvailableSlots (allSlots, bookedSlots) {
  const bookedIntervals = bookedSlots.map(slot => {
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);
    return { startTime, endTime };
  });

  const availableSlots = allSlots.filter(slot => {
    const slotStartTime = new Date(slot.startTime);
    const slotEndTime = new Date(slot.endTime);

    for (const bookedInterval of bookedIntervals) {
      const { startTime, endTime } = bookedInterval;
      if (
        (slotStartTime >= startTime && slotStartTime < endTime) ||
        (slotEndTime > startTime && slotEndTime <= endTime) ||
        (slotStartTime <= startTime && slotEndTime >= endTime)
      ) {
        return false;
      }
    }
    return true;
  });

  return availableSlots;
}

module.exports = {filterAvailableSlots}