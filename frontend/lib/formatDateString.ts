export function formatDateString(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const diff = today.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);

  if(seconds < 20){
    return "now";
  }

  if(seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if(minutes < 60) {
    return `${minutes}min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if(hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24)

  return `${days}d ago`;
}