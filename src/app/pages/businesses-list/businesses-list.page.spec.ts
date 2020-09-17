import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessesListPage } from './businesses-list.page';

describe('BusinessesListPage', () => {
  let component: BusinessesListPage;
  let fixture: ComponentFixture<BusinessesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
