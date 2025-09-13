import { Component, Input } from '@angular/core';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

// Model
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  @Input() users: User[] = [];
  
  displayedColumns: string[] = ['name', 'email', 'age', 'plan', 'status', 'features'];
}
