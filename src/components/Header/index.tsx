import {useState, useRef, useContext} from 'react';
import {FiBell as BellIcon} from 'react-icons/fi';
import {AiOutlineUser as UserIcon} from 'react-icons/ai';
import {IoPower as PowerIcon} from 'react-icons/io5';

import ModalUserSettings from '../ModalUserSettings';
import {IModalUserSettingsHandles} from '../ModalUserSettings';

import AuthContext from '../../contexts/auth';

import {Wrapper, ShowInfo} from './styles';

type WithChildren<T = {}> =
  T & {children?: React.ReactNode};

type IHeaderProps = WithChildren<{
  title: string;
}>;

const Header = ({title, children}: IHeaderProps) => {
  const {signOut, userData} = useContext(AuthContext);

  const openUserSettingsModalRef = useRef<IModalUserSettingsHandles>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  function handleToggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  function handleOpenUserSettingsModal() {
    setShowMenu(false);
    openUserSettingsModalRef.current?.openModal();
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <Wrapper>
      <section>
        <i>
          <BellIcon color="#B2BDCE" size={20} />
        </i>

        <ShowInfo>
          <img
            src={userData.photo.url}
            alt="Profile"
            onClick={handleToggleMenu}
          />

          {showMenu && (
            <ul>
              <li>
                <UserIcon
                  color="#39D183"
                  size={20}
                  onClick={handleOpenUserSettingsModal}
                />
              </li>
              <li>
                <PowerIcon
                  color="#39D183"
                  size={20}
                  onClick={handleSignOut}
                />
              </li>
            </ul>
          )}
        </ShowInfo>

        <ModalUserSettings ref={openUserSettingsModalRef} />
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
