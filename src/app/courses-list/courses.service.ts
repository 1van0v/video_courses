import { Injectable } from '@angular/core';
import { CoursesListResponse } from './courses-list-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public constructor(private http: HttpClient) { }
  public getCourses(): Observable<CoursesListResponse> {
    return this.http.get<CoursesListResponse>('assets/courses.json');
  }
}
