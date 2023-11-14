import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfacturasComponent } from './formfacturas.component';

describe('FormfacturasComponent', () => {
  let component: FormfacturasComponent;
  let fixture: ComponentFixture<FormfacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormfacturasComponent]
    });
    fixture = TestBed.createComponent(FormfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
