import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponentContainer } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponentContainer;
  let fixture: ComponentFixture<CategoryComponentContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponentContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryComponentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
