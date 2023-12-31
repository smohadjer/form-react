import Form from './components/form.js';
import Profile from './components/profile.js';
import { fetchJson } from './lib/lib.js';

function App() {
  const [formData, setFormData] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  // add value from database to form fields
  const updateFormData = () => {
    if (formData && formData.fields.length) {
      const data = {...formData};
      data.fields.map(field => {
        if (userData.hasOwnProperty(field.name)) {
          return field.value = userData[field.name];
        }
      });
      setFormData(data);
    }
  }

  const removeErrors = () => {
    if (formData && formData.fields.length) {
      const data = {...formData};
      data.fields.map(field => {
        if (field.hasOwnProperty('error')) {
          delete field.error;
          return field;
        }
      });
      setFormData(data);
    }
  }

  // add errors to form data
  const updateFormDataErrors = (errors) => {
    if (formData && formData.fields.length) {
      const data = {...formData};
      errors.forEach(error => {
        const fieldname = error.instancePath.substring(1);
        data.fields.map(field => {
          if (field.name === fieldname) {
            return field.error = error.message;
          }
        });
      });
      setFormData(data);
    }
  }

  React.useEffect(() => {
    fetchJson('./json/form.json').then((result) => {
      console.log('fetch from json only once');
      setFormData(result);
    });

    fetchJson('/api/profile').then((result) => {
      console.log('fetch user data from db only once');
      setUserData(result[0]);
    });
  }, []);

  React.useEffect(() => {
    console.log('This effect runs every time userData state changes')
    removeErrors();
    updateFormData();
  }, [userData]);

  return (
    <>
      <Form data={formData} updateFormData={updateFormDataErrors} updateState={setUserData} />
      <Profile data={userData} />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

