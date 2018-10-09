import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BffChatComponent } from './bff-chat.component';

describe('BffChatComponent', () => {
  let component: BffChatComponent;
  let fixture: ComponentFixture<BffChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BffChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BffChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
