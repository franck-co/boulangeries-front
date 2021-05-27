
export  * from './hooks'
export * from './store'


//!Pas de "export * from './base'"
//
//Il faut importer la base séparément depuis les models car sinon, on va require aussi les hooks qui vont require le store qui est construit a partir de l'applelant(les models)
//import { EzModel } from 'store/base'