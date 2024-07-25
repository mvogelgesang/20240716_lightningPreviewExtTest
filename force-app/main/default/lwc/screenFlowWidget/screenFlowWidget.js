import { LightningElement, api } from "lwc";
import {FlowAttributeChangeEvent} from 'lightning/flowSupport';


export default class ScreenFlowWidget extends LightningElement {
  @api inputColor;
  @api inputBoolean;
  @api inputNumber;

  valSetInJS = "Hello";


  @api
  get outputColor() {
    let newColor = this.inputColor.replace("#", "");
    if (typeof this.inputNumber === "number") {
      let inputColorHex = parseInt(newColor, 16);
      newColor = (this.inputNumber + inputColorHex).toString(16);
      this.template.querySelector(".flowWidgetSelector").setAttribute("style", "background-color: #" + newColor + ";");
    }
    this.dispatchEvent(new FlowAttributeChangeEvent("outputColor", newColor))

    return newColor;
  }

  
}
