import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAnnoucementCategoryComponent } from './add-annoucement-category.component';

describe('AddAnnoucementCategoryComponent', () => {
  let component: AddAnnoucementCategoryComponent;
  let fixture: ComponentFixture<AddAnnoucementCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnnoucementCategoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnnoucementCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
