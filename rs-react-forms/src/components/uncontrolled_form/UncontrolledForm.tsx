import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../store/features/user/userSlice';
import { formSchema } from '../../utils/form_validator';
import ModalWrapper from '../modal_wrapper/ModalWrapper';

const UncontrolledForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : undefined,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: (
        document.querySelector(
          'input[name="gender"]:checked'
        ) as HTMLInputElement
      )?.value as 'male' | 'female' | 'other' | undefined,
      accept: acceptRef.current?.checked || false,
      country: countryRef.current?.value || '',
      file: preview,
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const zodErrors = JSON.parse(result.error.message);
      zodErrors.forEach((err: { path: string[]; message: string }) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = {
      id: Date.now(),
      ...result.data,
    };
    dispatch(addNewUser(payload));
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 [grid-auto-rows:90px] gap-x-5 gap-y-4 bg-white"
      >
        <div className="col-span-2">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            ref={nameRef}
            id="name"
            type="text"
            className="border rounded p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block font-medium">
            Age
          </label>
          <input
            ref={ageRef}
            id="age"
            type="number"
            className="border rounded p-2 w-full"
          />
          {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            className="border rounded p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            className="border rounded p-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-medium">
            Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            id="confirmPassword"
            type="password"
            className="border rounded p-2 w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="col-span-2">
          <span className="block font-medium">Gender</span>
          <div className="flex items-center gap-3">
            <label className="flex gap-1">
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label className="flex gap-1">
              <input type="radio" name="gender" value="female" /> Female
            </label>
            <label className="flex gap-1">
              <input type="radio" name="gender" value="other" /> Other
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender}</p>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            ref={countryRef}
            id="country"
            type="text"
            className="border rounded p-2 w-full"
          />
          {errors.country && (
            <p className="text-red-500 text-xs">{errors.country}</p>
          )}
        </div>

        <div className="col-span-2 flex gap-4">
          <div>
            <input
              ref={fileRef}
              id="file"
              type="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileChange}
            />
            {errors.file && (
              <p className="text-red-500 text-xs">{errors.file}</p>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
            />
          )}
        </div>

        <div className="col-span-2">
          <label className="flex items-center gap-2">
            <input ref={acceptRef} type="checkbox" /> I accept Terms &
            Conditions
          </label>
          {errors.accept && (
            <p className="text-red-500 text-xs">{errors.accept}</p>
          )}
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default UncontrolledForm;
