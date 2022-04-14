import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Matches } from '../matches/matches.model';

const BACKEND_URL = environment.apiUrl + '/user/';
const BACKEND_URL_USER_STATUS = environment.apiUrl + '/user/status/';
const BACKEND_URLGAMES = environment.apiUrl + '/games/games/';
const BACKEND_URLSTATS = environment.apiUrl + '/games/stats/';
const BACKEND_USERSLEAGUE = environment.apiUrl + '/user/users-league/';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: any;
  private usersStatus: any;
  private matches: any;
  private stats: any;
  private usersleague: any;
  private usersStatusUpdated = new Subject<User[]>();
  private statsUpdated= new Subject<Matches[]>();
  private matchesUpdated = new Subject<Matches[]>();
  private usersUpdated = new Subject<User[]>();
  private usersLeagueUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    this.http.get<{ data: any }>(BACKEND_URL).subscribe((userData) => {
      this.users = userData;
      this.usersUpdated.next([...this.users.data]);
    });
  }

  getUsersStatus() {
    this.http.get<{ data: any }>(BACKEND_URL).subscribe((userData) => {
      this.usersStatus = userData;
      this.usersStatusUpdated.next([...this.usersStatus.data]);
    });
  }

  getUsersbyStatus(id: number) {
    this.http.get<{ data: any }>(BACKEND_URL_USER_STATUS + id).subscribe((userData) => {
      this.usersStatus = userData;
      this.usersStatusUpdated.next([...this.usersStatus.data]);
    });
  }

  getUserStatusUpdateListener() {
    return this.usersStatusUpdated.asObservable();
  }

  getUserById(id: string) {
    this.http.get(BACKEND_URL + id).subscribe((userData) => {
      this.users = userData;
      this.usersUpdated.next([...this.users.data]);
    });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  updateUser(
    id: string,
    nick: string,
    name: string,
    email: string,
    status: number,
    league: number
  ) {
    let userData: User | FormData;
    // if (typeof image === 'object') {
    //   leagueData = new FormData();
    //   leagueData.append('id', id);
    //   leagueData.append('title', title);
    //   leagueData.append('content', content);
    // } else {
    userData = {
      id: id,
      nick: nick,
      name: name,
      email: email,
      status: status,
      league: league,
    };

    this.http.put(BACKEND_URL + id, userData).subscribe((response) => {
      this.router.navigate(['/home/users']);
    });
  }

  getMatchByUser(id: string) {
    this.http.get(BACKEND_URLGAMES + id).subscribe((matchesData) => {
      this.matches = matchesData;
      this.matchesUpdated.next([...this.matches.data]);
    });
  }

  getMatchesUpdateListener() {
    return this.matchesUpdated.asObservable();
  }

  getStatsByUser(id: string) {
    this.http.get(BACKEND_URLSTATS + id).subscribe((statsData) => {
      this.stats = statsData;
      this.statsUpdated.next([...this.stats.data]);
    });
  }

  getStatsUpdateListener() {
    return this.statsUpdated.asObservable();
  }

  getUserByLeague(id: string) {
    this.http.get(BACKEND_USERSLEAGUE + id).subscribe((userData2) => {
      this.usersleague = userData2;
      this.usersLeagueUpdated.next([...this.usersleague.data]);
    });
  }

  getUserLeagueUpdateListener() {
    return this.usersLeagueUpdated.asObservable();
  }
}
