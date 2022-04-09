import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LeagueService } from '../leagues.service';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;

  leagues: any;

  private leaguesSub: Subscription;
  private authListenerSubs: Subscription;


  constructor(private leagueService : LeagueService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.userId = this.authService.getUserId();
    this.leagueService.getLeagues();
    this.leaguesSub = this.leagueService
      .getLeagueUpdateListener()
      .subscribe((leagues) => {
        this.leagues = leagues;
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

}
