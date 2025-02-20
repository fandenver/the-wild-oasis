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
          { value: 'checked-out', label: 'Оформлено' },
          { value: 'checked-in', label: 'Подтверждено' },
          { value: 'unconfirmed', label: 'Не подтверждено' },
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
