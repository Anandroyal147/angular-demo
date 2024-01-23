import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';

describe('HomeComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
