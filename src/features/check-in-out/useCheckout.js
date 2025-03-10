import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings.js';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: bookingId =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: data => {
      toast.success(`Бронирование #${data.id} успешно оформлено`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('При оформлении произошла ошибка'),
  });

  return { checkout, isCheckingOut };
}
