import Heading from '../ui/Heading';
import Row from '../ui/Row.jsx';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm.jsx';

function Settings() {
  return (
    <Row>
      <Heading as="h1">Обновить настройки отеля</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
