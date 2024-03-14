const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
const morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'))
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
      },
    {
        id: 3,
        name: "Dan Abromav",
        number: "12-43-234345"
      },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
      }
]

app.get('/', (require, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(p => p.name)

    if(!body.number || !body.name){
        return response.status(400).json({ error: "person must have name and number"})
    }
    if (names.find(n => n === body.name)){
        return response.status(400).json({error: "name must be unique"})
    }

    const person = {...request.body, id: Math.floor(Math.random() * (3000 - 1) + 1)}
    response.json(person)
    persons = persons.concat(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})