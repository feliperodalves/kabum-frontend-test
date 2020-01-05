import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, Filter, ProductList } from './styles';
import ProductCard from '../../components/ProductCard';

export default function Main() {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);

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
      setFilteredPeople(data);
    }
    loadPeople();
  }, []);

  useEffect(() => {
    const s = new RegExp(filter, 'i');
    setFilteredPeople(
      people.filter(
        person =>
          person.name.match(s) || person.id.match(s) || person.jobTitle.match(s)
      )
    );
  }, [filter, people]);

  const dispatch = useDispatch();

  function handleAddTocart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <Filter
        type="text"
        placeholder="Digite aqui para filtrar, por nome ou função"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ProductList>
        {filteredPeople.map(person => (
          <ProductCard
            key={person.id}
            amount={amount}
            person={person}
            handleAddTocart={handleAddTocart}
            markdown={filter}
          />
        ))}
      </ProductList>
    </Container>
  );
}
