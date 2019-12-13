import { OrderByPipe } from './order-by.pipe';
import { CoursesListItem } from '../courses-list-item.class';

describe('OrderByPipe', () => {
  const orderCourses = (new OrderByPipe()).transform;
  const testData = [
    { date: '2016-05-31T02:02:36+00:00' },
    { date: '2016-05-31T02:02:37+00:00' },
    { date: '2016-05-31T02:02:38+00:00' },
    { date: '2016-05-31T02:02:39+00:00' }
  ].map((item) => ({ date: new Date(item.date)})) as CoursesListItem[];

  it('should sort items by date in ascending order', () => {
    const result = orderCourses(testData, 'asc');
    expect(result).toEqual(testData.sort((a, b) => a.date.valueOf() as number - (b.date.valueOf() as number)));
  });

  it('should sort items by date in descending order', () => {
    const result = orderCourses(testData, 'desc');
    expect(result).toEqual(testData.sort((a, b) => b.date.valueOf() as number - (a.date.valueOf() as number)));
  });

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });
});
