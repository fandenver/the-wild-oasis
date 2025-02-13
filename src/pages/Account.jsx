import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Heading as="h1">Обновить ваш аккаунт</Heading>

      <Row>
        <Heading as="h3">Обновить данные пользователя</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading as="h3">Обновить пароль</Heading>
        <p>Обновить форму пароля пользователя</p>
      </Row>
    </>
  );
}

export default Account;
