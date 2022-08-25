import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapService} from './map.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMapsComponent } from './show-maps/show-maps/show-maps.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ShowMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MapService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
