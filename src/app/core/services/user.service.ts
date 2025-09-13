import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private fixJson(rawJson: string): string {
    // Regex para adicionar vírgula entre pares de chave-valor consecutivos sem vírgula
    return rawJson.replace(/"(\w+)":\s*("[^"]*"|\d+|true|false|null)\s+"(\w+)":/g, '"$1": $2, "$3":');
  }

  getUsers(): Observable<User[]> {
    return this.http.get('assets/data/db.json', { responseType: 'text' })
      .pipe(
        map(rawJson => this.fixJson(rawJson)),
        map(fixedJson => {
          return JSON.parse(fixedJson).users as User[];
        })
      );
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.getUsers()
      .pipe(map((users: User[]) => users.find(user => user.id === id)));
  }
}