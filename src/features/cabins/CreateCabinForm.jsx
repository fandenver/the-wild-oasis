import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow.jsx';
import Button from '../../ui/Button.jsx';
import FileInput from '../../ui/FileInput.jsx';
import Textarea from '../../ui/Textarea.jsx';
import { useCreateCabin } from './useCreateCabin.js';
import { useEditCabin } from './useEditCabin.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit /*, onError*/)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Имя домика" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'Это поле обязательно',
          })}
        />
      </FormRow>

      <FormRow
        label="Максимальная вместимость"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'Это поле обязательно',
            min: {
              value: 1,
              message: 'Вместимость должна быть не менее 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Цена" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'Это поле обязательно',
            min: {
              value: 1,
              message: 'Цена должна быть не менее 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Скидка" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'Это поле обязательно',
            validate: value =>
              +value <= +getValues().regularPrice ||
              'Скидка должна быть меньше цены',
          })}
        />
      </FormRow>

      <FormRow label="Описание для сайта" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'Это поле обязательно',
          })}
        />
      </FormRow>

      <FormRow label="Фото домика">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'Это поле обязательно',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          style={
            isWorking
              ? {
                  width: '128px',
                  height: '45px',
                }
              : {}
          }
          disabled={isWorking}
        >
          {isEditSession ? (
            !isWorking ? (
              'Изменить домик'
            ) : (
              <SpinnerMini />
            )
          ) : !isWorking ? (
            'Создать домик'
          ) : (
            <SpinnerMini />
          )}
        </Button>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Отмена
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
