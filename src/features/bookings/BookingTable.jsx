import { useBookings } from './useBookings.js';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner.jsx';
import Empty from '../../ui/Empty.jsx';
import BookingRow from './BookingRow.jsx';
import Pagination from '../../ui/Pagination.jsx';

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="Бронирования" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Домик</div>
          <div>Гость</div>
          <div>Даты</div>
          <div>Статус</div>
          <div style={{ fontSize: '1.4rem' }}>Сумма</div>
          <div>⚙️</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
