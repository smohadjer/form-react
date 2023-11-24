import Form from './components/form.js';
import Profile from './components/profile.js';
import { fetchJson, getFormData } from './lib.js';

const app = document.getElementById('app');

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

const root = ReactDOM.createRoot(app);
root.render(<App />);

