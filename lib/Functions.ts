export const formatTimestamp = (timestamp: number): string => {
    const inputDate = new Date(timestamp);
    const currentDate = new Date();
  
    // Check if the input date is today
    const isToday =
      inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() === currentDate.getDate();
  
    if (isToday) return 'Today';
  
    // Create yesterday date
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
  
    // Check if the input date is yesterday
    const isYesterday =
      inputDate.getFullYear() === yesterdayDate.getFullYear() &&
      inputDate.getMonth() === yesterdayDate.getMonth() &&
      inputDate.getDate() === yesterdayDate.getDate();
  
    if (isYesterday) return 'Yesterday';
  
    // Format date as MM/DD/YY
    const month = inputDate.getMonth() + 1; // Months are 0-indexed
    const day = inputDate.getDate();
    const year = inputDate.getFullYear() % 100; // Get last two digits of year
  
    return `${month}/${day}/${year}`;
  };