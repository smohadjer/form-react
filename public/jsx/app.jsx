import Form from './components/form.js';
import Profile from './components/profile.js';

const app = document.getElementById('app');

async function fetchJson(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

async function getFormData(userData) {
  const formJson = await fetchJson('json/form.json');
  // add value from database to form fields
  if (userData.length > 0) {
    formJson.fields.map(field => {
      const dbField = userData.find((item) => item.name === field.name);
      return field.value = dbField.value;
    });
  }
  return formJson;
}

function App() {
  const [formData, setFormData] = React.useState(null);
  const [userData, setUserData] = React.useState();

  React.useEffect(() => {
    fetchJson('/api/profile').then((result) => {
      setUserData(result);
      getFormData(result).then((json) => {
        setFormData(json);
      });
    });
  }, []);

  return (
    <>
      <div className="form">
        <h2>Edit Profile</h2>
        <div id="form">
          <Form data={formData} updateState={setUserData} />
        </div>
      </div>
      <Profile data={userData} />
    </>
  )
}

ReactDOM.render(<App />, app);
