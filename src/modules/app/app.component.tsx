import React from 'react';


import { Generator } from "modules/generator/generator.component";
import {List } from "modules/list/list.component";
import { AppBar, Box, Grid, Snackbar, Tab, Tabs } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';

//import { useStoreActions,useStoreState } from 'easy-peasy';
import { createLocalHooks, createLocalHooks$,useEzActions,useEzState, useEzState$} from 'store/hooks';

import {app_} from './app.store'
const lh = createLocalHooks<app_>(µ=>µ.app)
const lh$ = createLocalHooks$<app_>("app")


export const App = () => {
    const [currentTabIndex, setTabIndex] = useState(0)

    return (
        <Box height="100%"  >
            <NavBar currentTabIndex={currentTabIndex} setTabIndex={setTabIndex} />
            <Switcher index={currentTabIndex} />
            <AppSnackbar/>
        </Box>
    )
}



//height="calc(100vh - 1000px);"

function NavBar({ currentTabIndex, setTabIndex }) {

    //const currentView = useEzState(s => s.app.currentView)

    return (


        <AppBar position="static">
            <Tabs value={currentTabIndex} onChange={(e, newTabIndex) => setTabIndex(newTabIndex)}>
                <Tab label="Générateur" />
                <Tab label="Liste" />
            </Tabs>
        </AppBar>


    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



function Switcher({ index }) {
    const TabPanel = [Generator,List][index]
    return <TabPanel />
}




function AppSnackbar(){

    const severity = useEzState$("app.snackbar.severity")
    
    const snackbarState = lh.useLocalState(s=>s.snackbar) //
    const severity$ = lh$.useLocalState$("snackbar.severity")

    const closeSnackbar = useEzActions(a => a.app.snackbar.close)
    
    // const snackbarState = useStoreState(s => s.app.snackbar)
    // const closeSnackbar = useStoreActions(s => s.app.snackbar.close)

    return(
    <Snackbar open={snackbarState.open} autoHideDuration={4500} onClose={()=>closeSnackbar()}>
        <Alert onClose={()=>closeSnackbar()} severity={severity$}>
          {snackbarState.message}
        </Alert>
      </Snackbar>)
}