import {useState, useEffect} from 'react';
import {Grid, Wrapper, GridItemsList} from './styles';
import {
  AiFillStar as FillStarIcon,
  AiOutlineStar as OutlineStarIcon,
} from 'react-icons/ai';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

import api from '../../services/api';

import {toastError} from '../../config/toast';

import {IProduct} from '../Products';

const Home = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
  const [allFavoriteProducts, setAllFavoriteProducts] = useState<IProduct[]>([]);

  async function handleGetFavoriteProducts() {
    try {
      const response = await api.get<IProduct[]>('product/index');

      const favoriteProductsList = response.data
        .filter((product) => product.star);

      setFavoriteProducts(favoriteProductsList);
      setAllFavoriteProducts(favoriteProductsList);
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  async function handleToggleFavoriteProduct(productId: number) {
    try {
      const response = await api.get(`product/togglestar/${productId}`);

      if (response.status === 200) {
        handleGetFavoriteProducts();
      }
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  useEffect(() => {
    handleGetFavoriteProducts();
  }, []);

  return (
    <Grid>
      <Menu />
      <Wrapper>
        <Header title="Produtos em destaques" />
        <SearchBar
          allProducts={allFavoriteProducts}
          setProducts={setFavoriteProducts}
        />
        <GridItemsList>
          {favoriteProducts.map((product) => (
            <div key={product.id}>
              <img src={product.images[0].url} alt={product.name} />
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <button>
                {
                  product.star
                    ?
                      <FillStarIcon
                        color="#39D183"
                        size={25}
                        onClick={
                          () => handleToggleFavoriteProduct(product.id)
                        }
                      />
                    : <OutlineStarIcon
                        color="#39D183"
                        size={25}
                        onClick={
                          () => handleToggleFavoriteProduct(product.id)
                        }
                      />
                }
              </button>
            </div>
          ))}
        </GridItemsList>
      </Wrapper>
    </Grid>
  );
}

export default Home;
