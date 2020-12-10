import {FiBell as BellIcon} from 'react-icons/fi';

import {Wrapper} from './styles';

type WithChildren<T = {}> =
  T & {children?: React.ReactNode};

type IHeaderProps = WithChildren<{
  title: string;
}>;

const Header = ({title, children}: IHeaderProps) => {
  return (
    <Wrapper>
      <section>
        <i>
          <BellIcon color="#B2BDCE" size={20} />
        </i>
        <img src="https://picsum.photos/seed/image001/500/500" alt="Profile" />
      </section>

      <section>
        <p>{title}</p>
        {children}
      </section>
    </Wrapper>
  );
}

Header.defaultProps = {
  title: '',
}

export default Header;
