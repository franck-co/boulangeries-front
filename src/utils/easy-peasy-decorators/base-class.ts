import { metaDataStoragePool } from "./metadata-storage";


export abstract class EzModelBase {

    static __symbol?

    static get obj(){
        const metaDataStorage = metaDataStoragePool.getMetadataStorage(this.__symbol) 
        return metaDataStorage.buildModel();
    }

    static get objWithName(){
        const metaDataStorage = metaDataStoragePool.getMetadataStorage(this.__symbol) 
        return metaDataStorage.buildModel(true);
    }

}