const PersonForm = ({onSubmit, value, value1, onChange, onChange1}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={value} onChange={onChange} /></div>
      <div>number: <input value={value1} onChange={onChange1} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm