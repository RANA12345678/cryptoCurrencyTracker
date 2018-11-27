import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  imports: [CommonModule, AboutRoutingModule],
  declarations: [AboutMeComponent]
})
export class AboutModule {}
