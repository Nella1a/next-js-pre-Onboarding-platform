// import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { errorStyles, flexStyle, formAddNewJoiner } from './elements';

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

export default function AddContractDetails(props) {
  const [startingDate, setStartingDate] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState<number>();
  const [benefits, setBenefits] = useState('');

  const [userRole, setUserRole] = useState('2');
  const [errors, setErrors] = useState<Errors>([]);
  // const router = useRouter();

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
          const registerResponse = await fetch('/api/addContractDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: props.newJoinerUserId,
              startingDate: startingDate,
              jobTitle: jobTitle,
              salary: salary,
              benefits: benefits,
            }),
          });

          // response from api & check for error message
          const registerResponseBody = await registerResponse.json();
          if ('errors' in registerResponseBody) {
            setErrors(registerResponseBody.errors);
            return;
          }

          // update state variable new joiner
          props.setAddNewJoiner(registerResponse);
          console.log('registerResponseBody:', registerResponse);
        }}
      >
        <section>
          <article>
            <h2>Offer Overview</h2>
            <ul>
              <div>
                {' '}
                <li>
                  <label htmlFor="startingDate">Starting Date</label>
                </li>
                <li>
                  {' '}
                  <input
                    type="Date"
                    id="startingDate"
                    name="startingDate"
                    value={startingDate}
                    onChange={(event) =>
                      setStartingDate(event.currentTarget.value)
                    }
                  />{' '}
                </li>
              </div>
              <div>
                <li>
                  {' '}
                  <label htmlFor="jobTitle">Job Title</label>
                </li>
                <li>
                  <input
                    id="jotTitle"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.currentTarget.value)}
                  />
                </li>
              </div>

              <div>
                {' '}
                <li>
                  <label htmlFor="salary">Annual salary</label>
                </li>
                <li>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={salary}
                    onChange={(event) =>
                      setSalary(Number(event.currentTarget.value))
                    }
                  />
                </li>
              </div>

              <div>
                <li>
                  <label htmlFor="benefits">Benefits</label>
                </li>
                <li>
                  <input
                    id="benefits"
                    type="benefits"
                    name="benefits"
                    value={benefits}
                    onChange={(event) => setBenefits(event.currentTarget.value)}
                  />
                </li>
              </div>
              <div>
                {' '}
                <button> + Add Offer overview</button>
              </div>
            </ul>
          </article>
        </section>
      </form>
    </>
  );
}
