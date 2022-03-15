import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  colorRequired,
  errorStyles,
  flexStyle,
  formAddNewJoiner,
  formStyle,
  formStyleContainer,
} from './elements';

// type Props = {
//   user: User | null;
//   userObject: User;
//   formStep: number;
//   nextFormStep: Function;
//   formValues: object;
//   setFormValues: object;
// };

type FormValuesOne = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};
type Errors = { message: string }[];

export default function AddNewJoiner(props) {
  const requieredTrue = false;
  const [errorsApi, setErrorsApi] = useState<Errors>([]);
  const [userRole, setUserRole] = useState(2);

  const [newJoinerRegister, setNewJoinerRegister] = useState([{}]);

  // const [formValues, setFormValues] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesOne>();

  const onSubmit = async (data: FormValuesOne) => {
    console.log('DataNewJoiner:', data);
    setNewJoinerRegister(data);
    setUserRole(2);

    // send form input to api
    const formInputResponse = await fetch('../api/addNewJoiner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newJoiner: data,
        userRole: userRole,
      }),
    });

    // get response from api & check for error message
    const formInputResponseBody = await formInputResponse.json();
    if ('errors' in formInputResponseBody) {
      setErrorsApi(formInputResponseBody.errors);
      return;
    }
    setErrorsApi([]);

    console.log('Response from Api:', formInputResponseBody);
    // Reload page
    router.reload();
  };

  return (
    <>
      {/* show error message if username already exists  */}
      <div css={errorStyles}>
        {errorsApi.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} css={formAddNewJoiner}>
        <section>
          <div css={flexStyle}>
            <p>
              <label htmlFor="userName">
                <span>Username: </span>{' '}
              </label>

              {/* use role="alert" to announce the error message */}
              {errors.username && errors.username.type === 'required' && (
                <span role="alert" css={colorRequired}>
                  is required
                </span>
              )}
              {errors.username && errors.username.type === 'maxLength' && (
                <span role="alert">Max length exceeded</span>
              )}
              <input
                id="userName"
                aria-invalid={errors.username ? 'true' : 'false'}
                {...register('username', {
                  required: requieredTrue,
                  maxLength: 30,
                })}
              />
            </p>
            <p>
              <label htmlFor="password">
                <span>Password </span>
              </label>
              {/* use role="alert" to announce the error message */}
              {errors.password && errors.password.type === 'required' && (
                <span role="alert" css={colorRequired}>
                  {' '}
                  is required
                </span>
              )}
              <input
                type="password"
                id="password"
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password', {
                  required: requieredTrue,
                  maxLength: 30,
                })}
              />
            </p>
          </div>

          <div css={flexStyle}>
            <p>
              <label htmlFor="firstName">
                <span>First Name: </span>{' '}
              </label>
              {/* use role="alert" to announce the error message */}
              {errors.firstName && errors.firstName.type === 'required' && (
                <span role="alert" css={colorRequired}>
                  is required
                </span>
              )}
              {errors.firstName && errors.firstName.type === 'maxLength' && (
                <span role="alert">Max length exceeded</span>
              )}
              <input
                id="firstName"
                aria-invalid={errors.firstName ? 'true' : 'false'}
                {...register('firstName', {
                  required: requieredTrue,
                  maxLength: 30,
                })}
              />
            </p>
            <p>
              <label htmlFor="lastName">
                <span>Last Name </span>
              </label>
              {/* use role="alert" to announce the error message */}
              {errors.lastName && errors.lastName.type === 'required' && (
                <span role="alert" css={colorRequired}>
                  {' '}
                  is required
                </span>
              )}
              <input
                id="lastName"
                aria-invalid={errors.lastName ? 'true' : 'false'}
                {...register('lastName', {
                  required: requieredTrue,
                  maxLength: 30,
                })}
              />
            </p>
            <button> + Add new Joiner</button>
          </div>
        </section>
      </form>
    </>
  );
}
