import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';



import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CookieService } from 'ngx-cookie-service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { HomePageModule } from './home/home.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

// FOR FIREBASE LOGIN FB AND GOOGLE PLUS
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
// LOGIN FB AND GOOGLE PLUS
import { AngularFireModule } from '@angular/fire';
// import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';

import * as $ from 'jquery'
import { Observable } from 'rxjs';
// import { HomePagePage } from './home/home.page';

// import { AuthService } from './services/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
// CONFIG CREDENTIALES FIREBASE
// export const firebaseConfig = {
//   apiKey: "AIzaSyB0Wo189-lfv2KcC6tN0CWp1HnZXFGzSVM",
//   authDomain: "issolab.firebaseapp.com",
//   databaseURL: "https://issolab.firebaseio.com",
//   projectId: "issolab",
//   storageBucket: "issolab.appspot.com",
//   messagingSenderId: "135656993579",
//   appId: "1:135656993579:web:f489c3a9699e605df78b6e",
//   measurementId: "G-LR6VYCDND3"
// };
// firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    AppRoutingModule,
    HomePageModule,
    ComponentsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    Facebook,
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage
    AngularFireDatabaseModule,
    TwitterConnect,
    // AuthService,
    NativeStorage,
    GooglePlus,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy },
    // HTTP,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
