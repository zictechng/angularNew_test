import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/partials/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/partials/side-bar/side-bar.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { HomePageComponent } from './components/dashboard/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    AuthPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
