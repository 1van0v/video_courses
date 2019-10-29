import { Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy } from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  public title = 'video-courses-app';

  public ngOnChanges() {
    console.log('ngOnChanges - Angular (re)sets data-bound input properties');
  }

  public ngOnInit() {
    console.log('ngOnInit - Angular initializes the directive/component');
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
  }

}
