import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  data: any;

  constructor(private http: HttpClient) {}

  async dateFilter(dtInicio: any, dtFim: any) {
    this.data = { inicio: dtInicio, fim: dtFim };
  }

  receiveData() {
    return this.http
      .get(
        'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=1&data_inicio=' +
          this.data.inicio +
          '&data_fim=' +
          this.data.fim +
          '&tipo=1&pedido_status=FINISHED',
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1ODQ0LCJpYXQiOjE2NjM0MTkzMzJ9.WYZF-hFo6AV2RTLABqL5cjijUk0DrMMs1HRdvDR-bcA',
          }),
        }
      )
      .toPromise();
  }

  async lastPageSaved() {
    let result: any = await this.receiveData();
    //console.log(result);
    return result.lastPage;
  }

  async showOrders(lastPage: any) {
    let page = 1;
    let dataModified: any = [];

    //console.log(lastPage);

    for (page; page <= lastPage; page++) {
      let dataReceived: any = await this.http
        .get(
          'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=' +
            page +
            '&data_inicio=' +
            this.data.inicio +
            '&data_fim=' +
            this.data.fim +
            '&tipo=1&pedido_status=FINISHED',
          {
            headers: new HttpHeaders({
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1ODQ0LCJpYXQiOjE2NjM0MTkzMzJ9.WYZF-hFo6AV2RTLABqL5cjijUk0DrMMs1HRdvDR-bcA',
            }),
          }
        )
        .toPromise();
      dataReceived.data.forEach((elem: any) => {
        dataModified.push(elem);
      });
    }
    //console.log(this.data.inicio, this.data.fim);
    //console.log(dataModified);
    return dataModified;
  }
}
