import { Actions, State } from 'easy-peasy';

import { store, StoreModel } from './store'
import { createTypedHooks } from "utils/easy-peasy-decorators";

import dottie from 'dottie'

import { ToStoreType } from 'utils/easy-peasy-decorators/types';
import { createLocalHooksFactory } from 'utils/easy-peasy-decorators/create-store';


export type getStoreState_ = () => State<StoreModel> & { [key: string]: any }
export type getStoreActions_ = () => Actions<StoreModel> & { [key: string]: any }

type StoreState = State<StoreModel>
type StoreActions = Actions<StoreModel>

type freeObj = { [key: string]: any }


//don't use in store models, use this.getStoreState instead to avoid circular-dependency
export const getStoreState = store.getState as getStoreState_
export const getStoreActions = store.getActions as getStoreActions_


const typedHooks = createTypedHooks<StoreModel>();

export const useEzActions = typedHooks.useStoreActionsLoose;
export const useEzDispatch = typedHooks.useStoreDispatch;
export const useEzState = typedHooks.useStoreStateLoose;

export const createLocalHooks = createLocalHooksFactory<StoreModel>(typedHooks)


/**
 * Hooks with dot notation
 */

type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
  ? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
  | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
  : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
  ? Rest extends Path<T[Key]>
  ? PathValue<T[Key], Rest>
  : never
  : never
  : P extends keyof T
  ? T[P]
  : never;


type useEzHook$_<T> = < P extends Path<T> = Path<{}>>(path: string & P) => PathValue<T, P>


export const useEzState$ = function (path) {
  const selectedState = useEzState(state => dottie.get(state, path as string))
  return selectedState// as PathValue<T, P>
} as useEzHook$_<StoreState>

export const useEzActions$ = function (path) {
  const selectedState = useEzActions(state => dottie.get(state, path as string))
  return selectedState// as PathValue<T, P>
} as useEzHook$_<StoreActions>



export const getStoreState$ = function (path) {
  return path ? dottie.get(store.getState(), path) : store.getState()
} as useEzHook$_<State<ToStoreType<StoreModel>>>;



export const getStoreActions$ = function (path) {
  return path ? dottie.get(store.getActions(), path) : store.getActions()
} as useEzHook$_<Actions<ToStoreType<StoreModel>>>;




/**
* No autocomplete
*/
export const getStoreStateLoose$ = function (path: string) {
  return path ? dottie.get(store.getState(), path) : store.getState()
}

/**
* No autocomplete
*/
export const getStoreActionsLoose$ = function (path) {
  return path ? dottie.get(store.getActions(), path) : store.getActions()
}

/**
* No autocomplete
*/
export const useEzStateLoose$ = function (path) {
  const selectedState = useEzState(state => dottie.get(state, path as string))
  return selectedState// as PathValue<T, P>
}

/**
* No autocomplete
*/
export const useEzActionsLoose$ = function (path) {
  const selectedState = useEzActions(state => dottie.get(state, path as string))
  return selectedState// as PathValue<T, P>
} 

// type useEzHook$_<T> = < P extends Path<T> = Path<{}>>(path:P)=>PathValue<T, P>
// export function useLocalStateFactory$<LocalState>(holderPath){

//   return function useLocalState$(localPath){
//     //@ts-ignore
//     const selectedState = useEzState$(state => dottie.get(state, [holderPath,localPath].join('.') ))
//     return selectedState// as PathValue<T, P>
//   } as useEzHook$_<LocalState>

// }  


// const useLocalState$ = useLocalStateFactory$<State<ToStoreType<ListModel>>>('')

// useLocalState$("")






interface createLocalTypedHooksReturn$<LocalModel extends object> {

  useLocalActions$: useEzHook$_<Actions<ToStoreType<LocalModel>>>
  useLocalState$: useEzHook$_<State<ToStoreType<LocalModel>>>
}

/**
 * Fonctionne mais pas au niveau 1
 */
export function createLocalHooksFactory$<StoreModel extends object>({ useEzState$, useEzActions$ }) {

  return function <LocalModel extends object>(holderPath): createLocalTypedHooksReturn$<LocalModel> {

    //const hooks = easyPeasy.createTypedHooks<any>();

    return {
      useLocalActions$: function (localPath) {
        //@ts-ignore
        const selectedState = useEzActions$([holderPath, localPath].join('.'))
        return selectedState// as PathValue<T, P>
      },
      useLocalState$: function (localPath) {
        //@ts-ignore
        const selectedState = useEzState$([holderPath, localPath].join('.'))
        return selectedState// as PathValue<T, P>
      }
    } as any;
  }
}

