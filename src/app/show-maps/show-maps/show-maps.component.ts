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
  heatmap: any;
  heatmapData: any = [];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.showMap();
    this.showOrders();
  }

  //show lat and long
  showMap() {
    (this.myLatLng = new google.maps.LatLng(-20.2976178, -40.2957768)),
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

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.heatmapData,
    });
    this.heatmap.setMap(this.map);
  }

  showOrders() {
    this.mapService.showOrders().subscribe({
      next: (locations) => {
        this.heatmapData = locations.data;

        localStorage.setItem('locations', JSON.stringify(this.heatmapData));

        let teste = JSON.parse(localStorage.getItem('locations') || '{}');

        let data = [];

        for (let i = 0; i <teste.length; i++) {
          data[i] = new google.maps.LatLng(teste[i][0], teste[i][1])
          console.log(data[i]);
        }

        // let just = this.lat.'map((key: any) => ({
        //   [key]: this.heatmapData[key],
        // }));
        // console.log(just);
        console.log(JSON.parse(localStorage.getItem('locations') || '{}'));
      },
      error: (err) => {
        console.log('Erro ao buscar', err);
      },
    });
  }
}
