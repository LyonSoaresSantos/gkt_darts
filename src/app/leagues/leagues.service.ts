import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { League } from './league.model';
import { map } from 'rxjs/operators';
import { Matches } from '../matches/matches.model';
import  Swal  from 'sweetalert2'

const BACKEND_URL = environment.apiUrl + '/leagues/';
const BACKEND_GAMES = environment.apiUrl + '/games/league-games/';
const BACKEND_USERLEAGUE = environment.apiUrl + '/leagues/userleague';

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private camps: any;
  // private leagues: League[] = [];
  private matches: any;
  private leaguesUpdated = new Subject<League[]>();
  private leagueUpdated = new Subject<League[]>();
  private matchUpdated = new Subject<Matches[]>();
  leagues: any;
  league: any;


  constructor(private http: HttpClient, private router: Router) {}

  addLeague(title: string, content: string, type: number) {
    // const leagueData = new FormData();
    // leagueData.append('title', title);
    // leagueData.append('content', content);
    const leagueData: League = {
      title: title,
      content: content,
      id: '',
      type: type,
    };
    console.log(leagueData);
    this.http
      .post<{ message: string; league: League }>(BACKEND_URL, leagueData)
      .subscribe((responseData) => {
        this.router.navigate(['/home/users']);
      });
  }

  updateLeague(id: string, title: string, content: string, type: number) {
    let leagueData: League | FormData;
    // if (typeof image === 'object') {
    //   leagueData = new FormData();
    //   leagueData.append('id', id);
    //   leagueData.append('title', title);
    //   leagueData.append('content', content);
    // } else {
    leagueData = {
      id: id,
      title: title,
      content: content,
      type: type,
    };

    this.http.put(BACKEND_URL + id, leagueData).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  getLeague(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      content: string;
      type: number;
    }>(BACKEND_URL + id);
  }

  getLeagueById(id: string) {
    this.http.get(BACKEND_URL + id).subscribe((leagueData1) => {
      this.league = leagueData1;
      this.leagueUpdated.next([...this.league.data]);
    });
  }

  getLeagueOneUpdateListener() {
    return this.leagueUpdated.asObservable();
  }





  getLeagues() {
    this.http.get<{ data: any }>(BACKEND_URL).subscribe((leagueData) => {
      this.camps = leagueData;
      this.leaguesUpdated.next([...this.camps.data]);
      console.log(leagueData)
    });
  }

  getLeagueUpdateListener() {
    return this.leaguesUpdated.asObservable();
  }


  getMatchesByLeague(id: string) {
    this.http.get(BACKEND_GAMES + id).subscribe((match1Data) => {
      this.matches = match1Data;
      this.matchUpdated.next([...this.matches.data]);
    });
  }

  getMatchesUpdateListener() {
    return this.matchUpdated.asObservable();
  }

  addUsersLeague(gameData) {
    this.http
      .post<{ message: string; matches: Matches }>(BACKEND_USERLEAGUE, gameData)
      .subscribe((responseData) => {
        this.router.navigate(['/home/leagues-management']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Users to the Leagues Saved!',
          showConfirmButton: false,
          timer: 2000
        })
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 2000
        })
      }
      );
  }
}
