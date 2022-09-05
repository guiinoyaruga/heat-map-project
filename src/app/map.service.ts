import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  async showOrders(
    page: any = '1',
    lastPage: any = '3'
  ): Promise<Observable<any>> {

    let pages = [];

    for (page; page <= lastPage; page++) {
      pages.push(
        this.http.get(
          'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=' +
            page +
            '&data_inicio=2022-08-01&data_fim=2022-08-25&tipo=1&pedido_status=FINISHED',
          {
            headers: new HttpHeaders({
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1ODQ0LCJpYXQiOjE2NjE0Njk1Nzh9.zo2ZgM1ObQqus50QT4NdZlhlO7TO-Rzs89NXKenc9aY',
            }),
          }
        )
      );
    }
     return forkJoin(pages);

  }
}
