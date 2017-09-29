import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { formatPrice } from '../helpers';

class Fish extends Component {
  render() {
    const { details } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out';
    return(
      <li className="menu-fish">
        <img src={this.props.details.image} alt={this.props.details.image}/>
        <h3 className="fish-name">
          {this.props.details.name}
          <span className="price">{formatPrice(this.props.details.price)}</span>
        </h3>
        <p>{this.props.details.desc}</p>
        <button disabled={!isAvailable} onClick={() => { this.props.addToOrder(this.props.index) }}>
           {buttonText}
         </button>

      </li>
    );
  }
}

Fish.propTypes = {
  details: PropTypes.func.isRequired,
  index: PropTypes.func.isRequired,
  addToOrder: PropTypes.func.isRequired,
}

export default Fish;
