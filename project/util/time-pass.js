/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
module.exports = (startTime) => {
  const currentTime = Date.parse(new Date());

  const time = currentTime - startTime;

  const day = parseInt(time / (1000 * 60 * 60 * 24), 10);

  const hour = parseInt(time / (1000 * 60 * 60), 10);

  const min = parseInt(time / (1000 * 60), 10);

  const month = parseInt(day / 30, 10);

  const year = parseInt(month / 12, 10);

  if (year) return `${year}年前`;

  if (month) return `${month}个月前`;

  if (day) return `${day}天前`;

  if (hour) return `${hour}小时前`;

  if (min) return `${min}分钟前`;

  return '刚刚';
};
