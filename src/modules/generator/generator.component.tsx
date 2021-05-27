import React from 'react';
import { useEzActions, useEzState } from 'store/hooks';

import { TextField, Grid, Button, Box } from "@material-ui/core";

//ajouter la validation (avec joi ?)
//Numéro de page auto
//Un loader
//Liste
//Tester les classes EZPZ
//Poster
//Login

function Form() {
  console.log("useEzState : ",typeof useEzState)
  const formState = useEzState(s => s.generator.form)
  const handleChange = useEzActions(a => a.generator.form.handleChange)
  const handleSubmit = useEzActions(a => a.generator.form.handleSubmit)
  
  return (
    <React.Fragment>



      <Grid item xs={12}>
        <TextField value={formState.coupons} id="coupons" onChange={handleChange} label="Nombre de coupons (multiple de 5): " fullWidth variant="outlined" />
      </Grid>

      <Grid item xs={12}>
        <TextField value={formState.name} id='name' onChange={handleChange} label="Nom du client: " fullWidth variant="outlined" />
      </Grid>

      {/* <Grid item xs={12}>
        <TextField value={formState.startFromPage} id="startFromPage" onChange={handleChange} label="Numéro de la page: " fullWidth variant="outlined" />
      </Grid> */}

      <Grid item xs={12}>
        <TextField value={formState.password} id='password' onChange={handleChange} label="Mot de passe: " type="password" fullWidth variant="outlined" />
      </Grid>

      <Grid item xs={12}>
        <Box textAlign='center'>
          <Button onClick={() => handleSubmit()} variant="contained" color="primary">Générer</Button>
        </Box>
      </Grid>


    </React.Fragment>
  )
}


export function Generator() {

  return (
    <Grid container spacing={3}  justify="center" alignItems="center" direction="column" style={{height:"100%"}}>
      <Grid container item spacing={5} xs={4}>
        <h1>Generateur de coupons</h1>
        <Form />
      </Grid>
    </Grid>

  )
}