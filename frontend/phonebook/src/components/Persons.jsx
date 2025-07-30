const Persons = ({persons, onClick}) => {
  return (
  <div>{persons.map(person => 
    <div key={person.id}>{person.name} {person.number} <button value={person.name} id={person.id} onClick={onClick}>delete</button> </div>)}
  </div>
  )
}

export default Persons