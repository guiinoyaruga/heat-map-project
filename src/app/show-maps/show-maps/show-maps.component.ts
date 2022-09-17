import { Component, OnInit } from '@angular/core';

import { MapService } from 'src/app/map.service';

@Component({
  selector: 'app-show-maps',
  templateUrl: './show-maps.component.html',
  styleUrls: ['./show-maps.component.css'],
})
export class ShowMapsComponent implements OnInit {
  map!: google.maps.Map;
  myLatLng: any;
  heatMap: any;
  heatMapData: any = [];
  inicio: any;
  fim: any;
  date: any;

  constructor(public mapService: MapService) {}

  ngOnInit(): void {
    this.showMap();
  }

  //show lat and long
  showMap() {
    (this.myLatLng = new google.maps.LatLng(-20.3441877, -40.2915922)),
      (this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: this.myLatLng,
          zoom: 13,
        }
      ));

    //show the marker on map
    new google.maps.Marker({
      position: this.myLatLng,
      map: this.map,
      //icon: = change the shape of marker
    });
  }

  async getDateMap() {
    if (this.inicio <= this.fim) {
      this.date = await this.mapService.dateFilter(this.inicio, this.fim);
    } else if (this.inicio > this.fim) {
      alert('Data incial maior que data final, verifique novamente');
    } else if (!this.inicio && !this.fim) {
      alert('Digite uma data ínicio e fim');
    }
  }
  //get twice functions by button click
  async getButtonFunctions() {
    await this.getDateMap();
    await this.showOrders();
  }

  clearMap() {
    this.heatMap.setMap(null);
  }

  async showOrders() {
    let lastPage = await this.mapService.lastPageSaved();
    // check the data map
    if (!!this.heatMap && !!this.heatMap.setMap) {
      this.clearMap();
    } else {
      console.log('Erro ao limpar mapa!');
    }

    await this.mapService
      .showOrders(lastPage)
      .then((locations) => {
        this.heatMapData = locations;
        //console.log(locations);
        //console.log(this.heatmapData)

        let dataByService = [];

        for (let i = 0; i < this.heatMapData.length; i++) {
          dataByService[i] = new google.maps.LatLng(
            this.heatMapData[i].latitude,
            this.heatMapData[i].longitude
          );
          //console.log(this.heatMapData[i].latitude);
          //console.log(this.heatMapData[i].longitude);
        }

        this.heatMap = new google.maps.visualization.HeatmapLayer({
          data: dataByService,
          radius: 25,
        });

        this.heatMap.setMap(this.map);
      })
      .catch((err) => console.log('Erro ao buscar', err));
  }
}
