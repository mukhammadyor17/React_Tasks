import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNewUser } from '../../store/features/user/userSlice';
import { formSchema, type FormSchemaType } from '../../utils/form_validator';
import ModalWrapper from '../modal_wrapper/ModalWrapper';
import CountryAutocomplete from '../country_select/CountrySelect';

const ControlledForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: undefined,
      accept: false,
      country: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data: FormSchemaType) => {
    const payload = {
      id: Date.now(),
      ...data,
    };
    dispatch(addNewUser(payload));
    onClose();
  };

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setValue('file', base64, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 [grid-auto-rows:90px] gap-x-5 gap-y-4 bg-white"
        >
          <div className="col-span-2">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`mt-1 w-full border rounded p-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block font-medium">
              Age
            </label>
            <input
              id="age"
              type="number"
              {...register('age', { valueAsNumber: true })}
              className={`mt-1 w-full border rounded p-2 ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`mt-1 w-full border rounded p-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`mt-1 w-full border rounded p-2 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
            {passwordValue && (
              <div className="mt-1 h-2 w-full bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${
                    passwordValue.length >= 6
                      ? 'bg-green-500 w-1/2'
                      : 'bg-red-500 w-1/6'
                  }`}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`mt-1 w-full border rounded p-2 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
            {confirmPasswordValue && passwordValue !== confirmPasswordValue && (
              <p className="text-red-500 text-xs mt-1">Passwords must match</p>
            )}
          </div>

          <div className="col-span-2">
            <span className="block font-medium">Gender</span>
            <div className="flex gap-4 mt-1">
              <label>
                <input type="radio" value="male" {...register('gender')} /> Male
              </label>
              <label>
                <input type="radio" value="female" {...register('gender')} />{' '}
                Female
              </label>
              <label>
                <input type="radio" value="other" {...register('gender')} />{' '}
                Other
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <CountryAutocomplete />

          <div className="col-span-2 flex justify-between">
            <div className="">
              <label htmlFor="file" className="block font-medium">
                Profile Picture
              </label>
              <input
                id="file"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleFileChange}
                className="mt-1 w-full"
              />
            </div>
            <div>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded"
                />
              )}
            </div>
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('accept', {
                  setValueAs: (value) => value === 'on' || value === true,
                })}
              />
              I accept Terms & Conditions
            </label>
            {errors.accept && (
              <p className="text-red-500 text-xs mt-1">
                {errors.accept.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full p-2 rounded ${
                isValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
};

export default ControlledForm;
