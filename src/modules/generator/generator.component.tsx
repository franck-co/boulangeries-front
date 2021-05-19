import React from 'react';
import { useEzActions, useEzState } from 'store';


//ajouter la validation (avec joi ?)
//La présentation
//Numéro de page auto
//Un loader
//Liste
//Tester les classes EZPZ
//Poster
//Login

function Form() {

  const formState = useEzState(s=>s.generator.form)
  const handleChange = useEzActions(a=>a.generator.form.handleChange)
  const handleSubmit = useEzActions(a=>a.generator.form.handleSubmit)

  return (
    <React.Fragment>

      <form onSubmit={e=>handleSubmit(e)}>

        <div className="form-group">
          <input value={formState.coupons} id="coupons"  onChange={handleChange}/>
          <label htmlFor="coupons" >Nombre de coupons (multiple de 5): </label>
        </div>

        <div className="form-group">
          <input value={formState.name} id='name' onChange={handleChange} />
          <label htmlFor="name" >Nom du client: </label>
        </div>

        <div className="form-group">
          <input value={formState.startFromPage} id="startFromPage" onChange={handleChange} />
          <label htmlFor="startFromPage" >Numéro de la page: </label>
        </div>

        <div className="form-group">
          <input value={formState.password} id='password' onChange={handleChange} />
          <label htmlFor="password" >password: </label>
        </div>

        <br />
        <input className="btn btn-primary" type="submit" value="Créer coupons" />
      </form>
    </React.Fragment>
  )
}


export function Generator() {

  return (
    <React.Fragment>
      <h1>Generateur de coupons</h1>
      <Form />
    </React.Fragment>
  )
}