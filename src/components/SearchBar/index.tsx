import {useState} from 'react';
import {FiSearch as SearchIcon} from 'react-icons/fi';
import {RiFilterOffLine as CancelFilterIcon} from 'react-icons/ri'

import {Wrapper} from './styles';

import {IProduct} from '../../pages/Products';

interface ISearchBarProps {
  allProducts: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const SearchBar = (
  {allProducts, setProducts}: ISearchBarProps
) => {
  const [productsFiltered, setProductsFiltered]
    = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>('');

  function handleResearching(typingValue: string) {
    setSearch(typingValue);

    if (!typingValue || !search.length) {
      setProductsFiltered([]);
      return;
    }

    if (search.length !== 0) {
      const filteredSearch = allProducts.filter((item) => {
        return item.name.toLowerCase()
          .startsWith(search.toLowerCase());
      });

      setProductsFiltered(filteredSearch);
    }
  }

  function handleSearchProductsFiltered() {
    setProducts(productsFiltered);
    setProductsFiltered([]);
    setSearch('');
  }

  function handleRestoreAllProducts() {
    console.log(allProducts);
    setProducts(allProducts);
    setProductsFiltered([]);
    setSearch('');
  }

  function handleSearchSpecificProductItem(productId: number) {
    const productItem = allProducts.filter((product) => {
      return product.id === productId;
    });

    setSearch(productItem[0].name);
    setProductsFiltered([]);
    setProducts(productItem);
  }

  return (
    <Wrapper>
      <div>
        {search.length === 0
          ? <SearchIcon
              color="#39D183"
              size={20}
              onClick={handleRestoreAllProducts}
            />
          : <CancelFilterIcon
              color="#39D183"
              size={20}
              onClick={handleRestoreAllProducts}
            />
        }
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          onChange={(e) => handleResearching(e.target.value)}
          onKeyPress={
            (e) => e.key === 'Enter' && handleSearchProductsFiltered()
          }
          value={search}
        />
        {productsFiltered.length !== 0 && (
          <section>
            <ul>
              {productsFiltered.map((product) => (
                <li
                  key={product.id}
                  onClick={
                    () => handleSearchSpecificProductItem(product.id)
                  }
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Wrapper>
  );
}

export default SearchBar;
