const express = require('express');
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const PORT = 3000


const Movie = mongoose.model('Movie', {
    tittle: String,
    description: String,
    image: String,
    duration: Number,
    trailer: String
})

app.get('/', async(request,response) => {
    const movies = await Movie.find()
    response.send(movies)
})

app.delete('/:id', async(request, response)=>{
    const movie = await Movie.findByIdAndDelete(request.params.id)
    return response.send(movie)
})

app.put('/:id', async(request, response)=>{
    const movie = await Movie.findByIdAndUpdate(request.params.id, {
        tittle: request.body.tittle,
        description: request.body.description,
        image: request.body.image_url,
        duration: request.body.duration,
        trailer: request.body.trailer_url
    })

    return response.send(movie)
})

app.post('/', async(request,response)=>{
    const movie = new Movie({
        tittle: request.body.tittle,
        description: request.body.description,
        image: request.body.image_url,
        duration: request.body.duration,
        trailer: request.body.trailer_url
    })

    await movie.save()
    response.send(movie)
})

app.listen(PORT,() => {
    console.log("Server Running");
    mongoose.connect('mongodb+srv://hidilsond:INhEGQ3GVI3BI77S@fewnodeapi.k2lrbb3.mongodb.net/?retryWrites=true&w=majority');
})