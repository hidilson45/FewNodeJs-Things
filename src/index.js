const express = require('express');
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const PORT = 3000


const Person = mongoose.model('Person', {
    name: String,
    country: String,
    info: String,
    id: Number,
    description: String
})

app.get('/', async(request,response) => {
    const persons = await Person.find()
    response.send(persons)
})

app.delete('/:id', async(request, response)=>{
    const person = await Person.findByIdAndDelete(request.params.id)
    return response.send(person)
})

app.put('/:id', async(request, response)=>{
    const person = await Person.findByIdAndUpdate(request.params.id, {
        name: request.body.name,
        country: request.body.country,
        info: request.body.info,
        id: request.body.id,
        description: request.body.description
    })

    return response.send(person)
})

app.post('/', async(request,response)=>{
    const person = new Person({
        name: request.body.name,
        country: request.body.country,
        info: request.body.info,
        id: request.body.id,
        description: request.body.description
    })

    await person.save()
    response.send(person)
})

app.listen(PORT,() => {
    console.log("Server Running");
    mongoose.connect('mongodb+srv://hidilsond:INhEGQ3GVI3BI77S@fewnodeapi.k2lrbb3.mongodb.net/?retryWrites=true&w=majority');
})