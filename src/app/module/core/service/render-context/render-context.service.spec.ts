import { TestBed } from '@angular/core/testing';

import { RenderContextService } from './render-context.service';

describe('RenderContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenderContextService = TestBed.get(RenderContextService);
    expect(service).toBeTruthy();
  });
});
