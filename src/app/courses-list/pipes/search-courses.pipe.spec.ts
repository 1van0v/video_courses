import { SearchCoursesPipe } from './search-courses.pipe';
import { CoursesListItem } from '../courses-list-item.class';

describe('SearchPipePipe', () => {
  const search = (new SearchCoursesPipe()).transform;
  const testData = [
    { title: 'Title 1' },
    { title: 'Title 2' },
    { title: 'Title 3' },
    { title: 'Label 1' }
  ] as CoursesListItem[];

  it('should return one item', () => {
    const result = search(testData, 'title 1');
    expect(result[0].title).toEqual(testData[0].title);
  });

  it('should return all matches', () => {
    const result = search(testData, 'title');
    expect(result.length).toEqual(3);
  });

  it('should return all items if the search string is empty', () => {
    const result = search(testData, '');
    expect(result).toEqual(testData );
  });
});
