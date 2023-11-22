export default function({data}) {
  return (
    <div className="profile">
    <h2>My Profile</h2>
    <p>Here we simply log form fields fetched from database:</p>
    <div id="profile">
      <code>{JSON.stringify(data)}</code>
    </div>
    </div>
  )
}
