import React, { Component } from 'react';
import PropTypes from 'prop-types';


import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends Component {

  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      uid: null,
      owner: null,
    }

  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  logout(){
    base.unauth();
    this.setState({ uid: null })
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);

    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid,
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid,
      })
    });
  }

  handleChange(e, key){
    const fish = this.props.fishes[key];
    const updatedFish = {...fish,
      [e.target.name]: e.target.value,
    };
    console.log(updatedFish);
    this.props.updateFish(key,updatedFish);
  }

  renderInventory(key){
    const fish = this.props.fishes[key];
    return(
      <div className="fish-edit" key={key}>

        <input type="text" name="name" onChange={(e) => this.handleChange(e, key)} value={fish.name} placeholder="Fish Name" />
        <input type="text" name="price"onChange={(e) => this.handleChange(e, key)} value={fish.price} placeholder="Fish Price" />
        <select type="text" name="status"onChange={(e) => this.handleChange(e, key)} value={fish.status} placeholder="Fish Status" >
            <option value="available">Fresh !</option>
            <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc"onChange={(e) => this.handleChange(e, key)} value={fish.desc} placeholder="Fish Desc" />
        <input type="text" name="image"onChange={(e) => this.handleChange(e, key)} value={fish.image} placeholder="Fish Image" />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>

      </div>
    )
  }

  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to Manage your Store</p>
        <button onClick={()=> this.authenticate('facebook')} className="facebook">
        Login with Facebook
        </button>
        <button onClick={()=> this.authenticate('github')} className="github">
        Login with GitHub
        </button>
      </nav>
    )
  }

  render(){

    const logout = <button onClick={this.logout}>Log Out</button>;

    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return <div>Sorry but you aren't the owner of the site</div>
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm  addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
    </div>
    )
  }
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired,
}

export default Inventory;
