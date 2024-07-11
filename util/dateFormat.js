const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = d => {
  if (Object.prototype.toString.call(d) !== '[object Date]' || isNaN(d)) {
    return '잘못된 날짜 입니다.';
  }

  const month = months[d.getMonth()];
  const date = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${month} ${date}, ${hours} : ${minutes}`;
};
