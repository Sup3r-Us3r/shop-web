import {useState, useEffect, useRef} from 'react';
import {FiPackage as PackageIcon} from 'react-icons/fi';
import {
  AiFillStar as FillStarIcon,
  AiOutlineStar as OutlineStarIcon,
} from 'react-icons/ai';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import ModalProduct from '../../components/ModalProduct';
import {IModalProductsHandles} from '../../components/ModalProduct';
import ModalConfirmAction from '../../components/ModalConfirmAction';
import {IModalConfirmActionHandles} from '../../components/ModalConfirmAction';
import SearchBar from '../../components/SearchBar';

import {toastError} from '../../config/toast';

import {handleFormatPrice} from '../../utils/formatPrice';

import api from '../../services/api';

import {Grid, Wrapper, TabsMenu, TableItemsList} from './styles';

export interface ICategory {
  id: number;
  name: string;
  image: {
    public_id: string;
    url: string;
  }
}

export interface IProduct {
  id: number;
  star: boolean;
  name: string;
  price: number;
  amount: number;
  category: string;
  description: string;
  images: {
    id: number;
    product_id: number;
    public_id: string;
    url: string;
  }[]
  created_at: Date;
}

const Products = () => {
  const openProductModalRef = useRef<IModalProductsHandles>(null);
  const openConfirmActionModalRef = useRef<IModalConfirmActionHandles>(null);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [activeButtonCategory, setActiveButtonCategory] = useState<number>(1);
  const [productIdToRemove, setProductIdToRemove] = useState<number>(0);
  const [productToUpdate, setProductToUpdate] = useState<IProduct>({} as IProduct);

  const currentCategoryIndexSelectedRef = useRef<number>(-1);

  function handleActiveButtonCategory(
    originalIndexOfCategory: number,
    nthChild: number,
  ) {
    setActiveButtonCategory(nthChild + 1);
    currentCategoryIndexSelectedRef.current = originalIndexOfCategory;
    handleGetDataFromEachCategory(originalIndexOfCategory);
  }

  function handleOpenProductModal() {
    openProductModalRef.current?.openModal();
  }

  function handleOpenModalConfirmAction() {
    openConfirmActionModalRef.current?.openModal();
  }

  function handleRemoveProduct(productId: number) {
    setProductIdToRemove(productId);
    handleOpenModalConfirmAction();
  }

  function handleUpdateProduct(product: IProduct) {
    setProductToUpdate(product);
    handleOpenProductModal();
  }

  async function handleToggleFavoriteProduct(productId: number) {
    try {
      const response = await api.get(`product/togglestar/${productId}`);

      if (response.status === 200) {
        handleGetDataFromEachCategory(currentCategoryIndexSelectedRef.current);
      }
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  async function handleGetCategories() {
    try {
      const response = await api.get<ICategory[]>('category/index');

      setCategories(response.data);
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  async function handleGetProducts() {
    try {
      const response = await api.get<IProduct[]>('product/index');

      setProducts(response.data);
      setAllProducts(response.data);
    } catch (err) {
      const {error} = err.response.data;

      toastError(error);
    }
  }

  async function handleGetDataFromEachCategory(indexOfCategory: number) {
    try {
      const categoryName = categories
      .find((_, index) => index === indexOfCategory)?.name;

      if (categoryName) {
        const response = await api.get<IProduct[]>('product/index', {
          params: {
            category: categoryName,
          },
        })

        setProducts(response.data);
        setAllProducts(response.data);
      } else {
        await handleGetProducts();
      }
    } catch (err) {
      const { error } = err.response.data;

      toastError(error);
    }
  }

  useEffect(() => {
    handleGetCategories();
    handleGetProducts();
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
          <button
            onClick={() => handleActiveButtonCategory(-1, 0)}
          >
            Todas as categorias
          </button>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleActiveButtonCategory(index, index + 1)}
            >
              {category.name}
            </button>
          ))}
        </TabsMenu>
        <ModalProduct
          ref={openProductModalRef}
          modalType={!productToUpdate.id ? 'create' : 'update'}
          categories={categories}
          productData={productToUpdate}
          setProductData={setProductToUpdate}
        />
        <ModalConfirmAction
          ref={openConfirmActionModalRef}
          productId={productIdToRemove}
        />
        <SearchBar
          allProducts={allProducts}
          setProducts={setProducts}
        />
        <TableItemsList>
          <table>
            <tbody>
              {products.map((product: IProduct) => (
                <tr key={product.id}>
                  <td>
                    {
                      product.star
                        ? (
                            <FillStarIcon
                              color="#39D183"
                              size={25}
                              onClick={
                                () => handleToggleFavoriteProduct(product.id)
                              }
                            />
                          )
                        : (
                            <OutlineStarIcon
                              color="#39D183"
                              size={25}
                              onClick={
                                () => handleToggleFavoriteProduct(product.id)
                              }
                            />
                          )
                    }
                  </td>
                  <td>
                    <div>
                      <img src={product.images[0].url} alt="Product" />
                      <div>
                        <h1>{product.name}</h1>
                        <span>{handleFormatPrice(product.price)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{product.description}</p>
                  </td>
                  <td>
                    <strong>Categoria:</strong>
                    <span>{product.category}</span>
                  </td>
                  <td>
                    <div>
                      <PackageIcon color="#" size={20} />
                      <span>{product.amount}</span>
                    </div>
                  </td>
                  <td>
                    <button onClick={
                      () => handleUpdateProduct(product)
                    }>Editar</button>
                    <button onClick={
                      () => handleRemoveProduct(product.id)
                    }>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableItemsList>
        <br />
      </Wrapper>
    </Grid>
  );
}

export default Products;
