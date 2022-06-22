import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() id: number = 0;
  posts: Post[] = [];
  result: Post[] = [];
  page: Post[] = [];
  _searchTerm: string = "";
  _current: number = 1;
  size: number = 5;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  detail(post: Post): void {
    this.router.navigateByUrl(`/user/${this.id}/post/${post.id}`).then(r => r.valueOf());
  }

  private getPosts(): void {
    this.userService.getPosts(this.id).subscribe(posts => {
      this.posts = posts;
      this.bindResult();
    })
  }

  private bindResult(): void {
    this.result = this.posts.filter(posts => {
      if (posts.title.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      return posts.body.toLowerCase().includes(this._searchTerm.toLowerCase());
    });
    this._current = 1;
    this.bindPage();
  }

  private bindPage(): void {
    this.page = this.result.slice(
      ((this.current - 1) * this.size),
      (this.current * this.size)
    );
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
    this.bindResult();
  }

  get current(): number {
    return this._current;
  }

  set current(current: number) {
    this._current = current;
    this.bindPage();
  }

}
