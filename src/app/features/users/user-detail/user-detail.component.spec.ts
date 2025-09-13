import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, MatDialogModule, MatButtonModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            name: 'Vitor',
            email: 'vitor@example.com',
            age: 25,
            plan: {
              type: 'Premium',
              status: 'Active',
              description: 'Plano completo',
              features: {
                conferenceCalling: true,
                callWaiting: false,
                voicemail: true
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
