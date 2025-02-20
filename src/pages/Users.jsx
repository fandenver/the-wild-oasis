import Heading from '../ui/Heading';
import SignupForm from '../features/authentication/SignupForm.jsx';

function NewUsers() {
  return (
    <>
      <Heading as="h1">Создать нового пользователя</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
