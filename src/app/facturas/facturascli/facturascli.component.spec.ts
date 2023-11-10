import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturascliComponent } from './facturascli.component';

describe('FacturascliComponent', () => {
  let component: FacturascliComponent;
  let fixture: ComponentFixture<FacturascliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturascliComponent]
    });
    fixture = TestBed.createComponent(FacturascliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
