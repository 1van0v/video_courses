import { Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy } from '@angular/core';

import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from './core/auth-service.service';
import { BreadcrumbsService } from './shared/breadcrumbs.service';
import { LoadingNotifierService } from './shared/loading-notifier.service';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public title = 'video-courses-app';
  public isAuthenticated: boolean;
  public isLoading = false;
  private authSubscription: Subscription;
  private loadingSubscription: Subscription;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private loadingNotifierService: LoadingNotifierService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        const { breadcrumb } = event.snapshot.data;
        this.breadcrumbsService.updateStore({ ...breadcrumb });
      });
  }

  public ngOnChanges() {
    console.log('ngOnChanges - Angular (re)sets data-bound input properties');
  }

  public ngOnInit() {
    console.log('ngOnInit - Angular initializes the directive/component');

    this.loadingNotifierService.getListener().subscribe(
      (loading: boolean): void => {
        setTimeout(() => this.isLoading = loading, 0);
      }
    );

    this.authSubscription = this.authService.authListener.subscribe((userInfo: object) => {
      this.isAuthenticated = Boolean(userInfo);
    });
  }

  public ngDoCheck() {
    console.log('ngDoCheck - is called during every change detection run, immediately after ngOnChanges() and ngOnInit()');
  }

  public ngAfterContentInit() {
    console.log(
      'ngAfterContentInit - respond after Angular projects external content into the component\'s view / the view that a directive is in.'
    );
  }

  public ngAfterContentChecked() {
    console.log('ngAfterContentChecked - respond after Angular checks the content projected into the directive/component.');
  }

  public ngAfterViewInit() {
    console.log(
      'ngAfterViewInit - respond after Angular initializes the component\'s views',
      'and child views / the view that a directive is in.'
      );
  }

  public ngAfterViewChecked() {
    console.log(
      'ngAfterViewChecked - respond after Angular checks the component\'s views',
      'and child views / the view that a directive is in'
      );
  }

  public ngOnDestroy() {
    console.log('ngOnDestroy - cleanup just before Angular destroys the directive/component');
    this.authSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
