export function formatDateTime(timestamp) {
  const formattedDate = new Date(timestamp).toLocaleDateString("in-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate.replace("pukul ", "").replace(".", ":");
}
