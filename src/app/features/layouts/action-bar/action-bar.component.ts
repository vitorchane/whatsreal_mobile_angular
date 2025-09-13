import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  @Output() viewChange: EventEmitter<'list' | 'cards'> = new EventEmitter<'list' | 'cards'>();
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  searchControl = new FormControl('');

  changeView(mode: 'list' | 'cards') {
    this.viewChange.emit(mode);
  }

  applyFilter(filter: string) {
    this.filterChange.emit(filter);
  }

  onSearchChange() {
    this.searchChange.emit(this.searchControl.value || '');
  }
}
