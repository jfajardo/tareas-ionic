import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TareasServicioProvider } from '../../providers/tareas-servicio/tareas-servicio';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tareas: any = [];

  constructor(
    public navCtrl: NavController,
    public tareasServicio: TareasServicioProvider,
    public alertCtrl: AlertController,
    private statusBar: StatusBar
  ) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#488aff');
  }

  ionViewDidLoad(){
    this.obtenerTodasTareas();
  }

  obtenerTodasTareas(){
    this.tareasServicio.obtenerTodas().then(tareas => {
      console.log(tareas);
      this.tareas = tareas;
    }).catch( error => {
      console.error( error );
    });
  }

  abrirAlertaNuevaTarea(){
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'escribe el nombre de la tarea',
      inputs: [
        {
          name: 'titulo',
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
            tarea.completado = false;
            this.tareasServicio.crear(tarea)
            .then(response => {
              tarea['id']=response.insertId;
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

  actualizarTarea(tarea, index){
    tarea = Object.assign({}, tarea);
    tarea.completado = !tarea.completado;
    this.tareasServicio.actualizar(tarea)
    .then( response => {
      this.tareas[index] = tarea;
    })
    .catch( error => {
      console.error( error );
    })
  }

  borrarTarea(tarea: any, index){
    this.tareasServicio.borrar(tarea)
    .then(response => {
      console.log( response );
      this.tareas.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

}
