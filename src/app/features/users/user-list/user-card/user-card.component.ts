import { Component, inject, Input } from '@angular/core';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


// Components
import { UserDetailComponent } from '../../user-detail/user-detail.component';

// Model
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(UserDetailComponent, {data: this.user});
  }
}
