import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeagueService } from 'src/app/leagues/leagues.service';
import { Matches } from 'src/app/matches/matches.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public userService: UserService,
    public leagueService: LeagueService,
    public route: ActivatedRoute
  ) { }

  users: User[] = [];
  matches: Matches[] = [];
  match: any;
  match1: any;
  user: any;
  league: any;
  user1: any;
  stat: any;
  stats: any;
  stats1: any;

  //Para o grafico
  rounds = [];
  g180 = [];
  g170 = [];
  g140 = [];
  g100 = [];
  highestOut = [];
  bestLeg = [];
  average1 = [];
  average2 = [];
  //

  private userId: string;
  private usersSub: Subscription;
  private matchesSub: Subscription;
  private statsSub: Subscription;

  isLoading = false;
  chartsOn = false;

  openCharts() {
    if (this.chartsOn == true) {
      console.log('ta true ja');
    } else {
      this.chartsOn = true;
      this.qtdRounds();
      this.qtd180();
      this.qtd170();
      this.qtd140();
      this.qtd100();
      this.highOut();
      this.best();
    }
  }

  //Metodos dados para os graficos
  qtdRounds() {
    for (let value of this.match1) {
      this.rounds.push(value.round);
      console.log(this.rounds)
    }
  }

  qtd180() {
    for (let a of this.stats1) {
      this.g180.push(a.g180);
    }
  }

  qtd170() {
    for (let a of this.stats1) {
      this.g170.push(a.g170);
    }
  }

  qtd140() {
    for (let a of this.stats1) {
      this.g140.push(a.g140);
    }
  }

  qtd100() {
    for (let a of this.stats1) {
      this.g100.push(a.g100);
    }
  }

  highOut() {
    for (let a of this.stats1) {
      this.highestOut.push(a.highest);
    }
  }

  best() {
    for (let a of this.stats1) {
      this.bestLeg.push(a.bestleg);
    }
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = this.rounds;
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [{ data: this.g180, label: '180+' }];

  public barChartLabels1 = this.rounds;
  public barChartType1 = 'line';
  public barChartLegend1 = true;
  public barChartData1 = [{ data: this.g170, label: '170s' }];

  public barChartLabels2 = this.rounds;
  public barChartType2 = 'line';
  public barChartLegend2 = true;
  public barChartData2 = [{ data: this.g140, label: '140s' }];

  public barChartLabels3 = this.rounds;
  public barChartType3 = 'line';
  public barChartLegend3 = true;
  public barChartData3 = [{ data: this.g100, label: '100' }];

  public barChartLabels4 = this.rounds;
  public barChartType4 = 'line';
  public barChartLegend4 = true;
  public barChartData4 = [{ data: this.highestOut, label: 'Highest Out' }];

  public barChartLabels5 = this.rounds;
  public barChartType5 = 'line';
  public barChartLegend5 = true;
  public barChartData5 = [{ data: this.bestLeg, label: 'Best Leg' }];

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('id');
      this.match = this.userService.getMatchByUser(this.userId);
      this.matchesSub = this.userService
        .getMatchesUpdateListener()
        .subscribe((match) => {
          this.matches = match;
          this.match1 = this.matches;
          // this.qtdRounds();
          // this.qtd180();
          // this.qtd170();
          // this.qtd140();
          // this.qtd100();
          // this.highOut();
          // this.best();
          this.isLoading = false;
          
        });
      this.stat = this.userService.getStatsByUser(this.userId);
      this.statsSub = this.userService
        .getStatsUpdateListener()
        .subscribe((stat) => {
          this.stats = stat;
          this.stats1 = this.stats;
        });
      this.user = this.userService.getUserById(this.userId);
      this.usersSub = this.userService
        .getUserUpdateListener()
        .subscribe((user) => {
          this.users = user;
          this.user1 = this.users;
        });
    });
  }

}
