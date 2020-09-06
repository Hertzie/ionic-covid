import { SafePipe } from "./pipes/SafePipe.pipe";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

//Servicios
import NoticiasService from "./services/noticias.service";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
//Modales
import { ModalNoticiaPage } from "./modal-noticia/modal-noticia.page";

@NgModule({
  declarations: [AppComponent, ModalNoticiaPage, SafePipe],
  entryComponents: [ModalNoticiaPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoticiasService,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
