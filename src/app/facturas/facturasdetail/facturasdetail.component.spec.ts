import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasdetailComponent } from './facturasdetail.component';

describe('FacturasdetailComponent', () => {
  let component: FacturasdetailComponent;
  let fixture: ComponentFixture<FacturasdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasdetailComponent]
    });
    fixture = TestBed.createComponent(FacturasdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
