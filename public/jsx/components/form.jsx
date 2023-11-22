
import { validateClientSide, displayServerSideErrors } from './validate.js';

function Hint({text}) {
  return text ? <p className="hint">{text}</p> : null;
}

export default function Form({data, updateState}) {
  const submitHandler = (event) => {
    event.preventDefault();

    if (!validateClientSide(event.target)) {
      return
    }

    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);
    const dataJsonString = JSON.stringify(jsonData);

    fetch(data.action, {
      method: data.method,
      headers: data.headers,
      body: dataJsonString
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      json.error ? displayServerSideErrors(json.error, event.target) : updateState(json);
    }).catch(err => console.warn('Something went wrong.', err));
  };

  if (data) {
    return (
      <form onSubmit={submitHandler}>
        {
          data.fields.map((item, index) =>
            <div className="row" key={index}>
              <label>{item.label}:
                {item.required ? '*' : ''}
              </label>
              <div>
                <Hint text={item.hint} />
                <input name={item.name} defaultValue={item.value}/>
                <p className="error" hidden>{item.error}</p>
              </div>
            </div>
          )
        }
        <button>Submit</button>
      </form>
    )
  } else {
    return null;
  }
}
