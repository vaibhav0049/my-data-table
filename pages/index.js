
import DataTable from '../components/DataTable';

const data = [
  {
    id: 1,
    name: 'amir',
    category: 'Category',
    subcategory: 'Subcategory',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-02',
    price: 100,
    salePrice: 80
  },

  {
    id: 2,
    name: 'salman',
    category: 'Category',
    subcategory: 'Subcategory',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-02',
    price: 100,
    salePrice: 80
  },
  {
    id: 3,
    name: 'amir',
    category: 'Category',
    subcategory: 'Subcategory',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-02',
    price: 100,
    salePrice: 80
  },

];

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Data Table</h1>
      <DataTable data={data} />
    </div>
  );
}
            