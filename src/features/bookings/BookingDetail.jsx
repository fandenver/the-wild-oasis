import styled from 'styled-components';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking.js';
import Spinner from '../../ui/Spinner.jsx';
import BookingDataBox from './BookingDataBox.jsx';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useCheckout } from '../check-in-out/useCheckout.js';
import Modal from '../../ui/Modal.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import { useDeleteBooking } from './useDeleteBooking.js';
import Empty from '../../ui/Empty.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="Бронирования" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Бронирование #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>
            {' '}
            {status === 'unconfirmed'
              ? 'не подтверждено'
              : status === 'checked-in'
                ? 'подтверждено'
                : status === 'checked-out'
                  ? 'оформлено'
                  : ''}
          </Tag>
        </HeadingGroup>
        {/*<ButtonText onClick={moveBack}>&larr; Назад</ButtonText>*/}
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Регистрация
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Оформление
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Удалить</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="бронирование"
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSuccess: () => navigate(-1),
                });
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Назад
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
