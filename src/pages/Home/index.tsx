import {useState, useEffect} from 'react';
import {Grid, Wrapper, Search, GridItemsList} from './styles';
import {FiSearch as SearchIcon} from 'react-icons/fi';
import {IoIosExpand as ExpandIcon} from 'react-icons/io';
import {AiOutlineDelete as DeleteIcon} from 'react-icons/ai';

import Menu from '../../components/Menu';
import Header from '../../components/Header';

const Home = () => {
  const [dataFake, setDataFake] = useState<any[]>([]);

  useEffect(() => {
    let arrayDataFake = [] as any[];

    for (let i = 1; i <= 20; i++) {
      arrayDataFake.push(
        <div>
          <img src="https://picsum.photos/seed/image001/500/500" alt="Product" />
          <div>
            <h1>Title of product</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis beatae possimus illo voluptate eum sint quasi doloremque nisi et dolorum!</p>
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
      );
    }

    setDataFake(arrayDataFake);
  }, []);

  return (
    <Grid>
      <Menu />
      <Wrapper>
        <Header title="Produtos em destaques" />
        <Search>
          <div>
            <SearchIcon color="#39D183" size={20} />
            <input type="text" placeholder="Pesquisar produtos..." />
          </div>
        </Search>
        <GridItemsList>
          {dataFake.map(item => item)}
          {/* <div>
            <img src="https://picsum.photos/seed/image001/500/500" alt="Product" />
            <div>
              <h1>Title of product</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis beatae possimus illo voluptate eum sint quasi doloremque nisi et dolorum!</p>
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
          </div> */}
        </GridItemsList>
      </Wrapper>
    </Grid>
  );
}

export default Home;
