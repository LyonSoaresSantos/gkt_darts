import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Matches } from 'src/app/matches/matches.model';
import { MatchesService } from 'src/app/matches/matches.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { League } from '../league.model';
import { LeagueService } from '../leagues.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent implements OnInit {

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private matchesService: MatchesService,
    private ngbModal: NgbModal,
    private route: ActivatedRoute
  ) { }

  private leagueId: string;

  leagues: League[] = [];
  league: any;
  league1: any;
  private leagueSub: Subscription;

  matches: Matches[] = [];
  match: any;
  match1: any;
  private matchesSub: Subscription;

  users: User[] = [];
  user: any;
  users1: any;
  private usersSub: Subscription;

  //rounds
  round1: any;
  round2: any;
  round3: any;
  round4: any;
  round5: any;
  round6: any;
  round7: any;
  round8: any;
  round9: any;
  round10: any;
  round11: any;
  round12: any;
  round13: any;
  round14: any;
  round15: any;
  round16: any;
  round17: any;
  round18: any;
  round19: any;
  round20: any;
  round21: any;
  round22: any;
  round23: any;
  round24: any;
  round25: any;
  round26: any;
  round27: any;
  round28: any;
  round29: any;
  round30: any;

   //tabela
   teams: any;
   liga: number;
   gamesplayed: any;
   tableOn = false;
   tabela: any;
   bonusPoints: any;
 
   //gameById
   game1: any;
   matchById: any;
   private gameId: string;
   private matchbyIdSub: Subscription;

   isLoading = false;
   meuModal = false;

   openModal(x) {
    console.log(x);
    // this.gameId = x;
    this.matchById = this.matchesService.getMatchById(x);
    this.matchbyIdSub = this.matchesService
      .getMatchUpdateListener()
      .subscribe((matchById) => {
        this.matchById = matchById;
        this.game1 = this.matchById;
        console.log(this.game1);
      });
    this.meuModal = true;

    // this.modalService.openModal(MatchDetailComponent);
    // this.openLocalModal(template);
  }
  openLocalModal(
    content: any,
    size?: 'sm' | 'lg' | 'xl',
    windowClass: string = 'compact'
  ) {
    if (size === 'xl') {
      size = 'xl' as 'lg';
    }
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
      size: size,
    };
    if (windowClass) {
      ngbModalOptions.windowClass = windowClass;
    }

    return this.ngbModal.open(content, ngbModalOptions);
  }


   //Calculo Tabela
   tableService() {
    this.liga = +this.leagueId;
    this.matches = this.matches.filter((matches) => matches.status == 2);
    this.teams = this.users.filter(
      (users) => users.league === this.liga && users.status === 1
    );
  }

  getCurrentTable = function () {
    var table = [];
    this.tableService();
    var self = this;
    this.teams.forEach(function (team) {
      table.push(self.calculateTableRow(team));
    });
    this.sortTable(table);
    this.tabela = table;
    // return this.sortTable(table);
  };

  valorTabela() {
    this.getCurrentTable();
    // this.tableOn = true;
    // this.sortTable(this.tabela);
  }

  getValueWithPromise() {
    this.resolveAfter2Seconds(20).then((value) => {
      // console.log(`promise result: ${value}`);
      this.getCurrentTable();
      this.tableOn = true;
      this.isLoading = false;
    });

    // console.log('I will not wait until promise is resolved');
  }

  resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  calculateTableRow = function (team) {
    var TableRow = function () {
      var teamId,
        teamName,
        matchesPlayed,
        matchesWon,
        matchesDrawn,
        matchesLost,
        goalsFor,
        goalsAgainst,
        goalDifference,
        points;
    };
    var self = this;

    var tableRow = new TableRow();

    tableRow.teamId = team.id;
    tableRow.teamName = team.name;
    tableRow.matchesPlayed = 0;
    tableRow.matchesWon = 0;
    tableRow.matchesDrawn = 0;
    tableRow.matchesLost = 0;
    tableRow.setHome = 0;
    tableRow.setAway = 0;
    tableRow.goalDifference = 0;
    tableRow.points = 0;

    this.matches.forEach(function (match) {
      if (match.home === tableRow.teamId) {
        tableRow = self.updateTableRowForMatch(
          tableRow,
          match.sethome,
          match.setaway
        );
      } else if (match.away === tableRow.teamId) {
        tableRow = self.updateTableRowForMatch(
          tableRow,
          match.setaway,
          match.sethome
        );
      }
    });
    tableRow.goalDifference = tableRow.setHome - tableRow.setAway;
    return tableRow;
  };

  sortTable = function (tableRows) {
    var self = this;
    return tableRows
      .sort(function (tableRow1, tableRow2) {
        // compare points
        var result = self.comparePoints(tableRow1, tableRow2);
        if (result === 0) {
          // compare goal difference
          result = self.compareGoalDiff(tableRow1, tableRow2);
          if (result === 0) {
            // compare goals shot for
            result = self.compareGoalsFor(tableRow1, tableRow2);
          }
        }

        return result;
      })
      .reverse();
  };

  updateTableRowForMatch = function (tableRow, score1, score2) {
    tableRow.matchesPlayed++;
    tableRow.setHome += score1;
    tableRow.setAway += score2;
    switch (this.compareGoals(score1, score2)) {
      case 1:
        tableRow.matchesWon++;
        tableRow.points += 7;
        break;
      case -1:
        tableRow.matchesLost++;
        tableRow.points += this.bonusPoints;
        break;
      case 0:
        tableRow.matchesDrawn++;
        tableRow.points += 3;
        break;
      default:
        break;
    }

    return tableRow;
  };

  comparePoints = function (tableRow1, tableRow2) {
    if (tableRow1.points > tableRow2.points) {
      return 1;
    } else if (tableRow1.points < tableRow2.points) {
      return -1;
    }

    return 0;
  };

  /**
   * Compare the goal difference of two teams
   *
   * @param {TableRow} tableRow1
   * @param {TableRow} tableRow2
   * @returns {Boolean}
   */
  compareGoalDiff = function (tableRow1, tableRow2) {
    return this.compareGoals(
      tableRow1.goalDifference,
      tableRow2.goalDifference
    );
  };

  /**
   * Compare goals shot by each team
   *
   * @param {TableRow} tableRow1
   * @param {TableRow} tableRow2
   * @returns {Boolean}
   */
  compareGoalsFor = function (tableRow1, tableRow2) {
    return this.compareGoals(tableRow1.setHome, tableRow2.setHome);
  };

  compareGoals = function (goalsTeam1, goalsTeam2) {
    if (goalsTeam1 > goalsTeam2) {
      console.log(goalsTeam1, goalsTeam2);
      return 1;
    } else if (goalsTeam1 < goalsTeam2) {
      console.log(goalsTeam1, goalsTeam2);
      this.bonusPoints = goalsTeam1;
      return -1;
    }

    return 0;
  };

  //Logica tabela de rounds
  round001() {
    this.round1 = this.matches.filter((matches) => matches.round === 1);
    if (this.round1 == '' || null || undefined) {
      this.round1 = 0;
    } else {
      this.round1;
    }
  }

  round002() {
    this.round2 = this.matches.filter((matches) => matches.round === 2);
    if (this.round2 == '' || null || undefined) {
      this.round2 = 0;
    } else {
      this.round2;
    }
  }

  round003() {
    this.round3 = this.matches.filter((matches) => matches.round === 3);
    if (this.round3 == '' || null || undefined) {
      this.round3 = 0;
    } else {
      this.round3;
    }
  }

  round004() {
    this.round4 = this.matches.filter((matches) => matches.round === 4);
    if (this.round4 == '' || null || undefined) {
      this.round4 = 0;
    } else {
      this.round4;
    }
  }

  round005() {
    this.round5 = this.matches.filter((matches) => matches.round === 5);
    if (this.round5 == '' || null || undefined) {
      this.round5 = 0;
    } else {
      this.round5;
    }
  }

  round006() {
    this.round6 = this.matches.filter((matches) => matches.round === 6);
    if (this.round6 == '' || null || undefined) {
      this.round6 = 0;
    } else {
      this.round6;
    }
  }

  round007() {
    this.round7 = this.matches.filter((matches) => matches.round === 7);
    if (this.round7 == '' || null || undefined) {
      this.round7 = 0;
    } else {
      this.round7;
    }
  }

  round008() {
    this.round8 = this.matches.filter((matches) => matches.round === 8);
    if (this.round8 == '' || null || undefined) {
      this.round8 = 0;
    } else {
      this.round8;
    }
  }

  round009() {
    this.round9 = this.matches.filter((matches) => matches.round === 9);
    if (this.round9 == '' || null || undefined) {
      this.round9 = 0;
    } else {
      this.round9;
    }
  }

  round010() {
    this.round10 = this.matches.filter((matches) => matches.round === 10);
    if (this.round10 == '' || null || undefined) {
      this.round10 = 0;
    } else {
      this.round10;
    }
  }

  round011() {
    this.round11 = this.matches.filter((matches) => matches.round === 11);
    if (this.round11 == '' || null || undefined) {
      this.round11 = 0;
    } else {
      this.round11;
    }
  }

  round012() {
    this.round12 = this.matches.filter((matches) => matches.round === 12);
    if (this.round12 == '' || null || undefined) {
      this.round12 = 0;
    } else {
      this.round12;
    }
  }

  round013() {
    this.round13 = this.matches.filter((matches) => matches.round === 13);
    if (this.round13 == '' || null || undefined) {
      this.round13 = 0;
    } else {
      this.round13;
    }
  }

  round014() {
    this.round14 = this.matches.filter((matches) => matches.round === 14);
    if (this.round14 == '' || null || undefined) {
      this.round14 = 0;
    } else {
      this.round14;
    }
  }

  round015() {
    this.round15 = this.matches.filter((matches) => matches.round === 15);
    if (this.round15 == '' || null || undefined) {
      this.round15 = 0;
    } else {
      this.round15;
    }
  }

  round016() {
    this.round16 = this.matches.filter((matches) => matches.round === 16);
    if (this.round16 == '' || null || undefined) {
      this.round16 = 0;
    } else {
      this.round16;
    }
  }

  round017() {
    this.round17 = this.matches.filter((matches) => matches.round === 17);
    if (this.round17 == '' || null || undefined) {
      this.round17 = 0;
    } else {
      this.round17;
    }
  }

  round018() {
    this.round18 = this.matches.filter((matches) => matches.round === 18);
    if (this.round18 == '' || null || undefined) {
      this.round18 = 0;
    } else {
      this.round18;
    }
  }

  round019() {
    this.round19 = this.matches.filter((matches) => matches.round === 19);
    if (this.round19 == '' || null || undefined) {
      this.round19 = 0;
    } else {
      this.round19;
    }
  }

  round020() {
    this.round20 = this.matches.filter((matches) => matches.round === 20);
    if (this.round20 == '' || null || undefined) {
      this.round20 = 0;
    } else {
      this.round20;
    }
  }

  round021() {
    this.round21 = this.matches.filter((matches) => matches.round === 21);
    if (this.round21 == '' || null || undefined) {
      this.round21 = 0;
    } else {
      this.round21;
    }
  }

  round022() {
    this.round22 = this.matches.filter((matches) => matches.round === 22);
    if (this.round22 == '' || null || undefined) {
      this.round22 = 0;
    } else {
      this.round22;
    }
  }

  round023() {
    this.round23 = this.matches.filter((matches) => matches.round === 23);
    if (this.round23 == '' || null || undefined) {
      this.round23 = 0;
    } else {
      this.round23;
    }
  }

  round024() {
    this.round24 = this.matches.filter((matches) => matches.round === 24);
    if (this.round24 == '' || null || undefined) {
      this.round24 = 0;
    } else {
      this.round24;
    }
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.leagueId = paramMap.get('id');

      //league
      this.league = this.leagueService.getLeagueById(this.leagueId);
      this.leagueSub = this.leagueService
        .getLeagueOneUpdateListener()
        .subscribe((league) => {
          this.leagues = league;
          this.league1 = this.leagues;
        });

      //games
      this.match = this.leagueService.getMatchesByLeague(this.leagueId);
      this.matchesSub = this.leagueService
        .getMatchesUpdateListener()
        .subscribe((matches: Matches[]) => {
          this.matches = matches;
          //tabelas de games
          this.round001();
          this.round002();
          this.round003();
          this.round004();
          this.round005();
          this.round006();
          this.round007();
          this.round008();
          this.round009();
          this.round010();
          this.round011();
          this.round012();
          this.round013();
          this.round014();
          this.round015();
          this.round016();
          this.round017();
          this.round018();
          this.round019();
          this.round020();
          this.round021();
          this.round022();
          this.round023();
          this.round024();
        });

      //users
      this.user = this.userService.getUserByLeague(this.leagueId);
      this.usersSub = this.userService
        .getUserLeagueUpdateListener()
        .subscribe((user) => {
          this.users = user;
          this.users1 = this.users;
        });
      this.getValueWithPromise();

      //gameById
      //   this.matchById = this.matchesService.getMatchById(this.gameId);
      //    this.matchbyIdSub = this.matchesService
      //     .getMatchesUpdateListener()
      //     .subscribe((matchById) => {
      //       this.matchById = matchById;
      //       this.game1 = this.matchById;
      //       console.log(this.game1);
      //     });
    });
  }

}
