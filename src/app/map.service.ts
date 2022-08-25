import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler)
  }
  URL_API =
    'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=1&data_inicio=2022-08-18&data_fim=2022-08-18&tipo=1&pedido_status=FINISHED';

  showOrders(): Observable<any> {
    return this.http.get(`${this.URL_API}`, {
      headers: new HttpHeaders({
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU2MzIsImlhdCI6MTY2MDk0MDA1M30._qWPLwGCg01bvySd8420EQyfUL4tlIutKsjLpIhYeJk ',
      }),
      
    });
  }
}
