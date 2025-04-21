import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  return <h2>Details for Product ID: {id}</h2>;
}

export default ProductDetails;
