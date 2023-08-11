import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function timeSince(time) {
  const createdAt = new Date(time);
  const now = new Date();
  const diff = now - createdAt;
  let timeSince = "";
  if (diff < 1000 * 60) {
    timeSince = "Just now";
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    timeSince = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    timeSince = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    timeSince = createdAt.toLocaleString();
  }
  return timeSince;
}
