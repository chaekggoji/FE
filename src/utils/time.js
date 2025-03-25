export const getRecentActivity = (timestamptz) => {
  const diff = new Date() - new Date(timestamptz);

  const sec = diff / 1000;
  const min = sec / 60;
  const hours = min / 60;
  const days = hours / 24;

  if (min < 0) {
    return '방금 전';
  } else if (min < 60) {
    return `${Math.round(min)}분 전`;
  } else if (hours < 24) {
    return `${Math.round(hours)}시간 전`;
  } else if (days < 2) {
    return '하루 전';
  } else {
    return new Date(timestamptz).toLocaleDateString();
  }
};
