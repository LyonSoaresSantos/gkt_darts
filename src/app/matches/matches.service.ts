import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import  Swal  from 'sweetalert2'

import { map } from 'rxjs/operators';
import { Matches } from './matches.model';
// import { ErrorHandler } from '../app.error-handler';

const BACKEND_URL = environment.apiUrl + '/games/';

@Injectable({ providedIn: 'root' })
export class MatchesService {
  private matches: any;
  private match: any;
  private matchesUpdated = new Subject<Matches[]>();
  private matchUpdated = new Subject<Matches[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addGames(gameData) {
    console.log(gameData);
    this.http
      .post<{ message: string; matches: Matches }>(BACKEND_URL, gameData)
      .subscribe((responseData) => {
        this.router.navigate(['/home/users']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Game Created!',
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

  getMatchById(id: string) {
    this.http.get(BACKEND_URL + id).subscribe((match1Data) => {
      this.match = match1Data;
      this.matchUpdated.next([...this.match.data]);
    });
  }


  getMatches() {
    this.http.get<{ data: any }>(BACKEND_URL).subscribe((matchesData) => {
      this.matches = matchesData;
      console.log(this.matches);
      this.matchesUpdated.next([...this.matches.data]);
    });
  }

  getMatchesUpdateListener() {
    return this.matchesUpdated.asObservable();
  }

  getMatchUpdateListener() {
    return this.matchUpdated.asObservable();
  }

  updateGame(
    id: string,
    leagueId: number,
    homeId: string,
    awayId: string,
    round: number,
    status: number,
    sethome: string,
    leghome: string,
    average3home: string,
    average1home: string,
    highouthome: string,
    bestleghome: string,
    g100home: string,
    g140home: string,
    g170home: string,
    g180home: string,
    setaway: string,
    legaway: string,
    average3away: string,
    average1away: string,
    highoutaway: string,
    bestlegaway: string,
    g100away: string,
    g140away: string,
    g170away: string,
    g180away: string
  ) {
    let gameData: Matches | FormData;
    gameData = {
      id: id,
      leagueId: leagueId,
      homeId: homeId,
      awayId: awayId,
      round: round,
      status: 2,
      sethome: sethome,
      leghome: leghome,
      average3home: average3home,
      average1home: average1home,
      highouthome: highouthome,
      bestleghome: bestleghome,
      g100home: g100home,
      g140home: g140home,
      g170home: g170home,
      g180home: g180home,
      setaway: setaway,
      legaway: legaway,
      average3away: average3away,
      average1away: average1away,
      highoutaway: highoutaway,
      bestlegaway: bestlegaway,
      g100away: g100away,
      g140away: g140away,
      g170away: g170away,
      g180away: g180away,
    };
    this.http.put(BACKEND_URL + id, gameData).subscribe((response) => {
      this.router.navigate(['/home/league-detail/9']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Game Details Saved!',
        showConfirmButton: false,
        timer: 2000
      })
    }
    ,
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
