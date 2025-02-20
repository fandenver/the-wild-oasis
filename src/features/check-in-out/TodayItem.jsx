import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Tag from '../../ui/Tag.jsx';
import { Flag } from '../../ui/Flag.jsx';
import Button from '../../ui/Button.jsx';
import CheckoutButton from './CheckoutButton.jsx';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 12rem 3rem 1fr 6rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Прибывающий</Tag>}
      {status === 'checked-in' && <Tag type="blue">Отбывающий</Tag>}

      <Flag src={guests.countryFlag} alt={`Флаг ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} ночей</div>

      {status === 'unconfirmed' && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Регистрация
        </Button>
      )}

      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
