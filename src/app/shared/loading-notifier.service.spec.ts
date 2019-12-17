import { TestBed } from '@angular/core/testing';

import { LoadingNotifierService } from './loading-notifier.service';

describe('LoadingNotifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingNotifierService = TestBed.get(LoadingNotifierService);
    expect(service).toBeTruthy();
  });
});
