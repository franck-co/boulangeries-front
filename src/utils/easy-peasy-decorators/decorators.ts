import { MetadataStorage, metaDataStoragePool } from "./metadata-storage";
import { TargetResolver } from "easy-peasy";
import { ToStoreType } from "./types";
//import any = jasmine.any;


function metadataStorageExec(proto,mapperFn:(metadataStorage:MetadataStorage)=>void){
    const protoExt = proto as typeof proto & any
        let symbol = protoExt.constructor.__symbol
        let metadataStorage

        //Ajout si besoin d'un symbol à l'object constructor
        //Les Decorateurs sont executés d'abord pour les properties puis pour la classe
        if(!symbol){
            symbol = Symbol(proto.constructor.name)
            metadataStorage = metaDataStoragePool.createMetadataStorage(symbol)
            protoExt.constructor.__symbol = symbol
        }else{
            console.log("symbo ",symbol,"trouvé !")
            metadataStorage = metaDataStoragePool.getMetadataStorage(symbol)
        }

        mapperFn(metadataStorage)
}


export function Model(modelName: string = 'model') {

    console.log('Class Decorator factory')

    return <T extends { new (...args: any[]): {} }>(ctor: T) => {
        
        const ctorExt = ctor as typeof ctor & any
        const symbol = ctorExt.__symbol
       
        const metadataStorage = metaDataStoragePool.getMetadataStorage(symbol)
        metadataStorage.addModelMetadata({ ctor: ctor, modelName });

        // Object.defineProperty(ctorExt,"obj",{
        //     get:function(){
        //         const metaDataStorage = metaDataStoragePool.getMetadataStorage(this.__symbol) 
        //         return metaDataStorage.buildModel();
        //     }
        // })
    };
}

export function Property() {
    return ((...[proto, fieldName]: Parameters<PropertyDecorator>) => {
        // console.log("PropertyDecorator proto : ",proto)
        metadataStorageExec(proto,metadataStorage=>metadataStorage.addPropertyMetadata({ ctor: proto, fieldName }))
    }) as PropertyDecorator ;
}

export function Child() {

    return ((...[proto, fieldName]: Parameters<PropertyDecorator>) => {
        // console.log("PropertyDecorator proto : ",proto)
        metadataStorageExec(proto,metadataStorage=>metadataStorage.addPropertyMetadata({ ctor: proto, fieldName }))
    }) as PropertyDecorator ;
}

export function Action<T>() {
    return ((...[ctor, fieldName, { value }]: Parameters<MethodDecorator>) => {
        // console.log("MethodDecorator proto : ",ctor)
        metadataStorageExec(ctor,metadataStorage=>metadataStorage.addActionMetadata({ ctor: ctor, fieldName, handler: value }))
    }) as MethodDecorator
}

export function Computed() {
    return ((...[ctor, fieldName, { value, get }]: Parameters<MethodDecorator>) => {
        metadataStorageExec(ctor,metadataStorage=>metadataStorage.addComputedMetadata({ ctor: ctor, fieldName, handler: value || get }))
    }) as MethodDecorator
}

export function Thunk() {
    return ((...[ctor, fieldName, { value, get }]: Parameters<MethodDecorator>) => {
        // console.log("MethodDecorator proto : ",ctor)
        metadataStorageExec(ctor,metadataStorage=>metadataStorage.addThunkMetadata({ ctor: ctor, fieldName, handler: value }))
    }) as MethodDecorator
}

export function Listener<Model extends object, StoreModel extends object = {}>(
    actionFn: TargetResolver<ToStoreType<Model>, ToStoreType<StoreModel>>,
) {
    return ((...[ctor, fieldName, { value, get }]: Parameters<MethodDecorator>) => {
        metadataStorageExec(ctor,metadataStorage=>metadataStorage.addListenerMetadata({ handler: value, fieldName, ctor: ctor, actionFn }))
    }) as MethodDecorator
}

