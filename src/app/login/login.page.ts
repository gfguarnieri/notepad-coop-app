import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";
  name: string = "";
  nEmail: string = "";
  nPassword: string = "";
  rPassword: string = "";

  constructor(private alertController: AlertController) { }
  
  async login() {
    if(this.email.trim().length === 0 || this.password.trim().length === 0){
      return await this.showAlert("Verificar campos", "Preencha os campos corretamente")
    }
  }

  async subscribe(){
    if(this.nEmail.trim().length === 0 
      || this.nPassword.trim().length === 0
      || this.name.trim().length === 0
    ){
      return await this.showAlert("Verificar campos", "Preencha os campos corretamente")
    }
    if(this.nPassword !== this.rPassword){
      return await this.showAlert("Senhas diferentes", "Digite a mesma senha nos dois campos")
    } 
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        },
      ],
    });

    await alert.present();
  }

}
