import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
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
  }

  async showOrders() {
    (await this.mapService.showOrders()).subscribe({
      next: async (locations) => {
        this.heatmapData = locations;
        console.log(locations);
        //console.log(this.heatmapData)

        let data = [];

        for (let i = 0; i < this.heatmapData.length; i++) {
          for (let j = 0; j < this.heatmapData[i].data.length; j++) {
          data[i] = new google.maps.LatLng(
            this.heatmapData[i].data[j].latitude,
            this.heatmapData[i].data[j].longitude
          );
          console.log(this.heatmapData[i].data[j].latitude);
          console.log(this.heatmapData[i].data[j].longitude);
        }
      }

        this.heatmap = new google.maps.visualization.HeatmapLayer({
          data: data,
        });
        this.heatmap.setMap(this.map);
      },
      error: (err) => {
        console.log('Erro ao buscar', err);
      },
    });
  }
}
