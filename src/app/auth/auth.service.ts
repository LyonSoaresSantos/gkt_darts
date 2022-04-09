import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { UserData } from './user-data.model';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'

const BACKEND_URL = environment.apiUrl + '/user/';

export interface AuthResponseData {
  token: string;
  expiresIn: number;
  userId: number;

}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // createUser(
  //   email: string,
  //   password: string,
  //   nick: string,
  //   league: string,
  //   status: number,
  //   image: File
  // ) {
  //   const userData: UserData = {
  //     email: email,
  //     password: password,
  //     nick: nick,
  //     league: league,
  //     status: status,
  //     image,
  //   };
  //   console.log(userData);
  //   this.http.post(BACKEND_URL + 'signup', userData).subscribe(
  //     () => {
  //       this.router.navigate(['/home/users']);
  //     },
  //     (error) => {
  //       this.authStatusListener.next(false);
  //     }
  //   );
  // }

  createUser(name: string, nick: string, email: string, password: string, league: string, status: string, image: File) {
    const userData = new FormData();
    userData.append('name', name)
    userData.append('nick', nick)
    userData.append('email', email)
    userData.append('password', password)
    userData.append('league', league)
    userData.append('status', status)
    userData.append('image', image, nick)
    console.log(userData)
    this.http.post(BACKEND_URL + 'signup', userData).subscribe(
      () => {
        this.router.navigate(['/home']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Saved!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      (error) => {
        this.authStatusListener.next(false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + 'login',
        authData
      )
      .subscribe({
        next:
          (response) => {
            const token = response.token;
            this.token = token;
            if (token) {
              const expiresInDuration = response.expiresIn;
              this.setAuthTimer(expiresInDuration);
              this.isAuthenticated = true;
              this.userId = response.userId;
              this.authStatusListener.next(true);
              const now = new Date();
              const expirationDate = new Date(
                now.getTime() + expiresInDuration * 1000
              );
              this.saveAuthData(token, expirationDate, this.userId);
              this.router.navigate(['/home/leagues']);
              Swal.fire('Welcome To GKT System!', 'You are the rockstar!', 'info');
            }
          },
        error: (e) => this.authStatusListener.next(false)
      })
  }
  

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }


}
