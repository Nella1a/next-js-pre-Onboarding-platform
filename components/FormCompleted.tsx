import { useState } from 'react';
import { UserAddressResponseBody } from '../pages/api/documents/[userId]';
import { ReadAllPersonalInfo } from '../util/database';
import { sectionFormCompletedLayout } from './elements';

interface ChildProps {
  readFullUserInfo: ReadAllPersonalInfo;
  formStep: number;
  // setFormStep: React.Dispatch<React.SetStateAction<number>>;
  // user: User;
  userId: number;
}

export default function FormCompleted({
  readFullUserInfo,
  formStep,
  // setFormStep,
  // user,
  userId,
}: ChildProps) {
  console.log('gSSP:', readFullUserInfo);
  // console.log('gSSP_info:', props.readAllUserInfo.email);

  // const [userFormInfo, setUserFormInfo] = useState<AllPersonalInfo>('');

  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [socialSecNumber, setSocialSecNumber] = useState(
  //   userFormInfo.socialSecNb,
  // );
  // const [nationality, setNationality] = useState(userFormInfo.nationality);
  // const [email, setEmail] = useState(userFormInfo.email);
  // const [userPhone, setUserPhone] = useState(userFormInfo.userPhone);
  // const [address, setAddress] = useState(userFormInfo.streetAndNbr);
  // const [city, setCity] = useState(userFormInfo.city);
  // const [zipCode, setZipCode] = useState(userFormInfo.postalCode);
  // const [country, setCountry] = useState(userFormInfo.country);
  // const [maritalStatus, setMaritalStatus] = useState(
  //   userFormInfo.maritalStatus,
  // );

  // // State Variable with the id of the animal on editMode
  // const [idFormEditId, setidFormEditId] = useState<number>();
  // ON-EDIT State Variables for the on Edit inputs
  const [emailOnEdit, setEmailOnEdit] = useState(readFullUserInfo.email);
  const [dateOfBirthOnEdit, setDateOfBirthOnEdit] = useState(
    readFullUserInfo.dateOfBirth,
  );
  const [socialSecNumberOnEdit, setSocialSecNumberOnEdit] = useState(
    readFullUserInfo.socialSecNb,
  );
  const [nationalityOnEdit, setNationalityOnEdit] = useState(
    readFullUserInfo.nationality,
  );
  const [phoneOnEdit, setPhoneOnEdit] = useState(readFullUserInfo.userPhone);
  const [addressOnEdit, setAddressOnEdit] = useState(
    readFullUserInfo.streetAndNbr,
  );
  const [cityOnEdit, setCityOnEdit] = useState(readFullUserInfo.city);
  const [zipCodeOnEdit, setZipCodeOnEdit] = useState(
    readFullUserInfo.postalCode,
  );
  const [maritalStatusOnEdit, setMaritalStatusOnEdit] = useState(
    readFullUserInfo.maritalStatusId,
  );
  const [countryOnEdit, setCountryOnEdit] = useState(readFullUserInfo.country);
  const [sosContactfullNameOnEdit, setSosContactfullNameOnEdit] = useState(
    readFullUserInfo.fullname,
  );
  const [sosContactPhoneOnEdit, setSosContactPhoneOnEdit] = useState(
    readFullUserInfo.sosPhone,
  );
  const [sosContactRelationOnEdit, setSosContactRelationOnEdit] = useState(
    readFullUserInfo.relationshipId,
  );

  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState('');

  // READ

  // const refresh = useCallback(async () => {
  //   const response = await fetch(`/api/documents/${props.userId}`);
  //   const responseBody = (await response.json()) as FormResponseBodyGet;
  //   setUserFormInfo(responseBody.userFormInfo);
  //   console.log('userFormInfoResponse:', userFormInfo);
  // }, []);

  // UPDATE
  async function updateUserFormInputs() {
    const putResponse = await fetch(`/api/documents/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formUpdate: {
          userId: userId,
          dateOfBirth: dateOfBirthOnEdit,
          socialSecNb: socialSecNumberOnEdit,
          nationality: nationalityOnEdit,
          email: emailOnEdit,
          userPhone: phoneOnEdit,
          streetAndNbr: addressOnEdit,
          city: cityOnEdit,
          postalCode: zipCodeOnEdit,
          country: countryOnEdit,
          maritalStatusId: maritalStatusOnEdit,
          fullName: sosContactfullNameOnEdit,
          sosPhone: sosContactPhoneOnEdit,
          relationshipId: sosContactRelationOnEdit,
        },
      }),
    });
    const putResponseBody =
      (await putResponse.json()) as UserAddressResponseBody;
    // console.log('putREsponsebody: ', putResponseBody);

    if ('errors' in putResponseBody) {
      setError(putResponseBody.errors);
      return;
    }
    // setUserFormInfo(putResponseBody.userFormInfo);
    console.log('PUT_Response:', putResponseBody);
    // State Variables for the on Edit inputs
  }

  return (
    <>
      <h2> Step {formStep + 1} of 4</h2>
      {/* <h2>Review your inputs! 🎉</h2> */}
      <section css={sectionFormCompletedLayout}>
        {console.log('userAddress:')}

        <article>
          <h2>Personal Details</h2>
          {error && <p>Error-Message: {error}</p>}
          <div>
            <p>
              <label htmlFor="email">
                <span>Email </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                disabled={isDisabled}
                value={emailOnEdit}
                onChange={(event) => setEmailOnEdit(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="dateOfBirth">
                <span>Date of birth </span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                disabled={isDisabled}
                value={dateOfBirthOnEdit}
                onChange={(event) =>
                  setDateOfBirthOnEdit(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <label htmlFor="socialSecNumber">
                <span>Social Security No. </span>
              </label>
              <input
                type="tel"
                id="socialSecNumber"
                name="socialSecNumber"
                disabled={isDisabled}
                value={socialSecNumberOnEdit}
                onChange={(event) =>
                  setSocialSecNumberOnEdit(parseInt(event.currentTarget.value))
                }
              />
            </p>

            <p>
              <label htmlFor="nationality">
                <span>Nationality: </span>
              </label>
              <input
                id="nationality"
                name="nationality"
                disabled={isDisabled}
                value={nationalityOnEdit}
                onChange={(event) =>
                  setNationalityOnEdit(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <label htmlFor="Phone">
                <span>Phone </span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                disabled={isDisabled}
                value={phoneOnEdit}
                onChange={(event) =>
                  setPhoneOnEdit(parseInt(event.currentTarget.value))
                }
              />
            </p>
            <p>
              <label htmlFor="maritalStatus">
                <span>Marital Status:</span>
              </label>
              <select
                id="maritalStatus"
                data-test-id="userMartital-status"
                name="martitalStatus"
                disabled={isDisabled}
                value={maritalStatusOnEdit}
                onChange={(event) =>
                  setMaritalStatusOnEdit(parseInt(event.currentTarget.value))
                }
              >
                <option value="0">-- please select --</option>
                <option value="1">single</option>
                <option value="2">married</option>
                <option value="3">registered Partnership</option>
                <option value="4">divorced</option>
                <option value="5">widowed</option>
                <option value="6">widowed</option>
              </select>
            </p>
          </div>
        </article>

        <article>
          <h2> Address</h2>
          <div>
            <p>
              <label htmlFor="address">
                <span>Street: </span>
              </label>
              <input
                id="address"
                data-test-id="userAddress-street"
                name="address"
                disabled={isDisabled}
                value={addressOnEdit}
                onChange={(event) =>
                  setAddressOnEdit(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <label htmlFor="city">
                <span>City: </span>
              </label>
              <input
                id="city"
                data-test-id="userAddress-city"
                name="city"
                disabled={isDisabled}
                value={cityOnEdit}
                onChange={(event) => setCityOnEdit(event.currentTarget.value)}
              />
            </p>
            <p>
              <label htmlFor="zipCode">
                <span>Postal Code: </span>
              </label>
              <input
                type="tel"
                min="0"
                id="zipCode"
                data-test-id="useAddress-zipCode"
                name="zipCode"
                disabled={isDisabled}
                value={zipCodeOnEdit}
                title="Please enter a Zip Code"
                pattern="^\s*?\d{4}(?:[-\s]\d{4})?\s*?$"
                onChange={(event) =>
                  setZipCodeOnEdit(parseInt(event.currentTarget.value))
                }
              />
            </p>
            <p>
              <label htmlFor="country">
                <span>Country: </span>
              </label>
              <input
                id="country"
                data-test-id="userAddress-country"
                name="country"
                disabled={isDisabled}
                value={countryOnEdit}
                onChange={(event) =>
                  setCountryOnEdit(event.currentTarget.value)
                }
              />
            </p>
          </div>
        </article>

        <article>
          <h2>Emergency Contact</h2>
          <div>
            <p>
              <label htmlFor="userSosContactFullName">
                <span>Full Name </span>
              </label>
              <input
                id="userSosContactFullName"
                data-test-id="userSosContact-fullName"
                name="userSosContactFullName"
                disabled={isDisabled}
                value={sosContactfullNameOnEdit}
                onChange={(event) =>
                  setSosContactfullNameOnEdit(event.currentTarget.value)
                }
              />
            </p>
            <p>
              <label htmlFor="userSosContactPhone">
                <span>Phone </span>
              </label>
              <input
                type="tel"
                min={0}
                id="userSosContactPhone"
                data-test-id="userSosContact-phone"
                name="userSosContactPhone"
                disabled={isDisabled}
                value={sosContactPhoneOnEdit}
                onChange={(event) =>
                  setSosContactPhoneOnEdit(parseInt(event.currentTarget.value))
                }
              />
            </p>

            <p>
              <label htmlFor="sosContactRelation">
                <span>Relationship to Contact</span>
              </label>
              <select
                id="sosContactRelation"
                data-test-id="userSosContact-relation"
                name="sosContactRelation"
                disabled={isDisabled}
                value={sosContactRelationOnEdit}
                onChange={(event) =>
                  setSosContactRelationOnEdit(
                    parseInt(event.currentTarget.value),
                  )
                }
              >
                <option value="0"> -- please select ---</option>
                <option value="1">friend</option>
                <option value="2">Partner</option>
                <option value="3">sibling</option>
                <option value="4">parent</option>
                <option value="5">child</option>
                <option value="6">other</option>
              </select>
            </p>
          </div>
        </article>
      </section>
      <section>
        {isDisabled ? (
          <button
            onClick={() => {
              setIsDisabled(false);
              // setIsDisabled(false);
              // setEmailOnEdit(userFormInfo.email);
              // // setDateOfBirthOnEdit(userFormInfo.dateOfBirth);
              // setSocialSecNumberOnEdit(userFormInfo.socialSecNb);
              // setNationalityOnEdit(userFormInfo.nationality);
              // setPhoneOnEdit(userFormInfo.userPhone);
              // setAddressOnEdit(userFormInfo.streetAndNbr);
              // setCityOnEdit(userFormInfo.city);
              // setZipCodeOnEdit(userFormInfo.postalCode);
              // setCountryOnEdit(userFormInfo.country);
              // setMaritalStatusOnEdit(userFormInfo.maritalStatus);
              // setSosContactfullNameOnEdit(userFormInfo.fullname);
              // setSosContactPhoneOnEdit(userFormInfo.sosPhone);
              // setSosContactRelationOnEdit(userFormInfo.relationshipId);
            }}
          >
            edit
          </button>
        ) : (
          <div>
            {' '}
            <button
              onClick={() => {
                updateUserFormInputs().catch(() => {});
                setIsDisabled(true);
              }}
            >
              Save and Submit
            </button>
          </div>
        )}
      </section>
    </>
  );
}
