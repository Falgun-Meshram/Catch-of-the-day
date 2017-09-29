import React, { Component } from 'react';

import {getFunName} from '../helpers';

class StorePicker extends React.Component {

  goToStore(e) {
    e.preventDefault();
    // console.log('This is the event' + JSON.stringify(e));
    console.log('You changed the URL');
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
    <form action="" className="store-selector" onSubmit={(e)=>{ this.goToStore(e);}}>
      <h2>Select a Store</h2>
      <input type="text" required placeholder="Enter Store Name" defaultValue = {getFunName()} ref={(input) => {this.storeInput = input}} />
      <button type="Submit">Visit the store</button>
    </form>

    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object,
};

export default StorePicker;
