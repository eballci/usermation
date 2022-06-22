import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Post} from "../model/post";
import {Comment} from "../model/comment";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private base: string = "https://jsonplaceholder.typicode.com/posts/";

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.base + id + "/comments").pipe(
      catchError(this.handleError<Comment[]>("getComments", []))
    )
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.router.navigateByUrl("/error").then(r => r.valueOf());
      return of(result as T);
    };
  }
}
