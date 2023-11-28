export default function Error({error}) {
  return error ? <p className="error">{error}</p> : null;
}

