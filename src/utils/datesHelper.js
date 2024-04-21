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

  if (options?.end) today.setHours(23, 59, 59, 999);
  else today.setHours(0, 0, 0, 0);
  return today.toISOString();
};

export const getPastDay = function (pastDays) {
  const PastDay = new Date();

  PastDay.setDate(PastDay.getDate() - pastDays);
  PastDay.setUTCHours(0, 0, 0, 0);

  return PastDay.toISOString();
};
