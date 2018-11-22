import { TestBed } from '@angular/core/testing';

import { ItemCommentService } from './item-comment.service';

describe('ItemCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCommentService = TestBed.get(ItemCommentService);
    expect(service).toBeTruthy();
  });
});
