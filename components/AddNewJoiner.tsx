// import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { errorStyles, formAddNewJoiner } from './elements';

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
type Props = {
  newJoinerUserId: number;
  setNewJoinerUserId(): number;
};

export default function AddNewJoiner(props: Props) {
  // const requieredTrue = false;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const userRole = 2;

  /* TO Do: POST-Method nochmals anschauen ca. minute 52:00
  I should post to the endpoint users , than receive the new user as a response from the API and update the State Variable = the representation of the new user inside the database; no need to reloade the page
  // https://www.youtube.com/watch?v=0MmoyuO17QQ&list=PLMZMRynGmhsjXUZTmjuatMrVl_CKn-YuV&index=51
  */

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

          // update state variable new joiner
          // props.setNewJoinerUserId(registerResponse.);
          console.log('registerResponseBody:', registerResponseBody);
          console.log('userID:', registerResponseBody.user.user.id);
          // api response okay ==> update state variable
          props.setNewJoinerUserId(registerResponseBody.user.user.id);
          // setNewUserAdded(true);
        }}
      >
        <section>
          <article>
            <h2>Add New Joiner</h2>
            {!props.newJoinerUserId ? (
              <ul>
                <div>
                  {' '}
                  <li>
                    <label htmlFor="firstName">First name</label>
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
                    <label htmlFor="lastName">Last name</label>
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
              <div>
                <p>New user succesfully Added</p>
                <p>U can proceed with the offer Details</p>
              </div>
            )}
          </article>
        </section>
      </form>
    </>
  );
}
