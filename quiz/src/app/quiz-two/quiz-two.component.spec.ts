import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTwoComponent } from './quiz-two.component';

describe('QuizTwoComponent', () => {
  let component: QuizTwoComponent;
  let fixture: ComponentFixture<QuizTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
