import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable, ApplicationRef } from '@angular/core';
import { Observable, timer } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../shared/services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService, private appRef: ApplicationRef) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();

        const modifiedReq = req.clone({
            setHeaders: {
             
                'sign': 'w13213123-sadsd123123-dsadadssd' 
            }
        });

        return next.handle(modifiedReq).pipe(
            finalize(() => {
                timer(500).subscribe(() => { 
                    this.loadingService.hide();
                    this.appRef.tick(); 
                });
            })
        );
    }
}
