

export default function Form({data, formCallback, profileCallback}) {
  const submitHandler = (event) => {
    event.preventDefault();
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
      json.error ? formCallback(json.error) : profileCallback(json);
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