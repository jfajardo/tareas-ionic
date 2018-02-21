import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TareasServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TareasServicioProvider {

  db: SQLiteObject = null;
  
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

}
