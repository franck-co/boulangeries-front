import { action, Action } from "easy-peasy"

export interface app_ {
  //currentView: string
  snackbar: snackbar_;
}

type snackbarSeverity_ = "error" | "warning" | "info" | "success"

interface snackbarOptions_{
  severity?: snackbarSeverity_ ;
  message: string;
}

interface snackbar_ {
  message: string;
  severity: snackbarSeverity_;
  open:boolean;

 close:Action<snackbar_>;
 show:Action<snackbar_,snackbarOptions_>;
}

export const app: app_ = {
  snackbar: {
    open:false,
    severity: "info",
    message: "",
    close:action((state)=>{
      state.open = false
    }),
    show:action((state, {message, severity = "info"}:showParams)=>{
      Object.assign(state,{message, severity,open:true})
    })
  }
}

interface showParams {
  message:string
  severity?:snackbarSeverity_
}

