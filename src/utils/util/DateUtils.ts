export class DateUtils {
  // output :  2023.07.08 (금)
  static getYearMonthDayDayOfWeek(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}.${month}.${day} (${dayOfWeek})`;
  }

  static getYearMonthToKorea(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}년 ${month}월`;
  }

  static getCurrentYearMonth(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return {
      year,
      month,
    };
  }
}
