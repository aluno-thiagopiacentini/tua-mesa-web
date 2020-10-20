import { TestBed } from '@angular/core/testing';

import { QueuesResolverGuard } from './queues-resolver.guard';

describe('QueuesResolverGuard', () => {
  let guard: QueuesResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QueuesResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
