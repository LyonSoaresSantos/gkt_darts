import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,) { }

  users: User[] = [];
  usersStatus: User[] = [];
  leagueFilter: any;
  private usersSub: Subscription;
  private usersStatusSub: Subscription;
  gamesFilter: any;
  a = [];
  isLoading = false;

  active: any;
  desactive: any;
  pending: any;

  filterByActive() {
    this.active = this.users.filter((users) => users.status === 1);
  }

  filterByPending() {
    this.pending = this.users.filter((users) => users.status === 3);
  }

  filterByDesactive() {
    this.desactive = this.users.filter((users) => users.status === 2);
  }

  filterAllUsersTable() {
    this.userService.getUsersStatus();
  }

  filterByActivetoTable() {
    this.userService.getUsersbyStatus(1);
  }

  filterByPendingtoTable() {
    this.userService.getUsersbyStatus(3);

  }

  filterByDesactivetoTable() {
    this.userService.getUsersbyStatus(2);

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUsers();
    this.usersSub = this.userService
      .getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
        this.filterByActive();
        this.filterByDesactive();
        this.filterByPending();
      });
      this.userService.getUsersStatus();
      this.usersStatusSub = this.userService.getUserStatusUpdateListener().subscribe((usersStatus: User[]) => {
        this.usersStatus = usersStatus;
        this.isLoading = false;
      })
  }

}
