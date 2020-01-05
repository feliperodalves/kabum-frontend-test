import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import ProductCard from '../../components/ProductCard';

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
        <ProductCard
          key={person.id}
          amount={amount}
          person={person}
          handleAddTocart={handleAddTocart}
        />
      ))}
    </ProductList>
  );
}
