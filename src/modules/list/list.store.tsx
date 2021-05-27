//import { Action, action, thunk, Thunk } from "easy-peasy";
//import { getStoreActions, getStoreState} from 'store/hooks';
import { EzModel } from 'store/base'
import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4040/api' : 'https://pedagome-bakery-backend.herokuapp.com/api',
    timeout: 5000,
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5IiwibmFtZSI6IlZpYnJleiBSdWdieSBhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.izolUSQodBdkuM25MHAhtV3uAMacLAPsxT9mh3pB7Hc` }
});

import { Model, Property, Thunk, Action } from "utils/easy-peasy-decorators";


@Model("list")
class ListModel extends EzModel {

    @Property()
    data/*:Array<any>*/ = [];

    @Property()
    isLoaded:boolean = false

    @Action()
    setData(payload/*:Array<any>*/) {
        this.data = payload
    }

    @Thunk()
    async handleRefresh() {

        const res = await instance.get('coupon').catch(console.error)
        if (res && res.data) this.setData(res.data)

        //this.getStoreActions().app.snackbar.show({ message: this.getStoreState().generator.form.name,severity:"warning" })
    }
}

export { ListModel }