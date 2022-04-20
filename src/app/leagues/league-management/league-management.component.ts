import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatchesService } from 'src/app/matches/matches.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { League } from '../league.model';
import { LeagueService } from '../leagues.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-league-management',
  templateUrl: './league-management.component.html',
  styleUrls: ['./league-management.component.css']
})
export class LeagueManagementComponent implements OnInit {

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private gamesService: MatchesService,
    private route: ActivatedRoute
  ) { }

  isLoading = false;
  theSelect = false;
  playersListed = true;

  habi = [];
  novosUsers = [];

  leagues: League[] = [];
  league1: any;
  league: any;
  leagueId: any;
  private leagueSub: Subscription;

  users: User[] = [];
  users0: User[] = [];
  user: any;
  user0: any;
  users1: any;
  userFilter: any;
  private usersSub: Subscription;
  private usersSub0: Subscription;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  listPlayers() {
    this.theSelect = false;
    this.playersListed = true;
  }

  onItemSelect(item: any) { }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  select() {
    this.playersListed = false;
    this.userFilter = this.users0.filter((users0) => users0.status == 1);
    this.dropdownList = this.userFilter;
    this.selectedItems = this.users1;
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Players',
      labelKey: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class-example',
    };
    this.theSelect = true;
  }

  getValueWithPromise() {
    this.resolveAfter2Seconds(20).then((value) => {
      console.log(`promise result: ${value}`);
      this.isLoading = false;
    });
  }

  resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  save(x) {
    this.habi = this.selectedItems.map(function (foi) {
      return {
        userid: foi.id,
      };
    });

    let recebendoAsTretas = this.habi;
    recebendoAsTretas.forEach((key) => {
      key['leagueid'] = this.league1[0].id;
    });
    this.novosUsers = recebendoAsTretas;
    for (let x of this.novosUsers) {
      this.leagueService.addUsersLeague(x);
    }
  }


  createGames() {
    this.isLoading = true;

    var participantA: any;
    var participantB: any;
    var p: any;
    var players = [];




    var home = [];

    for (let value of this.users1) {
      home.push(value.id);
    }

    players = home;

    var n = players.length
    var resto = n % 2;

    if (resto == 0) {
      const matchParticipants = (participants) => {
        p = Array.from(participants);
        if (p % 2 == 1) {
          p.push(null);
        }
        const pairings = [];
        while (p.length != 0) {
          participantA = p.shift();
          participantB = p.pop();
          if (participantA != undefined && participantB != undefined) {
            pairings.push([participantA, participantB]);
          }
        }
        return pairings;
      };

      const rotateArray = (array) => {
        const p = Array.from(array);
        const firstElement = p.shift();
        const lastElement = p.pop();
        return [firstElement, lastElement, ...p];
      };

      const generateTournament = (participants) => {
        const tournamentRounds = [];
        const rounds = Math.ceil(participants.length);
        console.log(Math.ceil(participants.length / 2));
        let p = Array.from(participants);
        for (let i = 0; i < rounds; i++) {
          tournamentRounds.push(matchParticipants(p));
          p = rotateArray(p);
        }
        return tournamentRounds;
      };

      var resultados: any;
      var a: any;
      resultados = generateTournament(players);
      a = resultados.map((item, index) => ({ round: index + 1, ...item }));

      var games = [];
      if (Math.ceil(a.length / 2) == 1) {
        console.log('to no 1')
        for (let data of a) {
          games.push(
            { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id }
          );
        }
      } else {
        if (Math.ceil(a.length / 2) == 2) {
          console.log('to no 2')
          for (let data of a) {
            games.push(
              { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
              { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id }
            );
          }
        } else {
          if (Math.ceil(a.length / 2) == 3) {
            console.log('to no 3')
            for (let data of a) {
              games.push(
                { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                // { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
              );
            }
          } else {
            if (Math.ceil(a.length / 2) == 4) {
              console.log('to no 4')
              for (let data of a) {
                games.push(
                  { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                  { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                  { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                  { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                );
              }
            } else {
              if (Math.ceil(a.length / 2) == 5) {
                console.log('to no 5')
                for (let data of a) {
                  games.push(
                    { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                    { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                    { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                    { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                    { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                  );
                }
              } else {
                if (Math.ceil(a.length / 2) == 6) {
                  console.log('to no 6')
                  for (let data of a) {
                    games.push(
                      { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                      { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                      { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                      { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                      { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                      { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                    );
                  }
                } else {
                  if (Math.ceil(a.length / 2) == 7) {
                    console.log('to no 7')
                    for (let data of a) {
                      games.push(
                        { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                        { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                        { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                        { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                        { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                        { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                        { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                      );
                    }
                  } else {
                    if (Math.ceil(a.length / 2) == 8) {
                      console.log('to no 8')
                      for (let data of a) {
                        games.push(
                          { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                          { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                          { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                          { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                          { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                          { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                          { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                          { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                        );
                      }
                    } else {
                      if (Math.ceil(a.length / 2) == 9) {
                        console.log('to no 9')
                        for (let data of a) {
                          games.push(
                            { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                            { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                            { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                            { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                            { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                            { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                            { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                            { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                            { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id }
                          );
                        }
                      } else {
                        if (Math.ceil(a.length / 2) == 10) {
                          console.log('to no 10')
                          for (let data of a) {
                            games.push(
                              { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                              { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                              { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                              { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                              { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                              { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                              { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                              { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                              { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                              { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                            );
                          }
                        } else {
                          if (Math.ceil(a.length / 2) == 11) {
                            console.log('to no 11')
                            for (let data of a) {
                              games.push(
                                { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id }
                              );
                            }
                          } else {
                            if (Math.ceil(a.length / 2) == 12) {
                              console.log(a.length)
                              console.log('to no 12')
                              for (let data of a) {
                                games.push(
                                  { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                  { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                  { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                  { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                  { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                  { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                  { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                  { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                  { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                  { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                  { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                  { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id }
                                );
                              }
                            } else {
                              if (Math.ceil(a.length / 2) == 13) {
                                for (let data of a) {
                                  games.push(
                                    { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                    { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                    { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                    { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                    { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                    { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                    { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                    { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                    { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                    { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                    { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                    { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id },
                                    { home: data[12][0], away: data[12][1], round: data.round, league: this.league1[0].id }
                                  );
                                }
                              } else {
                                if (Math.ceil(a.length / 2) == 14) {
                                  for (let data of a) {
                                    games.push(
                                      { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                      { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                      { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                      { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                      { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                      { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                      { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                      { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                      { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                      { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                      { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                      { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id },
                                      { home: data[12][0], away: data[12][1], round: data.round, league: this.league1[0].id },
                                      { home: data[13][0], away: data[13][1], round: data.round, league: this.league1[0].id }
                                    );
                                  }
                                } else {
                                  if (Math.ceil(a.length / 2) == 15) {
                                    for (let data of a) {
                                      games.push(
                                        { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                        { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                        { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                        { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                        { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                        { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                        { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                        { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                        { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                        { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                        { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                        { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id },
                                        { home: data[12][0], away: data[12][1], round: data.round, league: this.league1[0].id },
                                        { home: data[13][0], away: data[13][1], round: data.round, league: this.league1[0].id },
                                        { home: data[14][0], away: data[14][1], round: data.round, league: this.league1[0].id }
                                      );
                                    }
                                  } else {
                                    if (Math.ceil(a.length / 2) == 16) {
                                      for (let data of a) {
                                        games.push(
                                          { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                          { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                          { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                          { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                          { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                          { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                          { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                          { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                          { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                          { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                          { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                          { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id },
                                          { home: data[12][0], away: data[12][1], round: data.round, league: this.league1[0].id },
                                          { home: data[13][0], away: data[13][1], round: data.round, league: this.league1[0].id },
                                          { home: data[14][0], away: data[14][1], round: data.round, league: this.league1[0].id },
                                          { home: data[15][0], away: data[15][1], round: data.round, league: this.league1[0].id }
                                        );
                                      }
                                    } else {
                                      if (Math.ceil(a.length / 2) == 17) {
                                        for (let data of a) {
                                          games.push(
                                            { home: data[0][0], away: data[0][1], round: data.round, league: this.league1[0].id },
                                            { home: data[1][0], away: data[1][1], round: data.round, league: this.league1[0].id },
                                            { home: data[2][0], away: data[2][1], round: data.round, league: this.league1[0].id },
                                            { home: data[3][0], away: data[3][1], round: data.round, league: this.league1[0].id },
                                            { home: data[4][0], away: data[4][1], round: data.round, league: this.league1[0].id },
                                            { home: data[5][0], away: data[5][1], round: data.round, league: this.league1[0].id },
                                            { home: data[6][0], away: data[6][1], round: data.round, league: this.league1[0].id },
                                            { home: data[7][0], away: data[7][1], round: data.round, league: this.league1[0].id },
                                            { home: data[8][0], away: data[8][1], round: data.round, league: this.league1[0].id },
                                            { home: data[9][0], away: data[9][1], round: data.round, league: this.league1[0].id },
                                            { home: data[10][0], away: data[10][1], round: data.round, league: this.league1[0].id },
                                            { home: data[11][0], away: data[11][1], round: data.round, league: this.league1[0].id },
                                            { home: data[12][0], away: data[12][1], round: data.round, league: this.league1[0].id },
                                            { home: data[13][0], away: data[13][1], round: data.round, league: this.league1[0].id },
                                            { home: data[14][0], away: data[14][1], round: data.round, league: this.league1[0].id },
                                            { home: data[15][0], away: data[15][1], round: data.round, league: this.league1[0].id },
                                            { home: data[16][0], away: data[16][1], round: data.round, league: this.league1[0].id }
                                          );
                                        }
                                      } else {

                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      console.log(games);
      // for (let x of games) {
        this.gamesService.addGames(games);
      // }

      this.isLoading = false;
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please, use a odd number of players!',
        showConfirmButton: false,
        timer: 2000
      })
      this.isLoading = false;
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

      //alluser
      this.userService.getUsers();
      this.usersSub0 = this.userService
        .getUserUpdateListener()
        .subscribe((users0: User[]) => {
          this.users0 = users0;
        });

      //usersByLeague
      this.user = this.userService.getUserByLeague(this.leagueId);
      this.usersSub = this.userService
        .getUserLeagueUpdateListener()
        .subscribe((user) => {
          this.users = user;
          this.users1 = this.users;
        });
    });
    this.getValueWithPromise();

  }

}
