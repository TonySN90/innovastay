export function formatDate(date) {
  const daysOfWeek = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
  const months = [
    "Jan.",
    "Feb.",
    "März",
    "Apr.",
    "Mai",
    "Juni",
    "Juli",
    "Aug.",
    "Sept.",
    "Okt.",
    "Nov.",
    "Dez.",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth}.${
    months.indexOf(month) + 1 < 10
      ? "0" + (months.indexOf(month) + 1)
      : months.indexOf(month) + 1
  }.${year}`;
}

export function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } Uhr`;
}

export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const getYesterday = function (options = {}) {
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  if (options?.end) yesterday.setUTCHours(23, 59, 59, 999);
  else yesterday.setUTCHours(0, 0, 0, 0);

  return yesterday.toISOString();
};
