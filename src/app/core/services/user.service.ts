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
    let fixedJson = rawJson.replace(
      /"(\w+)":\s*("[^"]*"|\d+|true|false|null)\s+"(\w+)":/g,
      '"$1": $2, "$3":'
    );

    try {
      const parsed = JSON.parse(fixedJson);

      if (parsed.users && Array.isArray(parsed.users)) {
        const seenIds = new Set<string>();
        parsed.users = parsed.users.map((user: User) => {
          if (seenIds.has(user.id)) {
            const newId = crypto.randomUUID();
            seenIds.add(newId);
            return { ...user, id: newId };
          } else {
            seenIds.add(user.id);
            return user;
          }
        });
      }

      fixedJson = JSON.stringify(parsed);
    } catch (e) {
      console.warn('Invalid JSON, returning partially fixed string');
    }

    return fixedJson;
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