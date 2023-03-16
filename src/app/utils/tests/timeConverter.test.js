import {
  getDateWithSlash,
  getDateWithMonthName,
  getTime,
  getUpdatedDateByDate,
  getUpdatedDateByMonth,
  getDateTS,
} from '../timeConverter';

describe('TimeConverter Utils', () => {
  it('should return a date in format DD/MM/YYYY when passing in a Date obj on calling f(getDateWithSlash)', () => {
    const date = new Date(2019, 6, 19);
    expect(getDateWithSlash(date)).toEqual('19/07/2019');
    expect(getDateWithSlash()).toEqual('N/A');
  });

  it('should return a date in format DD MMM, YYYY when passing in a Date obj on calling f(getDateWithMonthName)', () => {
    const date = new Date(2019, 6, 19);
    expect(getDateWithMonthName(date)).toEqual('19 July, 2019');
    expect(getDateWithMonthName()).toEqual('N/A');
  });

  it('should return time in HH:MM format when passing in a Date obj on calling f(getTime)', () => {
    const date = new Date(2019, 6, 19, 4, 20);
    expect(getTime(date)).toEqual('04:20');
    expect(getTime()).toEqual('N/A');
  });

  it('should return new Date object with +- DAYS when passing in a Date obj on calling f(getUpdatedDateByDate)', () => {
    let date = new Date(2019, 6, 19);
    expect(getUpdatedDateByDate(date, false, 0)).toEqual(date.getTime());
    expect(getUpdatedDateByDate(date, true, 0)).toEqual(date.getTime());
    expect(getUpdatedDateByDate(date, true, 10)).toEqual(
      new Date(2019, 6, 9).getTime(),
    );

    date = new Date(2019, 6, 19);
    expect(getUpdatedDateByDate(date, false, 10)).toEqual(
      new Date(2019, 6, 29).getTime(),
    );
  });

  it('should return new Date object with +- MONTHS when passing in a Date obj on calling f(getUpdatedDateByMonth)', () => {
    let date = new Date(2019, 6, 19);
    expect(getUpdatedDateByMonth(date, false, 0)).toEqual(date.getTime());
    expect(getUpdatedDateByMonth(date, true, 0)).toEqual(date.getTime());
    expect(getUpdatedDateByMonth(date, true, 3)).toEqual(
      new Date(2019, 3, 19).getTime(),
    );

    date = new Date(2019, 6, 19);
    expect(getUpdatedDateByMonth(date, false, 3)).toEqual(
      new Date(2019, 9, 19).getTime(),
    );
  });

  it('should return date in UTC format, in milliseconds', () => {
    const date = new Date(2019, 6, 19);
    expect(getDateTS(date)).toEqual(1563474600000);
  });
});
