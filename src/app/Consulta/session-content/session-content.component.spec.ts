import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionContentComponent } from './session-content.component';

describe('SessionContentComponent', () => {
  let component: SessionContentComponent;
  let fixture: ComponentFixture<SessionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionContentComponent]
    });
    fixture = TestBed.createComponent(SessionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
