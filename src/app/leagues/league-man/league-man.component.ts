import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { League } from '../league.model';
import { LeagueService } from '../leagues.service';

@Component({
  selector: 'app-league-man',
  templateUrl: './league-man.component.html',
  styleUrls: ['./league-man.component.css']
})
export class LeagueManComponent implements OnInit, OnDestroy {

  constructor(
    private leagueService: LeagueService,
    private authService: AuthService
  ) { }

  leagues: League[] = [];
  leagues1: any;
  teste: any;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private leaguesSub: Subscription;
  private authListenerSubs: Subscription;

  notReady() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Not ready yet!',
      footer: 'Coming soon...'
    })
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.userId = this.authService.getUserId();
    this.leagueService.getLeagues();
    this.leaguesSub = this.leagueService
      .getLeagueUpdateListener()
      .subscribe((leagues) => {
        this.leagues1 = leagues;
        this.isLoading = false;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.leaguesSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
