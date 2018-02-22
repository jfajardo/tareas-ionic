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

  crearTabla(){
    let sql = `CREATE TABLE IF NOT EXISTS tareas(id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT, completado INTEGER)`;
    return this.db.executeSql(sql, []);
  }

  obtenerTodas(){
    let sql = 'SELECT * FROM tareas';
    return this.db.executeSql(sql, [])
      .then(response => {
        let tareas = [];
        for (let index = 0; index < response.rows.length; index++) {
          tareas.push(response.rows.item(index));
        }
        return Promise.resolve( tareas );
      })
      .catch(error => Promise.reject(error));
  }

  crear(tarea: any){
    let sql = 'INSERT INTO tareas(titulo, completado) VALUES(?,?)';
    return this.db.executeSql(sql, [tarea.titulo, tarea.completado]);
  }

  actualizar(tarea: any){
    let sql = 'UPDATE tareas SET titulo=?, completado=? WHERE id=?';
    return this.db.executeSql(sql, [tarea.titulo, tarea.completado, tarea.id]);
  }

  borrar(tarea: any){
    let sql = 'DELETE FROM tareas WHERE id=?';
    return this.db.executeSql(sql, [tarea.id]);
  }

}
