import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisciplinePage } from './discipline.page';

describe('DisciplinePage', () => {
  let component: DisciplinePage;
  let fixture: ComponentFixture<DisciplinePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DisciplinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
