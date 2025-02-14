export function formatTimestamp(timestamp: string): string {
  const inputDate = new Date(timestamp);
  const currentDate = new Date();

  // Check if the input date is today
  const isToday =
    inputDate.getFullYear() === currentDate.getFullYear() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getDate() === currentDate.getDate();

  if (isToday) {
    // Check if time is exactly midnight (00:00)
    const isMidnight =
      inputDate.getHours() === 0 &&
      inputDate.getMinutes() === 0 &&
      inputDate.getSeconds() === 0 &&
      inputDate.getMilliseconds() === 0;

    if (isMidnight) {
      return 'Today';
    }
    // Format time as HH:mm (24-hour format with leading zeros)
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Check if yesterday
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  const isYesterday =
    inputDate.getFullYear() === yesterdayDate.getFullYear() &&
    inputDate.getMonth() === yesterdayDate.getMonth() &&
    inputDate.getDate() === yesterdayDate.getDate();

  if (isYesterday) return 'Yesterday';

  // Format date as MM/DD/YY
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  const year = inputDate.getFullYear() % 100;

  return `${month}/${day}/${year}`;
};

export function saveToLocalStorage(name: string, value: string): void {
  localStorage.setItem(name, value);
}

export function deleteFromLocalStorage(name: string): void {
  localStorage.removeItem(name);
}

export function getFromLocalStorage(name: string): string | null {
  return localStorage.getItem(name);
}

export function GoBack() {
  if (typeof window !== "undefined" && window.history.length > 1) {
    window.history.back();
  }
};

export default function RandomTextColor() {
  const colors = [
    "red-500", "blue-500", "green-500",
    "yellow-500", "purple-500", "pink-500",
    "orange-500", "teal-500", "indigo-500"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}