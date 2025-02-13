import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import { useCabins } from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty.jsx';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="Домики" />;

  // Фильтрация
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);

  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  // Сортировка
  const sortBy = searchParams.get('sortBy') || 'name-asc';

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === 'name') return a.name.localeCompare(b.name) * modifier;
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Фото</div>
          <div>Домик</div>
          <div>Вместимость</div>
          <div>Цена</div>
          <div>Скидка</div>
          <div>⚙️</div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
