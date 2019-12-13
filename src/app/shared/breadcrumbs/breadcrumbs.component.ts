import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs = [];

  public constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService
  ) {}

  public ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbsService.getStore();
  }

  public followBreadcrumb(link: string): void {
    if (link) {
      this.router.navigate([ link ]);
    }
  }

}
