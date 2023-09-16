export class DateUtils {
  static monthTotalDayCount(year: string | number, month: string | number) {
    const numberYear = Number(year);
    const numberMonth = Number(month);

    return new Date(numberYear, numberMonth, 0).getDate();
  }
}
