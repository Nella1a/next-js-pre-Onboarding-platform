// import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
};

export default function AddContractDetails(props: Props) {
  const [startingDate, setStartingDate] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState<number>();
  const [benefits, setBenefits] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [apiResponse, setApiResponse] = useState(false);
  const [errors, setErrors] = useState<Errors>([]);

  useEffect(() => {
    if (props.newJoinerUserId) {
      setIsDisabled(false);
    }
  }, [props.newJoinerUserId]);

  return (
    <>
      {/* show error message if username already exists  */}
      <div css={errorStyles}>{errors && <p>{errors}</p>}</div>

      <form
        css={formAddNewJoiner}
        onSubmit={async (event) => {
          event.preventDefault();

          // send new user to api
          const addContractResponse = await fetch(
            `/api/contract/${props.newJoinerUserId}}`,
            {
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
            },
          );

          // response from api & check for error message
          const addContractResponseBody = await addContractResponse.json();
          if ('errors' in addContractResponseBody) {
            setErrors(addContractResponseBody.errors);
            return;
          }

          if (addContractResponseBody) {
            setApiResponse(true);
          }
          // props.setAddNewJoiner(addContractResponseBody);
          console.log('AddContractResponseBody:', addContractResponseBody);
        }}
      >
        <section>
          <article>
            <h2>Add Offer Details</h2>
            {!apiResponse ? (
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
                      value={jobTitle}
                      onChange={(event) =>
                        setJobTitle(event.currentTarget.value)
                      }
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
                      value={benefits}
                      onChange={(event) =>
                        setBenefits(event.currentTarget.value)
                      }
                    />
                  </li>
                </div>

                <div>
                  <button>Save Offer Details</button>
                </div>
              </ul>
            ) : (
              <div>
                <p>Offer Details succesfully added</p>
              </div>
            )}
          </article>
        </section>
      </form>
    </>
  );
}
