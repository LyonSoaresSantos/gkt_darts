import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';
import  Swal  from 'sweetalert2'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // constructor(private dialog: MatDialog) {}
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire( 'Erro' )
        // this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
        console.log('to no erro')
        return throwError(error);
      })
    );
  }
}
