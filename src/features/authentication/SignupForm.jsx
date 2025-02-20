import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignUp.js';

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Полное имя" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', { required: 'Это поле обязательно' })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'Это поле обязательно',
            pattern: {
              // value: /\\S+@\\S+\\.\\S+/,
              message: 'Некорректный Email',
            },
          })}
        />
      </FormRow>

      <FormRow label="Пароль (минимум 8)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'Это поле обязательно',
            minLength: {
              value: 8,
              message: 'Минимальное количество символов 8',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Повторите пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'Это поле обязательно',
            validate: value =>
              value === getValues().password || 'Пароли должны совпадать',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isLoading}
          variation="secondary"
          type="reset"
          onClick={reset}
        >
          Отмена
        </Button>
        <Button disabled={isLoading}>Создать нового пользователя</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
