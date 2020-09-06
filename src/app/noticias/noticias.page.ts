import { paises } from "./../utils/paises";
import { idiomas } from "./../utils/idiomas";
import { ModalNoticiaPage } from "./../modal-noticia/modal-noticia.page";
import { Component, ViewChild } from "@angular/core";
import NoticiasService from "../services/noticias.service";
import {
  IonInfiniteScroll,
  ModalController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import {
  InAppBrowser,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.page.html",
  styleUrls: ["./noticias.page.scss"]
})
export class NoticiasPage {
  @ViewChild(IonInfiniteScroll, { read: "", static: true })
  infiniteScroll: IonInfiniteScroll;
  private totales: number = 0;
  private pagina: number = 1;
  private noticias: any[] = [];
  private idiomas: any[] = [];
  private fuentes: any[] = [];
  private fuentesIdioma: any[] = [];
  private paises: any[] = [];

  private opcionesBusqueda = {
    idioma: "",
    fuente: "",
    pais: ""
  };

  options: InAppBrowserOptions = {
    location: "yes",
    hidden: "no"
  };

  constructor(
    private ns: NoticiasService,
    public modalController: ModalController,
    private iab: InAppBrowser,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    // this.ns.getNoticias(this.pagina).subscribe((data: any) => {
    //   this.totales = data.totalResults;
    //   this.noticias = data.articles;
    // });

    this.ns.getFuentes().subscribe((data: any) => {
      this.fuentes = data.sources;
      console.log(this.fuentes);
      // this.fuentes.forEach(f => {
      //   !this.idiomas.includes(this.parseIdiomas(f.language))
      //     ? this.idiomas.push(this.parseIdiomas(f.language))
      //     : null;

      //   //!this.paises.includes(f.country) ? this.paises.push(f.country) : null;
      // });
      // console.log("Idiomas: ", this.idiomas);
      // console.log("Fuentes: ", this.fuentes);
      // console.log("Paises: ", this.paises);
    });

    this.idiomas = idiomas;
    this.paises = paises;
    console.log("Idiomas: ", this.idiomas);
    console.log("Paises: ", this.paises);
  }

  cargarMasNoticias(event) {
    this.ns
      .getNoticias(
        ++this.pagina,
        this.opcionesBusqueda.idioma,
        this.opcionesBusqueda.fuente
      )
      .subscribe(async (data: any) => {
        await this.esperar(2000);
        data.articles.forEach(a => this.noticias.push(a));
        event.target.complete();
        if (this.totales == this.noticias.length) {
          event.target.disabled = true;
        }
      });
  }

  esperar(tiempo: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, tiempo);
    });
  }

  presentarNoticia(noticia: any) {
    this.iab.create(noticia.url, "_self", this.options);
  }

  getFuentesIdioma() {
    this.opcionesBusqueda.fuente = "";
    this.fuentesIdioma = this.fuentes.filter(
      f => f.language == this.opcionesBusqueda.idioma
    );
  }

  getFuentesPais() {
    this.fuentesIdioma = this.fuentes.filter(
      f => f.country == this.opcionesBusqueda.pais
    );

    this.opcionesBusqueda.fuente = "";
    this.opcionesBusqueda.idioma = "";
  }

  async buscarNoticias() {
    this.pagina = 1;
    this.noticias = [];
    const loader = await this.loadingController.create({
      message: "Buscando..."
    });

    loader.present();

    this.ns
      .getNoticias(
        this.pagina,
        this.opcionesBusqueda.idioma,
        this.opcionesBusqueda.fuente,
        this.opcionesBusqueda.pais
      )
      .subscribe(async (data: any) => {
        this.totales = data.totalResults;
        this.noticias = data.articles;

        if (!data.articles.length) {
          const alerta = await this.alertController.create({
            header: "Sin resultados",
            message: "No se encontraron resultados",
            buttons: ["OK"]
          });

          alerta.present();
        }

        loader.dismiss();
      });
  }
}
