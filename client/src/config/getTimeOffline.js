const timeOffline = (onlineFrom) => {
  const parseTime = Date.now() - Date.parse(onlineFrom);
  const minutes = Math.round(parseTime / (1000 * 60));
  const hours = Math.round(parseTime / (1000 * 60 * 60));
  const days = Math.round(parseTime / (1000 * 60 * 60 * 24));
  const month = Math.round(parseTime / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(parseTime / (1000 * 60 * 60 * 24 * 365));
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days < 30) return `${days} ngày trước`;
  if (month < 12) return `${month} tháng trước`;
  return `${years} năm trước`;
};
export default timeOffline;
