import ButtonIcon from '../../ui/ButtonIcon.jsx';
import { HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import { useLogout } from './useLogout.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      {!isLoading ? (
        <>
          <HiArrowRightEndOnRectangle />
        </>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
