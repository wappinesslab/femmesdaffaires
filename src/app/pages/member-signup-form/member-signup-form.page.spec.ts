import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberSignupFormPage } from './member-signup-form.page';

describe('MemberSignupFormPage', () => {
  let component: MemberSignupFormPage;
  let fixture: ComponentFixture<MemberSignupFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSignupFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberSignupFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
