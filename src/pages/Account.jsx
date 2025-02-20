import Heading from '../ui/Heading';
import Row from '../ui/Row';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm.jsx';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm.jsx';

function Account() {
  return (
    <>
      <Heading as="h1">Обновить ваш аккаунт</Heading>

      <Row>
        <Heading as="h3">Обновить данные пользователя</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Обновить пароль</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
