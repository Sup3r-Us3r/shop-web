import {TabsContainer} from './styles';

const TabsMenu = () => {
  return (
    <TabsContainer>
      <input id="natura" type="radio" name="tabs" />
      <label htmlFor="natura">Natura</label>
      <div>
        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>

      <input id="tapetes" type="radio" name="tabs" />
      <label htmlFor="tapetes">Tapetes</label>
      <div>
        <p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
      </div>

      <input id="roupas" type="radio" name="tabs" />
      <label htmlFor="roupas">Roupas</label>
      <div>
        <p>ccccccccccccccccccccccccccccccccccccccccc</p>
      </div>
    </TabsContainer>
  );
}

export default TabsMenu;
