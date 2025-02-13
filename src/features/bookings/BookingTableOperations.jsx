import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'Все' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: 'По дате (по убыванию)' },
          { value: 'startDate-asc', label: 'По дате (по возрастанию)' },
          {
            value: 'totalPrice-desc',
            label: 'По сумме (по убыванию)',
          },
          { value: 'totalPrice-asc', label: 'По сумме (по возрастанию)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
