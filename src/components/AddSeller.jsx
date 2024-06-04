import { useState } from "react";
import '../css/RegisterUser.css';

// CustomAlert component
const CustomAlert = ({  message, onClose }) => {
  return (
      <div className="custom-alert">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
      </div>
  );
};

const AddSeller = () => {
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleCloseAlert = () => {
    setShowAlert(false);
    window.location.reload()
  };
  const toTitleCase = (name) => {
    return name.split(' ').map((word) => {
        if (/^mc/i.test(word)) {
            // Capitalize the first letter and the second letter after 'Mc'
            return word.charAt(0).toUpperCase() + 'c' + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
        } else if (/^mac/i.test(word)) {
            // Capitalize the first letter and the letter following 'Mac'
            return word.charAt(0).toUpperCase() + 'ac' + word.charAt(3).toUpperCase() + word.slice(4).toLowerCase();
        } else {
            // Capitalize the first letter of other words
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }).join(' ');
};

const firstToTitleCase = (first) => {
  return first.split(' ').map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
};



  const handleSubmit = (e) => {
    e.preventDefault();

    // const addSeller = { firstName, surname };

    const titleCaseFirstName = firstToTitleCase(firstName);
    const titleCaseSurname = toTitleCase(surname);

    // Create the user object
    const user = {
      firstname: titleCaseFirstName,
      surname: titleCaseSurname
    };

    try {
      // Check if the combination already exists
      fetch(`http://localhost:8888/sellers?firstname=${titleCaseFirstName}&surname=${titleCaseSurname}`)
        .then((checkResponse) => checkResponse.json())
        .then((existingData) => {
          // Convert existing data to lowercase before comparison
          const dataExists = existingData.some(data =>
            data.firstname === titleCaseFirstName &&
            data.surname === titleCaseSurname
          );

          if (dataExists) {
            setAlertMessage('Seller Already Exists. Please enter a different name.');
            setShowAlert(true);
            return;
        }
          // Sends a POST request to the server to add the new buyer
          fetch('http://localhost:8888/sellers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
          })
            .then((postResponse) => postResponse.json())
            .then((data) => {
              setAlertMessage(`New Seller Added. Your Unique ID is ${data.id}`);
              setShowAlert(true);
              setFirstname(''); // Resets the firstname state to an empty string
              setSurname(''); // Resets the surname state to an empty string
             

            });
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="addseller">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label1">First Name:</label>
          <input
            className="input1"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="label1">Surname:</label>
          <input
            className="input1"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <br />
        <button className='button1'>Submit</button>

        {showAlert && (
                    <CustomAlert

                        message={alertMessage}
                        onClose={handleCloseAlert}
                    />
                )}
      </form>
    </div>
  );
};

export default AddSeller;