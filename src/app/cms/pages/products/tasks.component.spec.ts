import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAdminComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: ProductsAdminComponent;
  let fixture: ComponentFixture<ProductsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
