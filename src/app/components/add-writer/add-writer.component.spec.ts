import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWriterComponent } from './add-writer.component';

describe('AddWriterComponent', () => {
  let component: AddWriterComponent;
  let fixture: ComponentFixture<AddWriterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWriterComponent]
    });
    fixture = TestBed.createComponent(AddWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
