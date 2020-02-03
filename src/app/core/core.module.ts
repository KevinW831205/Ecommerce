import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingModule } from '../shopping/shopping.module';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    ShoppingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule {
}
