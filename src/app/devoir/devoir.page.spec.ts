import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevoirPage } from './devoir.page';

describe('DevoirPage', () => {
  let component: DevoirPage;
  let fixture: ComponentFixture<DevoirPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DevoirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
