
import { validateData, fetchJson } from './../lib.js';
import Hint from './hint.js';
import Error from './error.js';

export default function Form({data, updateFormData, updateState}) {
  async function submitHandler(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const json = JSON.stringify(Object.fromEntries(data));
    const schema = await fetchJson('/json/schema.json');

    if (!event.target.classList.contains('no-validation')) {
      if (!validateData(Object.fromEntries(data), schema, updateFormData)) {
        return;
      }
    }

    fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: json
    })
    .then((response) => response.json())
    .then(json => {
      json.error ? updateFormData(json.error) : updateState(json);
    }).catch(err =>
      console.warn('Something went wrong.', err)
    );
  }

  if (data) {
    return (
      <div className="form">
        <h2>Edit data in Database</h2>
        <div id="form">
          <form onSubmit={submitHandler} className={data['disable-clientside-validation'] ? "no-validation" : ""}>
            {
              data.fields.map((item, index) =>
                item.hidden
                ? <input key={index} name={item.name} defaultValue={item.value} hidden />
                :
                  <div className="row" key={index}>
                    <label>{item.label}: {item.required ? '*' : ''}</label>
                    <div>
                      <Hint text={item.hint} />
                      <input
                        className={item.error ? "error" : ""}
                        name={item.name}
                        defaultValue={item.value}
                        placeholder={item.placeholder} />
                      <Error error={item.error} />
                    </div>
                  </div>
               )
            }
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }
}
