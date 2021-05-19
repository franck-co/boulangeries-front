import React from 'react';
import { useEzState } from 'store';

import { Generator } from "modules/generator/generator.component";

export const App = ()=>{

    return(
        <React.Fragment>
            <NavBar/>
            < Generator/>
        </React.Fragment>
    )
}



function NavBar(){

    const currentView = useEzState(s=>s.app.currentView)

    return(
        <div>View : {currentView}</div>
    )
}