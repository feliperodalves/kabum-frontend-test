import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MdAddShoppingCart } from 'react-icons/md';
import { List, Price } from './styles';

export default function ProductCard({ person, handleAddTocart, amount }) {
  const { id, image, name, jobTitle, priceFormatted } = person;
  return (
    <List>
      <Link to={`/Product/${id}`}>
        <img src={image} alt="Tênis" />
        <strong>{name}</strong>
        <p>{jobTitle}</p>
        <Price>
          {priceFormatted}
          <i>/hora</i>
        </Price>
      </Link>
      <button type="button" onClick={() => handleAddTocart(id)}>
        <div>
          <MdAddShoppingCart size={16} color="#fff" />
          {amount[id] || 0}
        </div>
        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </List>
  );
}

ProductCard.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    priceFormatted: PropTypes.string.isRequired,
  }).isRequired,
  handleAddTocart: PropTypes.func.isRequired,
  amount: PropTypes.objectOf(Number).isRequired,
};
