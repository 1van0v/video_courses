import { Injectable } from '@angular/core';

import { IBreadcrumb } from './breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  private store: IBreadcrumb[] = [
    {
      title: 'courses',
      link: 'courses'
    }
  ];

  public updateStore(breadcrumb: IBreadcrumb): void {
    if (breadcrumb.title === 'courses') {
      this.store.length = 1;
    } else {
      this.store.push(breadcrumb);
    }
  }

  public getStore(): IBreadcrumb[] {
    return this.store;
  }

  public updateTitle(breadcrumb: string, title: string): void {
    this.store.find(item => item.title === breadcrumb).title = title;
  }
}
