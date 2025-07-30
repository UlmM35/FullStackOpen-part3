import './index.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('enter a name')
  const [newNumber, setNewNumber] = useState('enter a number')
  const [newString, setNewString] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((intialPersons) => {
      setPersons(intialPersons)
    })
  }, [])

  const addInfo = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber}
      
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Changed ${person.name}'s number`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      const nameObj = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleStringChange = (event) => {
    setNewString(event.target.value)
  }

  const handleDeletion = (event) => {
    if (window.confirm(`Delete ${event.target.value} ?`)) {
      personService.deletion(event.target.id)
      setPersons(persons.filter(person => person.id !== event.target.id))
    }
  }

  const showName = false

  const personsToShow = showName ? persons : persons.filter(person => person.name.toLowerCase().includes(newString.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter value={newString} onChange={handleStringChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addInfo} value={newName} value1={newNumber} onChange={handleNameChange} onChange1={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={handleDeletion}/>
    </div>
  )
}

export default App
