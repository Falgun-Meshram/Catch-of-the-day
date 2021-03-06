import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddFishForm extends Component {

  createFish(e){
    e.preventDefault();
    console.log(`Gonna make some fish`);
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    }
    this.props.addFish(fish);
    this.fishForm.reset();
  }



  render(){
    return (
      <form ref={(e) => this.fishForm = e} className='fish-edit' onSubmit={(e) => {this.createFish(e)}}>
        <input ref={(input) => this.name = input} type="text" placeholder="Fish Name"/>
        <input ref={(input) => this.price = input} type="text" placeholder="Fish Price"/>
        <select ref={(input) => this.status = input} >
          <option value="available">Fresh</option>
          <option value="unavailbale">Sold Out</option>
        </select>
        <textarea ref={(input) => this.desc = input} type="text" placeholder="Fish desc"/>
        <input ref={(input) => this.image = input} type="text" placeholder="Fish Image"/>
        <button type="submit">+ Add Item</button>

      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired
}

export default AddFishForm;
