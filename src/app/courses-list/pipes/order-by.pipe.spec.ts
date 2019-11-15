import { OrderByPipe } from './order-by.pipe';
import { CoursesListItem } from '../courses-list-item.class';

describe('OrderByPipe', () => {
  const orderCourses = (new OrderByPipe()).transform;
  const testData = [
    { creationDate: 1 },
    { creationDate: 2 },
    { creationDate: 3 },
    { creationDate: 5 }
  ] as CoursesListItem[];

  it('should sort items by creationDate in ascending order', () => {
    const result = orderCourses(testData, 'asc');
    expect(result).toEqual(testData.sort((a, b) => a.creationDate - b.creationDate));
  });

  it('should sort items by creationDate in descending order', () => {
    const result = orderCourses(testData, 'desc');
    expect(result).toEqual(testData.sort((a, b) => b.creationDate - a.creationDate));
  });

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });
});
