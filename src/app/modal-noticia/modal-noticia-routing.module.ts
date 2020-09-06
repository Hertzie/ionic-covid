import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNoticiaPage } from './modal-noticia.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNoticiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNoticiaPageRoutingModule {}
