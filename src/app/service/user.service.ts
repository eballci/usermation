import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private base: string = "https://jsonplaceholder.typicode.com/users/"
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private url(id: number): string {
    return `${this.base}${id}`
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url(id)).pipe(
      catchError(this.handleError<User>("getUser"))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.base).pipe(
      catchError(this.handleError<User[]>("getUsers", []))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.url(user.id), user, this.httpOptions).pipe(
      catchError(this.handleError<any>("updateHero"))
    )
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.url(id), this.httpOptions).pipe(
      catchError(this.handleError<User>("deleteHero"))
    )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.router.navigateByUrl("/error").then(r => r.valueOf());
      return of(result as T);
    };
  }
}
