import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/news', pathMatch: 'full' },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/news'
  }
];

