import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
})
export class TemperaturePage{

  inputTemp = null;
  inputScale = "";
  outputScale = "";
  outputTemp =  0;
  outputString = "";
    
  constructor(public toastController: ToastController) {
    
   }

   private isValidScale(){
    if (this.inputScale == ""){
      this.presentToast("Your value must have a scale!")
      return false;
    } else if (this.outputScale == ""){
      this.presentToast("You must choose an output scale")
      return false;
    } else if (this.inputScale == this.outputScale){
      this.presentToast("Scales must be different");
      return false;
    }
    return true;
   }

   private isValidInputTemp(){
    if (this.inputTemp == null){
      this.presentToast("Invalid input");
      return false;
    }
    return true;
   }

  private celsiusToScale(scale) {
    if (scale == "F") {
      this.outputTemp = (this.inputTemp * 1.8) + 32;
    } else if (scale == 'K'){
      this.outputTemp = this.outputTemp = this.inputTemp + 273;
    } else {
      this.presentToast("Scales must be different!");
    }
  }

  private kelvinToScale(scale){
    if (scale == "C"){
      this.outputTemp = this.inputTemp - 273;
    } else if (scale == "F"){
      this.outputTemp = (this.inputTemp - 273) * 1.8 + 32;
    } else {
      this.presentToast("Scales must be different!");
    }
  } 
  
  private farenheitToScale(scale){
    if (scale == "C"){
      this.outputTemp = (this.inputTemp - 32) * (5 / 9);
    } else if (scale == "K"){
      this.outputTemp = (this.inputTemp - 32) * (5 / 9) + 273;
    } else {
      this.presentToast("Scales must be different!");
    }
  }

  private setOutputString(){
    let input, output;
    if (this.inputScale == "C" || this.inputScale == "F"){
      input = "°" + this.inputScale
    } else {
      input = this.outputScale;
    }

    if (this.outputScale == "C" || this.inputScale == "F"){
      output = "°" + this.outputScale;
    } else {
      output = this.outputScale;
    }  
    this.outputString = this.inputTemp.toString() + "" + input +  " = " + this.outputTemp.toFixed(1).toString() + output;
  }

  public convert(){
    if (this.isValidInputTemp() && this.isValidScale()){
      if (this.inputScale == "C"){
        this.celsiusToScale(this.outputScale);
      } else if (this.inputScale == "F"){
        this.farenheitToScale(this.outputScale);
      } else if (this.inputScale == "K"){
        this.kelvinToScale(this.outputScale);
      }
      this.setOutputString();
    }
  }

  public clear(){
    this.inputTemp = null;
    this.inputScale = "";
    this.outputScale = "";
    this.outputTemp = 0;
    this.outputString = "";
  }

  private async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
