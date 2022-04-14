import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  userFilter: any;
  private usersSub: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.userService.getUsers();
    this.usersSub = this.userService
      .getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
        this.userFilter = this.users.filter((users) => users.status === this.route.snapshot.params['id']);
        this.router.navigate(['/home/users']);
        console.log(this.userFilter)
      });
  }

  ngOnDestroy(): void {
    console.log('sai')
 
  }

}
