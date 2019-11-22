import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { CoursesListResponse } from './courses-list-response.model';

describe('CoursesService', () => {
  let httpClient: any;
  let httpTestingController: HttpTestingController;
  let service: CoursesService;
  const testData: CoursesListResponse = {
    courses: [
      {
        id: 1,
        title: 'test title',
        creationDate: 1572870106633,
        duration: 100,
        description: 'test description',
        topRated: false
      }
    ]
  };

  describe('fetching courses', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
      });
      httpTestingController = TestBed.get(HttpTestingController);
      httpClient = TestBed.get(HttpClient);
      service = TestBed.get(CoursesService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return CoursesList', () => {
      service.getCourses().subscribe(data => {
        expect(data).toEqual(testData.courses);
      });

      const req = httpTestingController.expectOne('assets/courses.json');

      expect(req.request.method).toEqual('GET');

      req.flush(testData);

      httpTestingController.verify();
    });
  });

  describe('delete, update, getCourse methods', () => {
    const testCourses = testData.courses;
    beforeEach(() => {
      httpClient = jasmine.createSpyObj('HttpClient', ['get']);
      httpClient.get.and.returnValue(of(testData));
      service = new CoursesService(httpClient);
      service.getCourses();
    });

    it('should return item with id === 1', () => {
      service.getCourse(1)
        .subscribe(data => {
          expect(data).toEqual(testCourses[0]);
        });
    });

    it('should return undefined for non-existent id', () => {
      service.getCourse(3).subscribe(data => {
        expect(data).toBeUndefined();
      });
    });

    it('should update "description" field', () => {
      const newValue = 'newValue';
      const key = 'description';
      const id = 1;
      service.updateCourse(id, key, newValue)
        .subscribe(course => {
          expect(course[key]).toEqual(newValue);
        });
    });

    it('should ignore attempt to update "id" field', () => {
      const newValue = 'newValue';
      const key = 'id';
      const id = 1;
      service.updateCourse(id, key, newValue)
        .subscribe(course => {
          expect(course[key]).toEqual(id);
        });
    });

    it('should return undefined for non-existent course update', () => {
      const newValue = 'newValue';
      const key = 'id';
      const id = 2;
      service.updateCourse(id, key, newValue)
        .subscribe(course => {
          expect(course).toBeUndefined();
        });
    });

    it('should delete course with id: 1', fakeAsync(() => {
        const id = 1;
        let updatedCourses;
        service.getCourses().subscribe(() => {});
        tick();
        service.deleteCourse(id);
        service.getCourses().subscribe(courses => updatedCourses = courses);
        tick();
        expect(updatedCourses).toEqual([]);
      })
    );

    it('should return full list for attempt to delete non-existent course', fakeAsync(() => {
      const id = 2;
      let updatedCourses;
      service.getCourses().subscribe(() => {});
      tick();
      service.deleteCourse(id);
      service.getCourses().subscribe(courses => updatedCourses = courses);
      tick();
      expect(updatedCourses).toEqual(testCourses);
    }));
  });
});
