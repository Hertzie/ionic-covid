import { SafePipe } from "./../pipes/SafePipe.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModalNoticiaPageRoutingModule } from "./modal-noticia-routing.module";

import { ModalNoticiaPage } from "./modal-noticia.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNoticiaPageRoutingModule
  ],
  declarations: [ModalNoticiaPage, SafePipe]
})
export class ModalNoticiaPageModule {}
