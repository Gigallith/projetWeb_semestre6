import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelPagingComponent } from './channel-paging.component';

describe('ChannelPagingComponent', () => {
  let component: ChannelPagingComponent;
  let fixture: ComponentFixture<ChannelPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
