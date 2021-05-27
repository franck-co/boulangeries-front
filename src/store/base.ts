import { Action, Thunk } from "utils/easy-peasy-decorators";
import { EzModelBase } from "utils/easy-peasy-decorators/base-class";
import { getStoreActions_, getStoreState_ } from "./hooks";
import {initialState} from './store'

//do not reference in store/index !
export abstract class EzModel extends EzModelBase {

    protected getStoreActions:getStoreActions_ = (()=>{}) as getStoreActions_ 
    protected getStoreState:getStoreState_ = (()=>{}) as getStoreState_

    @Action()
    setStateFn(mapFn){
        mapFn(this);
    }

    @Thunk()
    resetInitial(mapFn){
       this.setStateFn(s=>{
           Object.assign(s,mapFn(initialState))
       })
    }

}



