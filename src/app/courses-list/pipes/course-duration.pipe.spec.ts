import { CourseDurationPipe } from './course-duration.pipe';

describe('CourseDurationPipe', () => {

  const courseDurationPipe = new CourseDurationPipe();

  it('should create an instance', () => {
    expect(courseDurationPipe).toBeTruthy();
  });

  it('should transforms "100" to "1h 40m"', () => {
    expect(courseDurationPipe.transform(100)).toEqual('1h 40m');
  });

  it('should transforms "0" to "0h 0m"', () => {
    expect(courseDurationPipe.transform(0)).toEqual('0h 0m');
  });
});
