import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersForm } from './users-form';

describe('UsersForm', () => {
  let component: UsersForm;
  let fixture: ComponentFixture<UsersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
