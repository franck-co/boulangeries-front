import { Action, action, thunk, Thunk } from "easy-peasy";

import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://pedagome-bakery-backend.herokuapp.com/api',
    timeout: 5000,
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5IiwibmFtZSI6IlZpYnJleiBSdWdieSBhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.izolUSQodBdkuM25MHAhtV3uAMacLAPsxT9mh3pB7Hc` }
});



interface form_ {
    coupons: string;
    name: string;
    startFromPage: string;
    password?: string;

    handleChange: Action<form_, any>
    handleSubmit: Thunk<form_, any>
}

export interface generator_ {
    form: form_
}

export const generator: generator_ = {
    form: {
        coupons: '20',
        name: 'tmpCustomer',
        startFromPage: '0',

        handleChange: action((state, event) => {
            state[event.target.id] = event.target.value
        }),

        handleSubmit: thunk(async (actions, event, { getState }) => {
            const state = getState()

            event.preventDefault();
            if (state.password != 'pedagome') {
                alert('bad password'); return;
            }

            try {

                const res = await instance.post('/coupon/generate', state,
                    {
                        responseType: 'blob',
                    }
                )


                //Create fake download link and click it
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'coupons.zip');
                document.body.appendChild(link);
                link.click();


            } catch (err) {
                console.log(err)
            }
        })

    }
}
    