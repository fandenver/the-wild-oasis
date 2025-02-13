import TableOperations from '../../ui/TableOperations.jsx';
import Filter from '../../ui/Filter.jsx';
import SortBy from '../../ui/SortBy.jsx';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'Все' },
          { value: 'no-discount', label: 'Без скидки' },
          { value: 'with-discount', label: 'Со скидкой' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'По названию (А-Я)' },
          { value: 'name-desc', label: 'По названию (Я-А)' },
          { value: 'regularPrice-asc', label: 'По цене (по возрастанию)' },
          { value: 'regularPrice-desc', label: 'По цене (по убыванию)' },
          {
            value: 'maxCapacity-asc',
            label: 'По вместимости (по возрастанию)',
          },
          { value: 'maxCapacity-desc', label: 'По вместимости (по убыванию)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
