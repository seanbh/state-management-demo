import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { UserModule } from './user/user.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/core/in-memory-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, MenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      delay: 500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
