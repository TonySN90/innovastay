function formatDate(date) {
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

export default formatDate;
