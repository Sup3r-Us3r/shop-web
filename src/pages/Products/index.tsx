import {useState, useEffect, useRef} from 'react';
import {FiSearch as SearchIcon, FiPackage as PackageIcon} from 'react-icons/fi';
import {
  AiFillStar as FillStarIcon,
  AiOutlineStar as OutlineStarIcon,
} from 'react-icons/ai';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import ModalProduct from '../../components/ModalProduct';

import {IModalProductsHandles} from '../../components/ModalProduct';

import {Grid, Wrapper, Search, TabsMenu, TableItemsList} from './styles';

const Products = () => {
  const openProductModalRef = useRef<IModalProductsHandles>(null);

  const [dataFakeTable, setDataFakeTable] = useState<any[]>([]);
  const [dataFakeCategories, setDataFakeCategories] = useState<string[]>([]);
  const [activeButtonCategory, setActiveButtonCategory] = useState<number>(1);
  const [toggleFavoriteProduct, setToggleFavoriteProduct] =
    useState<boolean>(false);

  function handleActiveButtonCategory(currentButtonIndex: number) {
    setActiveButtonCategory(currentButtonIndex + 1);
  }

  function handleOpenProductModal() {
    openProductModalRef.current?.openModal();
  }

  function handleToggleFavoriteProduct() {
    setToggleFavoriteProduct(!toggleFavoriteProduct);
  }

  useEffect(() => {
    let arrayDataFake = [] as any[];

    for (let i = 1; i <= 20; i++) {
      arrayDataFake.push(
        <tr>
          <td>
            {
              toggleFavoriteProduct
                ? (
                    <FillStarIcon
                      color="#39D183"
                      size={25}
                      onClick={handleToggleFavoriteProduct}
                    />
                  )
                : (
                    <OutlineStarIcon
                      color="#39D183"
                      size={25}
                      onClick={handleToggleFavoriteProduct}
                    />
                  )
            }
          </td>
          <td>
            <div>
              <img src="https://picsum.photos/seed/image001/500/500" alt="Product" />
              <div>
                <h1>Title of product</h1>
                <span>R$ 21,00</span>
              </div>
            </div>
          </td>
          <td>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, autem!</p>
          </td>
          <td>
            <strong>Categoria:</strong>
            <span>Natura</span>
          </td>
          <td>
            <div>
              <PackageIcon color="#" size={20} />
              <span>21</span>
            </div>
          </td>
          <td>
            <button>Editar</button>
            <button>Excluir</button>
          </td>
        </tr>
      );
    }

    setDataFakeTable(arrayDataFake);
  }, []);

  useEffect(() => {
    setDataFakeCategories([
      'Todas categorias',
      'Natura',
      'Tapetes',
      'Kits',
      'Cama mesa e banho',
    ]);    
  }, []);

  return (
    <Grid>
      <Menu />
      <Wrapper>
        <Header title="Produtos">
          <button
            onClick={handleOpenProductModal}
          >
            Adicionar
          </button>
        </Header>
        <TabsMenu activeButtonCategory={activeButtonCategory}>
          {dataFakeCategories.map((item, index) => (
            <button
              key={String(item)}
              onClick={() => handleActiveButtonCategory(index)}
            >
              {item}
            </button>
          ))}
        </TabsMenu>
        <ModalProduct ref={openProductModalRef} />
        <Search>
          <div>
            <SearchIcon color="#39D183" size={20} />
            <input type="text" placeholder="Pesquisar produtos..." />
          </div>
        </Search>
        <TableItemsList>
          <table>
            <tbody>
              {dataFakeTable.map(item => item)}
            </tbody>
          </table>
        </TableItemsList>
        <br />
      </Wrapper>
    </Grid>
  );
}

export default Products;
