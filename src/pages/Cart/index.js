import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sum, person) => {
        return sum + person.price * person.amount;
      }, 0)
    )
  );
  const cart = useSelector(state =>
    state.cart.map(person => ({
      ...person,
      subtotal: formatPrice(person.price * person.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(person) {
    dispatch(CartActions.updateAmountRequest(person.id, person.amount + 1));
  }

  function decrement(person) {
    dispatch(CartActions.updateAmountRequest(person.id, person.amount - 1));
  }

  function handleFinish() {
    toast.info('Funcionalidade ainda não implementada');
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PROFISSIONAL</th>
            <th>HORAS</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(person => (
            <tr key={person.id}>
              <td>
                <Link to={`/Product/${person.id}`}>
                  <img src={person.image} alt={person.title} />
                </Link>
              </td>
              <td>
                <Link to={`/Product/${person.id}`}>
                  <strong>{person.name}</strong>
                  <p>{person.jobTitle}</p>
                  <span>
                    {person.priceFormatted}
                    <i>/hora</i>
                  </span>
                </Link>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#fc6b0f"
                      onClick={() => decrement(person)}
                    />
                  </button>
                  <input type="number" readOnly value={person.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#fc6b0f"
                      onClick={() => increment(person)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{person.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CartActions.removeFromCart(person.id))
                  }
                >
                  <MdDelete size={20} color="#fc6b0f" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button" onClick={() => handleFinish()}>
          Finalizar Pedido
        </button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
