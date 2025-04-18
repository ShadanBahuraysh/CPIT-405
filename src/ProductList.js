import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
];

function ProductList() {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
