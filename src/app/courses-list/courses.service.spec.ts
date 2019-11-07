import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { CoursesListResponse } from './courses-list-response.model';

describe('CoursesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CoursesService;
  const testData: CoursesListResponse = {
    courses: [
      {
        id: 1,
        title: 'test title',
        creationDate: 1572870106633,
        duration: 100,
        description: 'test description'
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return CoursesListResponse', () => {
    service.getCourses().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('assets/courses.json');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });
});
