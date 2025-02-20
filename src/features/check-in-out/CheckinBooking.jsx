import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking.js';
import Spinner from '../../ui/Spinner.jsx';
import BookingDataBox from '../bookings/BookingDataBox.jsx';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { useCheckin } from './useCheckin.js';
import { useSettings } from '../settings/useSettings.js';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Регистрация бронирования #{bookingId}</Heading>
        {/*<ButtonText onClick={moveBack}>&larr; Назад</ButtonText>*/}
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast(add => !add);
              setConfirmPaid(false);
            }}
          >
            Хотите добавить завтрак за {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          Я подтверждаю, что {guests.fullName} оплатил полную сумму{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)} )`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Зарегестрировать бронирование #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Назад
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
