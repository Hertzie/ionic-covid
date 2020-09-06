import { ModalController, NavParams } from "@ionic/angular";
import { Component, OnInit, Input } from "@angular/core";
import {
  InAppBrowser,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-modal-noticia",
  templateUrl: "./modal-noticia.page.html",
  styleUrls: ["./modal-noticia.page.scss"]
})
export class ModalNoticiaPage implements OnInit {
  private url: string = "";
  private imagen: string = "";
  private contenido: string = "";

  options: InAppBrowserOptions = {
    location: "yes",
    hidden: "no"
  };
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.url = this.navParams.get("urlNoticia");
    this.imagen = this.navParams.get("imagen");
    this.contenido = this.navParams.get("contenido");

    this.iab.create(this.url, "_self", this.options);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
