import { Component, signal } from '@angular/core';

// Components
import { UserListComponent } from '../../users/user-list/user-list.component';
import { UserDetailComponent } from '../../users/user-detail/user-detail.component';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ActionBarComponent,
    UserListComponent,
    UserDetailComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {  
  users: User[] = [];
  filteredUsers: User[] = [];
  viewMode = signal<'list' | 'cards'>('cards');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  onViewChange(mode: 'list' | 'cards') {
    this.viewMode.set(mode);
  }

  onFilterChange(filter: string) {
    switch (filter) {
      case 'nameAsc':
        this.filteredUsers = [...this.users].sort((a, b) => a.name.localeCompare(b.name));
        break;
      
      case 'nameDesc':
        this.filteredUsers = [...this.users].sort((a, b) => b.name.localeCompare(a.name));
        break;
      
      case 'ageAsc':
        this.filteredUsers = [...this.users].sort((a, b) => a.age - b.age);
        break;
      
      case 'ageDesc':
        this.filteredUsers = [...this.users].sort((a, b) => b.age - a.age);
        break;
      
      case 'plan':
        this.filteredUsers = [...this.users].sort((a, b) => a.plan.type.localeCompare(b.plan.type));
        break;
      
      default:
        this.filteredUsers = this.users;
        break;
    }
  }

  onSearchChange(search: string) {
    const term = search.toLowerCase();
    
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }
}
