import * as easyPeasy from "easy-peasy";
import { ToStoreType } from './types';
//import { metadataStorage } from "./metadata-storage";

export function createStore<T extends object = {} , C extends object = {}>(storeModel?:C) {

    const store = easyPeasy.createStore<any>(storeModel);
    return store as easyPeasy.Store<ToStoreType<T>>;
    
}

type freeObj =  {[key:string]:any}

interface createTypedHooksReturn<Model extends object> {
    useStoreActions: <Result>(
        mapActions: (actions: easyPeasy.Actions<ToStoreType<Model>>) => Result,
    ) => Result;
    useStoreActionsLoose: <Result>(
        mapActions: (actions: easyPeasy.Actions<ToStoreType<Model>> & freeObj) => Result,
    ) => Result;
    useStoreState: <Result>(
        mapState: (state: ToStoreType<Model>) => Result,
        dependencies?: any[],
    ) => Result;
    useStoreStateLoose: <Result>(
        mapState: (state: ToStoreType<Model> & freeObj) => Result,
        dependencies?: any[],
    ) => Result;
    useStoreDispatch: () => easyPeasy.Dispatch<ToStoreType<Model>>;

}

export function createTypedHooks<Model extends object>(): createTypedHooksReturn<Model> {
    
    const hooks = easyPeasy.createTypedHooks<any>();

    return {
        useStoreActions: hooks.useStoreActions,
        useStoreActionsLoose: hooks.useStoreActions,
        useStoreState: hooks.useStoreState,
        useStoreStateLoose: hooks.useStoreState,
        useStoreDispatch:hooks.useStoreDispatch
    } as any;
}



// interface createLocalTypedHooksReturn<LocalModel extends object> {
//     useStoreActions: <Result>(
//         mapActions: (actions: easyPeasy.Actions<ToStoreType<LocalModel>>) => Result,
//     ) => Result;
//     useStoreActionsLoose: <Result>(
//         mapActions: (actions: easyPeasy.Actions<ToStoreType<LocalModel>> & freeObj) => Result,
//     ) => Result;
//     useStoreState: <Result>(
//         mapState: (state: ToStoreType<LocalModel>) => Result,
//         dependencies?: any[],
//     ) => Result;
//     useStoreStateLoose: <Result>(
//         mapState: (state: ToStoreType<LocalModel> & freeObj) => Result,
//         dependencies?: any[],
//     ) => Result;
//     useStoreDispatch: () => easyPeasy.Dispatch<ToStoreType<LocalModel>>;

// }


// type HolderMapFn<StoreModel extends object> = (store: ToStoreType<StoreModel>) => object

// export function createLocalHooks<StoreModel extends object, LocalModel  extends object>(holderMapFn : HolderMapFn<StoreModel>): createLocalTypedHooksReturn<LocalModel> {
    
//     const hooks = easyPeasy.createTypedHooks<any>();

//     return {
//         useStoreActions: (localMapFn)=> hooks.useStoreActions(store  =>localMapFn(holderMapFn(store as ToStoreType<StoreModel>))),
//         useStoreActionsLoose: hooks.useStoreActions,
//         useStoreState: hooks.useStoreState,
//         useStoreStateLoose: hooks.useStoreState,
//         useStoreDispatch:hooks.useStoreDispatch
//     } as any;
// }




interface createLocalTypedHooksReturn<LocalModel extends object> {
    useLocalActions: <Result>(
        mapActions: (actions: easyPeasy.Actions<ToStoreType<LocalModel>>) => Result,
    ) => Result;
    useLocalActionsLoose: <Result>(
        mapActions: (actions: easyPeasy.Actions<ToStoreType<LocalModel>> & freeObj) => Result,
    ) => Result;
    useLocalState: <Result>(
        mapState?: (state: ToStoreType<LocalModel>) => Result,
        dependencies?: any[],
    ) => Result;
    useLocalStateLoose: <Result>(
        mapState: (state: ToStoreType<LocalModel> & freeObj) => Result,
        dependencies?: any[],
    ) => Result;

}


type HolderMapFn<StoreModel extends object> = (store: ToStoreType<StoreModel>) => object;



export function createLocalHooksFactory<StoreModel extends object>(hooks){

return function createLocalHooks<LocalModel  extends object>(holderMapFn : HolderMapFn<StoreModel>): createLocalTypedHooksReturn<LocalModel> {
    
    //const hooks = easyPeasy.createTypedHooks<any>();

    return {
        useLocalActions: (localMapFn = (S=>S))=> hooks.useStoreActions(store  =>localMapFn(holderMapFn(store as ToStoreType<StoreModel>))),
        useLocalActionsLoose: (localMapFn = S=>S)=> hooks.useStoreActions(store  =>localMapFn(holderMapFn(store as ToStoreType<StoreModel>))),
        useLocalState: (localMapFn = S=>S)=> hooks.useStoreState(store  =>localMapFn(holderMapFn(store as ToStoreType<StoreModel>))),
        useLocalStateLoose: (localMapFn = S=>S)=> hooks.useStoreState(store  =>localMapFn(holderMapFn(store as ToStoreType<StoreModel>))),
    } as any;
}
}

//Peut être faire createLocalHooks et createLocalHooksLoose pour que la holderMapFn soit puisse être loose

