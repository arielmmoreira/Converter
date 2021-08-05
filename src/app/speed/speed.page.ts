import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.page.html',
  styleUrls: ['./speed.page.scss'],
})
export class SpeedPage {

  inputSpeed = null;
  inputUnit = "";
  outputUnit = "";
  outputSpeed = 0;
  outpuString = "";

  constructor(public toastController: ToastController) { 
    
  }

  convert(){
    if (this.isValidInputSpeed() && this.isValidUnit()){
      if (this.inputUnit == "m/s"){
        this.metersToScale(this.outputUnit);
      } else if (this.inputUnit == "km/h"){
        this.kilometersToScale(this.outputUnit);
      } else if (this.inputUnit == "mph/h"){
        this.milesToScale(this.outputUnit);
      }
      this.setOutputString();
    }
  }

  clear(){
    this.inputSpeed = null;
    this.inputUnit = "";
    this.outputUnit = "";
    this.outputSpeed = 0;
    this.outputUnit = "";
  }

  private metersToScale(unit){
    if (unit == "km/h"){
      this.outputSpeed = this.inputSpeed * 3.6;
    } else if (unit == "mph/h"){
      this.outputSpeed = this.inputSpeed * 2.237;
    }
  }

  private kilometersToScale(unit){
    if (unit == "mph/h"){
      this.outputSpeed = this.inputSpeed / 1.609;
    } else if (unit == "m/s"){
      this.outputSpeed = this.inputSpeed / 3.6;
    }
  }

  private milesToScale(unit){
    if (unit == "m/s"){
      this.outputSpeed = this.inputSpeed / 2.237;
    } else if (unit == "km/h"){
      this.outputSpeed = this.inputSpeed * 1.609;
    }
  }

  private isValidInputSpeed(){
    if (this.inputSpeed == null || this.inputSpeed <= 0){
      this.presentToast("Invalid input");
      return false;
    }
    return true;
  }

  private isValidUnit(){
    if (this.inputUnit == ""){
      this.presentToast("Your speed must have an unit");
      return false;
    } else if (this.outputUnit == ""){
      this.presentToast("You must choose an output unit");
      return false;
    }
    return true;
  }

  private setOutputString(){
    this.outpuString = this.inputSpeed.toString() + this.inputUnit + " = " + this.outputSpeed.toFixed(1).toString() + this.outputUnit;
  }

  private async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
