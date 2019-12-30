export class ApiUrlHelper {
  private static baseUrl = 'http://localhost:3004/';

  public static loginUrl(): string {
    return this.baseUrl + 'auth/login';
  }

  public static userInfoUrl(): string {
    return this.baseUrl + 'auth/userinfo';
  }

  public static coursesUrl(id?: number): string {
    let url = this.baseUrl + 'courses';
    url += id ? '/' + id : '';
    return url;
  }

  public static getCoursesUrl(start: number, count: number): string {
    return this.coursesUrl() + '?start=' + start + '&count=' + count + '&sort=date';
  }

  public static searchCoursesUrl(searchStr: string): string {
    return this.coursesUrl() + '?sort=date&textFragment=' + searchStr;
  }
}
