import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { Container } from './styles';

export default function Product({ match }) {
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;

  const amount = useSelector(state =>
    state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;
      return sum;
    }, {})
  );

  const dispatch = useDispatch();

  function handleAddTocart() {
    dispatch(CartActions.addToCartRequest(id));
  }

  useEffect(() => {
    async function loadPerson() {
      const { data } = await api.get(`products/${id}`);

      setPerson({ ...data, priceFormatted: formatPrice(data.price) });
      setLoading(false);
    }

    loadPerson();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <div>Aguarde...</div>
      ) : (
        <section>
          <img src={person.image} alt="avatar" />
          <div>
            <span>Nome:</span>
            <p>{person.name}</p>
            <span>Função:</span>
            <p>{person.jobTitle}</p>
            <span>Departamento:</span>
            <p>{person.department}</p>
            <span>Área de atuação:</span>
            <p>{person.jobArea}</p>
            <span>Preço / hora:</span>
            <p>{person.priceFormatted}</p>
            <button type="button" onClick={() => handleAddTocart()}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </div>
        </section>
      )}
    </Container>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
