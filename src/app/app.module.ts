import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { DashBoardComponent } from './posts/dash-board/dash-board.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PostListComponent,
    PostDetailsComponent,
    DashBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
