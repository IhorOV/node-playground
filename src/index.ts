import express from 'express';
import _ from 'lodash';
import { listings } from './listings';
import bodyParser from "body-parser";

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get('/', (_req, res) => res.send('hello Lviv'));

app.get('/listings', (_req, res) => {
    return res.send(listings); 
});

app.post('/del-listing', (req, res) => {
    const id: string = req.body.id;
    const filteredList = _.remove(listings, (obj) => obj.id == id)
    return _.isEqual(listings.length , filteredList.length) ? 
        res.send('No such item') :
        res.send(filteredList); 
});

app.listen(port);

console.log(`[app] : http://localhost:${port}`);
