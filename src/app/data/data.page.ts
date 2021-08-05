import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'data.page.html',
  styleUrls: ['data.page.scss'],
})
export class DataPage {

  ratio = 1024;
  inputValue = null;
  inputSize = "";
  outputSize = "";
  outputValue = 0;
  outputString = "";
  sizeList = ["Byte", "KB", "MB", "GB"];

  constructor(public toastController: ToastController) {}

  public convert(){
    if (this.isValidInputValue() && this.isValidSize()){
      this.setOutputValue();
      this.setOutputString();
    }
    console.log(this.outputValue);
    console.log(this.outputValue.toString());
  }
  
  public clear(){
    this.inputValue = null;
    this.inputSize = "";
    this.outputSize = "";
    this.outputValue = 0;
    this.outputString = "";
  }

  private isValidInputValue(){
    if (this.inputValue <= 0 || this.inputValue == null){
      this.presentToast("Invalid input");
      return false;
    }
    return true;
  }

  private isValidSize(){
    if (this.inputSize == ""){
      this.presentToast("Your value must have a size!")
      return false;
    } else if (this.outputSize == ""){
      this.presentToast("You must choose an output size")
      return false;
    }
    return true;
  }

  private getExp(){
    let exp = this.sizeList.indexOf(this.outputSize) - this.sizeList.indexOf(this.inputSize);
    return exp;
  }

 private getFactorValue(){
    let exp = this.getExp();
    let factorValue = Math.pow(this.ratio, exp);
    return factorValue;
  }

  private setOutputValue(){
    let factorValue = this.getFactorValue();
    this.outputValue = this.inputValue / factorValue;
  }

  private setOutputString(){
    this.outputString = this.inputValue.toString() + " " + this.inputSize + "(s) = " + this.outputValue.toString() + " " + this.outputSize + "(s)";
  }

  private async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
