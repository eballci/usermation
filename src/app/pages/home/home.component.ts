import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [DecimalPipe]
})

export class HomeComponent implements OnInit {
  users: User[] = [];
  result: User[] = [];
  page: User[] = [];
  _searchTerm: string = "";
  _current: number = 1;
  size: number = 5;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  private bindResult(): void {
    this.result = this.users.filter(user => {
      if (user.name.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      if (user.username.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      if (user.email.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      if (user.address.city.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      if (user.phone.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      if (user.website.toLowerCase().includes(this._searchTerm.toLowerCase())) return true;
      return user.company.name.toLowerCase().includes(this._searchTerm.toLowerCase());
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

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.bindResult();
    });
  }

  delete(user: User): void {
    if (confirm("Are you sure? This is not recoverable.")) {
      this.userService.deleteUser(user.id).subscribe(user => {
        this.bindResult();
      });
    }
  }

  detail(user: User): void {
    this.router.navigateByUrl(`/user/${user.id}`).then(r => r.valueOf());
  }

  update(user: User): void {
    this.router.navigateByUrl(`/user/update/${user.id}`).then(r => r.valueOf());
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
