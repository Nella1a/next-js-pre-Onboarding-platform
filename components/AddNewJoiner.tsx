// import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { errorStyles, formAddNewJoiner, successStyle } from './elements';

// type Props = {
//   user: User | null;
//   userObject: User;
//   formStep: number;
//   nextFormStep: Function;
//   formValues: object;
//   setFormValues: object;
// };

// type FormValuesOne = {
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
// };

type Errors = { message: string }[];
// type Props = {
//   newJoinerUserId: number;
//   setNewJoinerUserId(): number;
// };

interface ChildProps {
  newJoinerUserId: number;
  setNewJoinerUserId: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddNewJoiner({
  newJoinerUserId,
  setNewJoinerUserId,
}: ChildProps) {
  // const requieredTrue = false;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const userRole = 2;

  return (
    <>
      {/* show error message if username already exists  */}
      <div css={errorStyles}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>

      <form
        css={formAddNewJoiner}
        onSubmit={async (event) => {
          event.preventDefault();

          // send new user to api
          const registerResponse = await fetch(`/api/addNewJoiner`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              userRole: userRole,
              firstName: firstName,
              lastName: lastName,
            }),
          });

          // response from api & check for error message
          const registerResponseBody = await registerResponse.json();
          if ('errors' in registerResponseBody) {
            setErrors(registerResponseBody.errors);
            return;
          }
          console.log('registerResponseBody:', registerResponseBody);
          console.log('userID:', registerResponseBody.user.user.id);
          // api response okay ==> update state variable
          console.log('Console REGISSTER:', registerResponseBody);
          setNewJoinerUserId(registerResponseBody.user.user.id);
        }}
      >
        <section>
          <article>
            <h2>Add New Joiner</h2>
            {!newJoinerUserId ? (
              <ul>
                <div>
                  {' '}
                  <li>
                    <label htmlFor="firstName">First Name</label>
                  </li>
                  <li>
                    {' '}
                    <input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(event.currentTarget.value)
                      }
                    />{' '}
                  </li>
                </div>

                <div>
                  <li>
                    {' '}
                    <label htmlFor="lastName">Last Name</label>
                  </li>
                  <li>
                    <input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(event) =>
                        setLastName(event.currentTarget.value)
                      }
                    />
                  </li>
                </div>

                <div>
                  {' '}
                  <li>
                    {' '}
                    <label htmlFor="username">Username</label>{' '}
                  </li>
                  <li>
                    {' '}
                    <input
                      id="username"
                      name="username"
                      value={username}
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                    />
                  </li>
                </div>

                <div>
                  <li>
                    <label htmlFor="password">Password</label>
                  </li>
                  <li>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                  </li>
                </div>
                <div>
                  {' '}
                  <button> Create Account</button>
                </div>
              </ul>
            ) : (
              <div css={successStyle}>
                <p>New user succesfully added</p>
                <p>Please proceed with the offer details</p>
              </div>
            )}
          </article>
        </section>
      </form>
    </>
  );
}
