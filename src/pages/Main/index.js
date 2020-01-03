import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Main() {
  const [people, setPeople] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;
      return sum;
    }, {})
  );

  useEffect(() => {
    async function loadPeople() {
      const response = await api.get('products');

      const data = response.data.map(person => ({
        ...person,
        priceFormatted: formatPrice(person.price),
      }));

      setPeople(data);
    }
    loadPeople();
  }, []);

  const dispatch = useDispatch();

  function handleAddTocart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {people.map(person => (
        <li key={person.id}>
          <img src={person.image} alt="Tênis" />
          <strong>{person.name}</strong>
          <p>{person.jobTitle}</p>
          <span>
            {person.priceFormatted}
            <i>/hora</i>
          </span>
          <button type="button" onClick={() => handleAddTocart(person.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[person.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
