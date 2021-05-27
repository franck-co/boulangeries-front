





//import { createStore, createTypedHooks } from 'easy-peasy';

import * as EasyPeasy from 'easy-peasy';
import { app, app_ } from 'modules/app/app.store';
import { generator, generator_ } from 'modules/generator/generator.store';
import { ListModel } from "modules/list/list.store";

import {cloneDeep} from 'lodash' 

export interface StoreModel {
        list:ListModel;
        app: app_;
        generator:generator_;
}

export const storeModel = {
    app,
    generator,
    list:ListModel.obj
}


export const store = EasyPeasy.createStore<StoreModel>(storeModel);
export const initialState = cloneDeep(store.getState());
