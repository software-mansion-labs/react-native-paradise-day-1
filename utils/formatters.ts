export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace("at", "·");
}

export function formatShortDate(date: Date | null | undefined) {
  if (!date) return "Not available";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
