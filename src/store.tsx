import { createStore, createTypedHooks } from 'easy-peasy';
import { app, app_ } from 'modules/app/app.store';
import { generator, generator_ } from 'modules/generator/generator.store';

interface StoreModel {
    app: app_;
    generator:generator_;
}


const storeModel: StoreModel = {
    app,
    generator
}

export const store = createStore<StoreModel>(storeModel);


const typedHooks = createTypedHooks<StoreModel>();

export const useEzActions = typedHooks.useStoreActions;
export const useEzDispatch = typedHooks.useStoreDispatch;
export const useEzState = typedHooks.useStoreState;