import {useState, useEffect} from 'react';
import {Grid, Wrapper, GridItemsList} from './styles';
import {IoIosExpand as ExpandIcon} from 'react-icons/io';
import {AiOutlineDelete as DeleteIcon} from 'react-icons/ai';

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

  useEffect(() => {
    handleGetFavoriteProducts();
  }, []);

  return (
    <Grid>
      <Menu />
      <Wrapper>
        <Header title="Produtos em destaques" />
        <SearchBar
          // productsData={favoriteProducts}
          allProducts={allFavoriteProducts}
          setProducts={setFavoriteProducts}
        />
        <GridItemsList>
          {favoriteProducts.map((product) => (
            <div key={product.id}>
              <img src={product.images[0].url} alt={product.name} />
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <section>
                  <button>
                    <ExpandIcon color="#7495E6" size={20} />
                    <span>Visualizar</span>
                  </button>
                  <button>
                    <DeleteIcon color="#EB5858" size={20} />
                    <span>Remover</span>
                  </button>
                </section>
              </div>
            </div>
          ))}
        </GridItemsList>
      </Wrapper>
    </Grid>
  );
}

export default Home;
