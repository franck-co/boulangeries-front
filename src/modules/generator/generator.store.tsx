import { Action, action, thunk, Thunk } from "easy-peasy";

import axios from 'axios';
import { getStoreActions_ } from "store";
import { initialState} from "store/store"

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4040/api' : 'https://pedagome-bakery-backend.herokuapp.com/api',
    timeout: 30 * 1000,
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5IiwibmFtZSI6IlZpYnJleiBSdWdieSBhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.izolUSQodBdkuM25MHAhtV3uAMacLAPsxT9mh3pB7Hc` }
});


interface base_{
    reset:Action<form_>;
}
interface form_ extends base_{
    coupons: string;
    name: string;
    // startFromPage: string;
    password?: string;

    handleChange: Action<form_, any>;
    handleSubmit: Thunk<form_>;
}

export interface generator_ {
    form: form_
}

export const generator: generator_ = {
    form: {
        coupons: '20',
        name: '',
        // startFromPage: '420',

        reset: action((state) => {
          //console.log(initialState)
          Object.assign(state,initialState.generator.form)
        }),

        handleChange: action((state, event) => {
            state[event.target.id] = event.target.value
        }),

        handleSubmit: thunk(async (actions, _, { getState,getStoreActions }) => {
            const gta = getStoreActions as getStoreActions_
            
            const state = getState()

           
            if (state.password != 'levure') {
                gta().app.snackbar.show({message:"Mot de passe incorrect",severity:"warning"});  
                return;
            }


            if (!state.name) {
                gta().app.snackbar.show({message:"Nom du client manquant",severity:"warning"});  
                return;
            }

            const nb: number = parseInt(state.coupons,10)
            if(isNaN(nb) || nb <=0 || (nb % 5)){
                gta().app.snackbar.show({message:"Le nombre de coupons doit être un multiple de 5",severity:"warning"});
                return;
            }

            try {

                gta().app.snackbar.show({message:"Démarrage ...",severity:"info"})
                const res = await instance.post('/coupon/generate',{ coupons:state.coupons, name:state.name},
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

                gta().app.snackbar.show({message:"coupons générés !",severity:"success"})

                actions.reset()
                

            } catch (err) {
                console.log(err)
                gta().app.snackbar.show({message:"Une erreur est survenue (voir console) !",severity:"error"})
                
            }
        })

    }
}
    