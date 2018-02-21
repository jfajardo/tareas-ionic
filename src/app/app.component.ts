import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public sqlite: SQLite) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.crearBaseDatos();
    });
  }

  private crearBaseDatos(){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    })
    .then((db) => {
      console.log(db);
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
