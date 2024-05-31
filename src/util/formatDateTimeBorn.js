export function formatDateTimeBorn(timestamp) {
  const formattedDate = new Date(timestamp).toLocaleDateString("in-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
}
