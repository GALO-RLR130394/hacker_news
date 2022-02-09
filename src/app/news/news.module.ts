import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewsRoutingModule } from './news-routing.module';
import { IndexComponent } from './index/index.component';
import { NewsListComponent } from './news-list/news-list.component';


@NgModule({
  declarations: [
    IndexComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    NgbModule,
  ]
})
export class NewsModule { }
