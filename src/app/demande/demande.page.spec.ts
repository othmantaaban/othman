import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandePage } from './demande.page';

describe('DemandePage', () => {
  let component: DemandePage;
  let fixture: ComponentFixture<DemandePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DemandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
