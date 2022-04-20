import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { League } from './league.model';
import { map } from 'rxjs/operators';
import { Matches } from '../matches/matches.model';
import Swal from 'sweetalert2'

const BACKEND_URL = environment.apiUrl + '/leagues/';
const BACKEND_GAMES = environment.apiUrl + '/games/league-games/';
const BACKEND_USERLEAGUE = environment.apiUrl + '/leagues/userleague';

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private camps: any;
  private matches: any;
  private leaguesUpdated = new Subject<League[]>();
  private leagueUpdated = new Subject<League[]>();
  private matchUpdated = new Subject<Matches[]>();
  leagues: any;
  league: any;

  constructor(private http: HttpClient, private router: Router) { }

  addLeague(title: string, content: string, type: number, status: number) {
    const leagueData: League = {
      title: title,
      content: content,
      id: '',
      type: type,
      status: 1
    };
    this.http
      .post<{ message: string; league: League }>(BACKEND_URL, leagueData)
      .subscribe((responseData) => {
        this.router.navigate(['/home/leagues-management']);
      });
  }

  updateLeague(id: string, title: string, content: string, type: number, status: number) {
    let leagueData: League | FormData;
    leagueData = {
      id: id,
      title: title,
      content: content,
      type: type,
      status: status
    };

    this.http.put(BACKEND_URL + id, leagueData).subscribe((response) => {
      this.router.navigate(['/home/leagues-management']);
    });
  }

  getLeague(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      content: string;
      type: number;
      status: number;
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
      .subscribe({
        next: (v) => {
          this.router.navigate(['/home/leagues-management']);
        },
        error: (e) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 2000
          })
        },
        complete: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Users to the Leagues Saved!',
            showConfirmButton: false,
            timer: 2000
          })

        }
      })
  }
}
