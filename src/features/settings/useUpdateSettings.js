import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings.js';

export function useUpdateSetting(onShowForm) {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Настройка успешно отредактирована');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
