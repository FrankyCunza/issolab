import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, Platform, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service'; //firebase login
// import { User } from '../shared/user.class'; //firebase login
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AngularFireModule} from 'angularfire2';
// FOR FIREBASE LOGIN FB AND GOOGLE PLUS
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable} from 'rxjs/Observable';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router: Router,
    public loadingController: LoadingController,
    public menu: MenuController,
    private http: HttpClient,
    private _cookie: CookieService,
    public platform: Platform,
    public googlePlus: GooglePlus,
    public afDB: AngularFireDatabase,
    private fb: Facebook,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private authSvc: AuthService,
    public twitterConnect: TwitterConnect
    ) { }


  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('PLateforme cordova');
      this.facebookCordova();
    } else {
      console.log('PLateforme Web');
      this.facebookWeb();
    }
  }

  facebookCordova() {
    this.fb.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log('Info Facebook: ' + JSON.stringify(success));
            this.router.navigateByUrl('/home');
        }).catch((error) => {
            console.log('Erreur: ' + JSON.stringify(error));
            this.router.navigateByUrl('/register');
        });
    }).catch((error) => { console.log(error); });
  }

  // facebookWeb() {
  //   this.afAuth.auth
  //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then((success) => {
  //       console.log('Info Facebook: ' + JSON.stringify(success));
  //     }).catch((error) => {
  //       console.log('Erreur: ' + JSON.stringify(error));
  //     });
  // }

  facebookWeb() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success) => {
        // console.log('Info Facebook: ' + JSON.stringify(success));
        console.log('Display Name: ' + success.user.displayName);
        console.log('User Id: ' + success.user.uid);
        console.log('photoUrl: ' + success.user.photoURL);
        this.router.navigateByUrl('/home');
      }).catch((error) => {
        console.log('Error:' + JSON.stringify(error));
      });
  }

  loginGooglee(): void {
    this.googlePlus.login({
      'webClientId': '186688039843-615dc6irc3d1b9rgus3308vf8oef3o2r.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
        console.log(res);
        this.router.navigateByUrl('/home');
        }
      )
      .catch(err => {
        console.error(err);
        alert("error");
      });
  }

  loginGoogle()  {
    if (this.platform.is('cordova')) {
        this.navigateGoogleLogin();
    } else{
      this.webGoogleLogin();
    }
  }
  async navigateGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.googlePlus.login({
        'webClientId': '135656993579-m2ikk0flsunna8smei7ci18knpsq22u8.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });
      return this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then((credential) => {
        console.log('creds', credential.user);
        alert("hola");
        // this.updateUserData(credential.user);
      });
      
    } catch(err) {
      console.log(err);
      alert(err);
    }
  }
  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    } catch(err) {
      console.log(err)
    }
  }
  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')){
      this.googlePlus.logout();
    }
  }

  ngOnInit() {
  }

}
