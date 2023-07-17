import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RessourcePage } from './ressource.page';

describe('RessourcePage', () => {
  let component: RessourcePage;
  let fixture: ComponentFixture<RessourcePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RessourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
