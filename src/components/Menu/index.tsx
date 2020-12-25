import {Link} from 'react-router-dom';
import {BiHomeAlt as HomeIcon} from 'react-icons/bi';
import {
  IoTicketOutline as TicketIcon,
  IoImageOutline as ImageIcon
} from 'react-icons/io5';
import {FaRegArrowAltCircleUp as ArrowUpIcon} from 'react-icons/fa';
import {BsGrid1X2 as GridIcon} from 'react-icons/bs';
import {GoGraph as GraphIcon} from 'react-icons/go';

import {Wrapper} from './styles';

const Menu = () => {
  return (
    <Wrapper>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src="https://res.cloudinary.com/cloud-root/image/upload/v1608155931/app/logo_iajtgc.svg" alt="Logo" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <HomeIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
          <li>
            <Link to="/products">
              <TicketIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <ImageIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <ArrowUpIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <GridIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <GraphIcon color="#B9C8D3" size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
}

export default Menu;
