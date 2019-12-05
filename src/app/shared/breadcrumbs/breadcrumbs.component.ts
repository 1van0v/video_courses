import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
  public breadcrumbs = [];

  public constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
    .pipe(filter(event => event instanceof ActivationEnd))
    .subscribe((event: ActivationEnd) => {
      const { breadcrumb } = event.snapshot.root.firstChild.data;
      this.breadcrumbs.push({ ...breadcrumb });
    });
  }

  public followBreadcrumb(link: string): void {
    if (link) {
      this.router.navigate([ link ]);
    }
  }

}
