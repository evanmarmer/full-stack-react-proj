import express from 'express';
import ViteExpress from 'vite-express';

let app = express();

app.use(express.json())

let db = [
    {
      species: 'Elk',
      harvested: 0
    },
    {
      species: 'Mule Deer',
      harvested: 0
    },
    {
      species: 'Snowshoe Hare',
      harvested: 0
    },
    {
      species: 'Black Bear',
      harvested: 0
    },
  ]

app.get('/species', (req, res) => {
    res.status(200).send(db)
})

app.put('/edit-species/:harvested/:species', (req, res) => {
    let harvested = +req.params.harvested
    let editedSpecies = req.params.species
    console.log(harvested)
    console.log(editedSpecies)

    for (let i = 0; i < db.length; i++) {
        if (db[i].species === editedSpecies) {
            db[i].harvested = harvested
            break
        }
    }

    res.status(200).send(db)
})

ViteExpress.listen(app, 3000, () => {console.log('listening on 3000')})