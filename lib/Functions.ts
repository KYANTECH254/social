export function formatTimestamp(timestamp: string) {
  if (typeof window === "undefined") {
    return "...";
  }
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

export function formatTimestampRelative(timestamp: any) {
  if (typeof window === "undefined") {
    return "...";
  }
  const inputDate = new Date(timestamp);
  const currentDate = new Date();

  // Convert input date to UTC for comparison
  const inputDateUTC = Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    inputDate.getUTCHours(),
    inputDate.getUTCMinutes(),
    inputDate.getUTCSeconds()
  );

  const currentDateUTC = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    currentDate.getUTCHours(),
    currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds()
  );

  const diffMs = currentDateUTC - inputDateUTC;

  // Handle future timestamps
  if (diffMs < 0) {
    return 'Just now';
  }

  // Calculate time differences
  const minutesAgo = Math.floor(diffMs / 60000);
  const hoursAgo = Math.floor(diffMs / 3600000);
  const daysAgo = Math.floor(diffMs / 86400000);

  // Less than 1 hour
  if (diffMs < 3600000) {
    const minutes = Math.max(1, minutesAgo);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // Less than 24 hours
  if (diffMs < 86400000) {
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  }

  // Check if yesterday (UTC)
  const yesterday = new Date(currentDateUTC);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const isYesterday =
    inputDate.getUTCFullYear() === yesterday.getUTCFullYear() &&
    inputDate.getUTCMonth() === yesterday.getUTCMonth() &&
    inputDate.getUTCDate() === yesterday.getUTCDate();

  if (isYesterday) {
    return 'Yesterday';
  }

  // Format date as MM/DD/YY (UTC)
  const month = inputDate.getUTCMonth() + 1;
  const day = inputDate.getUTCDate();
  const year = inputDate.getUTCFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
}

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

export function RandomTextColor() {
  const colors = [
    "red-500", "blue-500", "green-500",
    "yellow-500", "purple-500", "pink-500",
    "orange-500", "teal-500", "indigo-500"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}

export const truncateWords = (
  text: any,
  wordLimit: number = 5,
  charLimit: number = 20
): string => {
  const words = text.split(" ");

  const candidate = words.slice(0, wordLimit).join(" ");
  if (candidate.length > charLimit) {
    return candidate.slice(0, charLimit) + "…";
  } else if (words.length > wordLimit) {
    return candidate + "…";
  } else {
    return text;
  }
};

/**
 * Generates a random username in the format "user_<number>".
 * @returns a string containing the generated username
 */
export function randomUsername() {
  let randomnumber = Math.floor(Math.random() * 100000000) + 1;
  return `user_${randomnumber}`;
}

/**
 * Generates a 50x50 pixel avatar image with a random background color and
 * the first letter of the given username in the center.
 * @param username the username to generate the avatar for
 * @returns a data URL of the generated image
 */
export function generateRandomColorAvatar(username: string) {
  if (!username || typeof username !== 'string') return null;
  const colors = ['#dc2626', '#4f46e5', '#ca8a04', '#16a34a', '#2563eb'];
  const firstLetter = username.charAt(0).toUpperCase();
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
  return canvas.toDataURL('image/png');
}

/**
 * Returns the current time in the UTC time zone, formatted as an ISO string (e.g. "2024-03-06T14:30:00Z").
 */
export function userUTCTime() {
  const utcTime = new Date().toISOString();
  return utcTime;
}

/**
 * Given a UTC time string, returns a string representing the time in the user's local time zone.
 * @param utcTime a time string in the ISO format, e.g. "2024-03-06T14:30:00Z"
 */
export function userLocalTime(utcTime: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: userTimeZone
  }).format(new Date(utcTime));

  return localTime;
}

/**
 * Given a UTC time string, returns a string that describes how long ago the given time was, in a human-readable format
 * (e.g. "3s", "2m", "1h", "4d", "2w", "1y").
 * @param utcTime a time string in the ISO format, e.g. "2024-03-06T14:30:00Z"
 */
export function timeAgo(utcTime: string) {
  const now = new Date();
  const past = new Date(utcTime);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 52) return `${weeks}w`;
  const years = Math.floor(weeks / 52);

  return `${years}y`;
}
