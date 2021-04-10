import React from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pedagome-bakery-backend.herokuapp.com/api',
  timeout: 5000,
  headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5IiwibmFtZSI6IlZpYnJleiBSdWdieSBhZG1pbiIsImlhdCI6MTUxNjIzOTAyMn0.izolUSQodBdkuM25MHAhtV3uAMacLAPsxT9mh3pB7Hc` }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      coupons: '5', name: 'tmpCustomer', startFromPage: '0'   };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, key) {
    const newState = {};
    newState[key] =  event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password != 'pedagome') {
      alert('bad password'); return;
    }
    instance.post( 
      '/coupon/generate',
      this.state,
      {
        responseType: 'blob',
      }
    )
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'coupons.zip');
      document.body.appendChild(link);
      link.click();
    })
    .catch(console.log);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nombre de coupons (multiple de 5):
          <input value={this.state.coupons} onChange={(e) => this.handleChange(e, 'coupons')} />
        </label>
          <br/>
        <label>
          Nom du client
          <input value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
        </label>
        <br/>
        <label>
          Numéro de la page:
          <input value={this.state.startFromPage} onChange={(e) => this.handleChange(e, 'startFromPage')} />
        </label>
        <br/>
        <label>
          password:
          <input value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} />
        </label>
        <br/>
        <input type="submit" value="Créer coupons" />
      </form>
    );
  }
}

export default Form;