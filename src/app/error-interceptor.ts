import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorComponent } from "./error/error.component";
// import { AuthService } from "./auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        // alert(error.error.message);
        // alert(error.error.error.message);

        // dialog service
        // this.dialog.open(ErrorComponent);
        let errorMessage = 'an unkown error occured';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error)
      })
    );
  }
}