export const createLocalHooks$ = createLocalHooksFactory$<StoreModel>({ useEzState$, useEzActions$ })




  // export function createLocalHooksFactory<StoreModel extends object>(hooks){

  // return function createLocalHooks<LocalModel  extends object>(holderMapFn : HolderMapFn<StoreModel>): createLocalTypedHooksReturn<LocalModel> {

      //const hooks = easyPeasy.cre




// //    declare function get<T, P extends Path<T>>(obj:T, path: P): PathValue<T, P>;

// type fGet =  <T, P extends Path<T>>(obj:T, path: P)=> PathValue<T, P>;

// type fGetStoreModel =  < P extends Path<State<StoreModel>>>(path: P)=> PathValue<State<StoreModel>, P>;

// // export function useEzState$<Obj, PArgs extends string[]>(...path:PArgs): PathValue<Obj, Join<PArgs>>{
// //   return useEzState(state => dottie.get(state,path.join('.')))
// // }

// // export function useEzState$(...path:Array<any>):any{
// //   return useEzState(state => dottie.get(state,path.join('.')))
// // }
// const dotget: fGet = function (obj, path){
//   //@ts-ignore
//   return dottie.get(obj ,path)
// }

// dotget(store.getState(),"app.snackbar.message")






// type useEzState2_<T = undefined> = T extends undefined ? (< P extends Path<StoreState> = Path<{}>>(path:P)=>PathValue<StoreState, P>) : (<T, P extends Path<T> = Path<{}>>(path:P)=>PathValue<T, P>)

// type useEzStateAll = useEzState_<StoreState>
// type useEzStateApp = useEzState_<StoreState['app']>

// export function useEzState$<T = StoreState, P extends Path<T> = Path<{}>>(path:P):PathValue<T, P>{
//   const selectedState = useEzState(state => dottie.get(state,path as string))
//   //@ts-ignore
//   return selectedState// as PathValue<T, P>
// }





// // export function UseEzStateGen$<T = StoreState>():useEzState_<T>{
// //   return useEzState$ as useEzState_<T>
// // }

// const u = useEzState as useEzState_<State<ToStoreType<ListModel>>> //fonctionne

// // u("") 


// const u2 =  useEzState as useEzState2_<State<ToStoreType<ListModel>>>

// // u2("")

// // let ml:useEzState2_<StoreState['app']>
// // ml("")
// // get(store.getState(), "list.");





// type Join1<Args extends string[]> = `${Args[0]}.${Args[1]}`


// //type Join1<Arg extends string,Args extends string[]> = `${Arg}.${Args[0]}`


// type Join2<Args, Joined> = Join1<T> extends P extends `${infer Key}.${infer Rest}` ? : Join2<J






// const a = join("bibou","baba","bubu")

// type dfhd =  typeof  a 




// type Split<S extends string, separator extends string> = S extends  `${infer Key}${separator}${infer Rest}` ? `${Key} et ${Rest}` : 'non'
// type s1 = Split<"abc.def#ghi","#"> //=abc.def et ghi


// type PositiveNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
// type SplitArr<A extends any[]> = A[PositiveNumbers]

// type numberRest = Exclude<number,0>



// type arrTestType =  ["a","b","c","b"]
// type arr = SplitArr<arrTestType>



// type Join<Args extends string[]> = `${Nz0<Args>}${Nz<Args, 1>}${Nz<Args, 2>}${Nz<Args, 3>}${Nz<Args, 4>}` //${Nz<Args, 5>}${Nz<Args, 6>}${Nz<Args, 7>}${Nz<Args, 8>}${Nz<Args, 9>}${Nz<Args, 10>}`

// type Nz0<Args extends string[]> = Args[0] extends string ? `${Args[0]}` : ''
// type Nz<Args extends string[], i extends number> = Args[i] extends string ? `.${Args[i]}` : ''



// declare function join<Args extends string[]>(...args:Args):Join<Args>;
// declare function joinPath<Args extends string[]>(...args:Args):Join<Args>;

// join("bibou","baba","bubu");


//declare function joinGet<T, P extends Path<Join<PArgs>>  >(obj: T, ...args:PArgs): PathValue<T, Path<Join<PArgs>>>;


// function joinGet(obj,...args:string[]){
//   const path = join(...args) as 
//   return get(obj,path)
// }


//declare function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;

// type ArgsToPath<Args extends string[]> = Path<Join<Args>>

// type ArgsToPath<Join<Args>> = Path<T>

// joinGet()


//declare function joinGet<Arg extends string, Args extends string[]>(arg:Arg,...args:Args):Join<Args>

