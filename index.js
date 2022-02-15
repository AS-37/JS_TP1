import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

app.post('/', async (req, res) => {
  return {
    message: `Welcome to Node Babel with ${
      req.body?.testValue ?? 'no testValue'
    }`,
  };
});

app.post('/cats', async (req, res) => {
  var cats =  (await axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3')).data
  return {
    cats.map(cat => cat.text)
  };
});

app.post('/foxes', async (req, res) => {
  var foxes =  (await axios.get('https://randomfox.ca/floof/')).data
  return {
    foxes.image
  };
});

app.post('/holidays', async (req, res) => {
 var holidays = (await axios.get('https://date.nager.at/api/v3/publicholidays/2022/' + countryCode)).data
  return {
    holidays
  };
});




// Only used for dev server, do not remove
app.head('/', () => ({ ping: 'pong' }));

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();