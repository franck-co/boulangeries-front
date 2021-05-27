import {store} from 'store';
import dottie from 'dottie';
import { action } from 'easy-peasy';
import { initialState } from 'store';

export function getActions(){
    return store.getActions()
  }
  
  export function getState(){
    return store.getState()
  }
  
  export function getState$(...path){
   
    const computedPath = dotPath(...path)
    return computedPath ? dottie.get(store.getState(),computedPath) : store.getState()
  }
  
  export function getActions$(...path){
  
   const computedPath = dotPath(...path)
    return computedPath ? dottie.get(store.getActions(),computedPath) : store.getActions()
  }

  export function dotPath(...path){
  
    const computedPath = path.reduce((acc,part)=>{
      
      if(typeof part === 'number' && part < 0){
        const parentLevel = -part
        const arr = acc.split('.').filter(item=>item) //split the acc path on dots and remove blanks
  
        if(arr.length < parentLevel) throw new Error('parent asked (' + part + ') is too high for ' + arr.join('.') )
        arr.splice(-1,parentLevel)
        acc = arr.join(".")
    
        return acc
      }else if(typeof part === 'string'){
  
        return [acc,part].filter(item=>item).join(".")
      }else{
        throw new Error("Invalid store path provided : " + path)
      }
  
    },'')
   
    return computedPath
  }


  export function dotGet(obj,...path) {
    return dottie.get(obj,dotPath(...path))
  }

  export function resetAction(...path){
    return action(state=>state = dotGet(initialState,...path))
  }


  /*
  export function dialogEvent(mapFn,payload){
  return {mapFn,payload}
}*/

/**@param {String} path 
 * @param payload
*/

/*export function dialogEvent$(path,payload){
    const mapFn = actions => dottie.get(actions,path)
    return {mapFn,payload}
  }  */
  
    