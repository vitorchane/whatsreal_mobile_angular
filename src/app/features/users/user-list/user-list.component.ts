import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';

import { UserTableComponent } from './user-table/user-table.component';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserTableComponent,
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input() viewMode: 'list' | 'cards' = 'cards';
  @Input() users: User[] = [];
}