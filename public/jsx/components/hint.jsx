export default function Hint({text}) {
  return text ? <p className="hint">{text}</p> : null;
}
