import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { League } from 'src/app/leagues/league.model';
import { LeagueService } from 'src/app/leagues/leagues.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    public userService: UserService,
    public leagueService: LeagueService,
    public route: ActivatedRoute
  ) { }

  users: User[] = [];
  leagues: League[] = [];

  user: any;
  league: any;
  user1: any;
  private userId: string;

  isLoading = false;

  private usersSub: Subscription;
  private leaguesSub: Subscription;

  form: FormGroup;

  onSaveUser() {
    if (this.form.invalid) {
      return;
    }
    this.userService.updateUser(
      this.userId,
      this.form.value.nick,
      this.form.value.name,
      this.form.value.email,
      this.form.value.status,
      this.form.value.league
    );

    this.form.reset();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('id');
      this.user = this.userService.getUserById(this.userId);
      this.usersSub = this.userService
        .getUserUpdateListener()
        .subscribe((user) => {
          this.users = user;
          this.user1 = this.users;
          this.form.setValue({
            nick: this.user1[0].nick,
            name: this.user1[0].name,
            email: this.user1[0].email,
            status: this.user1[0].status,
            league: this.user1[0].league,
          });
        });

      this.form = new FormGroup({
        nick: new FormControl(null, { validators: [Validators.required] }),
        name: new FormControl(null, { validators: [Validators.required] }),
        email: new FormControl(null, { validators: [Validators.required] }),
        status: new FormControl(null, { validators: [Validators.required] }),
        league: new FormControl(null, { validators: [Validators.required] }),
      });

      this.leagueService.getLeagues();
      this.leaguesSub = this.leagueService
        .getLeagueUpdateListener()
        .subscribe((league) => {
          this.leagues = league;
        });
    });
  }

}
