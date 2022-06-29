import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { Reserv } from '../models/reserv';

@Injectable()

export class ReservService {
    url: string = "http://localhost:3000/reservs";
    constructor(private httpClient: HttpClient) { }

    
    getReserv(): Observable<Reserv[]>{
        return this.httpClient.get<Reserv[]>(this.url)
        .pipe(
            tap(data => {}),
            catchError(this.handleError)
        );
    }

    createReserv(reserv: any): Observable<Reserv>{
        return this.httpClient.post<Reserv>(this.url, reserv);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log("Error : " + error.error.message);
        }
        else {
            switch (error.status) {
                case 404:
                    console.log("Not Found");
                    break;
                case 403:
                    console.log("Access Denied");
                    break;
                case 500:
                    console.log("Internal server");
                    break;
                default:
                    console.log("some unknow error happened");
            }
        }
        return throwError(() => new Error("some error happened"));
    }
}