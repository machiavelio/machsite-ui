import { TestBed } from '@angular/core/testing';

import { ApiAccessInterceptor } from './api-access.interceptor';

describe('ApiAccessInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiAccessInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiAccessInterceptor = TestBed.inject(ApiAccessInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
