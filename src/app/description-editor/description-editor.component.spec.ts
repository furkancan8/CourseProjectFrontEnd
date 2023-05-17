import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEditorComponent } from './description-editor.component';

describe('DescriptionEditorComponent', () => {
  let component: DescriptionEditorComponent;
  let fixture: ComponentFixture<DescriptionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
