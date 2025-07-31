require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('type', (req, res) => {
    return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :response-time :req[head] :type'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    response.send(`
        <div>
            <div>Phonebook has info for ${persons.length}</div>
            <div>${new Date()}</div>
        </div>`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * 42069)
    return String(maxId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'content missing'})
    }
    
    const person = new Person({
        id: generateId(),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})