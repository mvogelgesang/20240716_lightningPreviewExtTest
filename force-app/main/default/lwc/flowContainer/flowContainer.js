import { LightningElement } from "lwc";

export default class FlowContainer extends LightningElement {
  outputVarValue = '';

  
  get inputVariables() {
    return [
      { name: "flowInputColor", type: "String", value: "#ff6600" },
      { name: "flowInputBoolean", type: "Boolean", value: false }
    ];
  }

  handleStatusChange(event) {
    if (event.detail.status === "FINISHED") {
      // Get the flow's output variables
      const outputVars = event.detail.outputVariables;
      for (const outputVar of outputVars) {
        if (outputVar.name==='outputColor'){
          this.outputVarValue = outputVar.value;
          break;
        }
      }
      
    }
  }

  
}
