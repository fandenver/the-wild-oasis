import Button from '../../ui/Button';
import { useCheckout } from './useCheckout.js';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Оформить
    </Button>
  );
}

export default CheckoutButton;
