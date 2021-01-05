import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {BiHomeAlt as HomeIcon} from 'react-icons/bi';
import {
  IoTicketOutline as TicketIcon,
  IoImageOutline as ImageIcon
} from 'react-icons/io5';
import {FaRegArrowAltCircleUp as ArrowUpIcon} from 'react-icons/fa';
import {BsGrid1X2 as GridIcon} from 'react-icons/bs';
import {GoGraph as GraphIcon} from 'react-icons/go';

import {Wrapper} from './styles';

interface IMenuIItem {
  route: string;
  icon: JSX.Element;
}

const Menu = () => {
  const [menuItem, setMenuItem] = useState<IMenuIItem[]>([]);

  useEffect(() => {
    setMenuItem([
      {
        route: '/',
        icon: <HomeIcon color="#B9C8D3" size={20} />,
      },
      {
        route: '/products',
        icon: <TicketIcon color="#B9C8D3" size={20} />,
      },
      {
        route: '/images',
        icon: <ImageIcon color="#B9C8D3" size={20} />,
      },
      {
        route: '/download',
        icon: <ArrowUpIcon color="#B9C8D3" size={20} />,
      },
      {
        route: '/dashboard',
        icon: <GridIcon color="#B9C8D3" size={20} />,
      },
      {
        route: '/graphics',
        icon: <GraphIcon color="#B9C8D3" size={20} />,
      },
    ]);
  }, []);

  return (
    <Wrapper>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <img src="https://res.cloudinary.com/cloud-root/image/upload/v1608155931/app/logo_iajtgc.svg" alt="Logo" />
            </NavLink>
          </li>
          
          {menuItem.map((item) => (
            <li key={item.route}>
              <NavLink to={item.route} exact activeClassName="active">
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </Wrapper>
  );
}

export default Menu;
