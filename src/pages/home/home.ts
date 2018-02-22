import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TareasServicioProvider } from '../../providers/tareas-servicio/tareas-servicio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tareas: any[] = [];

  constructor(
    public navCtrl: NavController,
    public tareasServicio: TareasServicioProvider,
    public alertCtrl: AlertController
  ) {

  }

  obtenerTodasTareas(){
    this.tareasServicio.obtenerTodas()
    .then(tareas => {
      this.tareas = tareas;
    })
    .catch( error => {
      console.error( error );
    });
  }

  abrirAlertaNuevaTarea(){
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva tarea.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (tarea)=>{
            tarea.completada = false;
            this.tareasServicio.crear(tarea)
            .then(response => {
              this.tareas.unshift(tarea);
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }
}
