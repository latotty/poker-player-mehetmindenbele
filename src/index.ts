import * as express from 'express';
import { handleBetRequestFactory } from './bet-request-handler';
import { handleShowdownFactory } from './showdown-handler';

const VERSION = 'Default TypeScript folding player';

const handleBetRequest = handleBetRequestFactory();
const handleShowdown = handleShowdownFactory();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => res.status(200).send('OK'));

app.post('/', async (req, res) => {
  try {
    if (req.body.action === 'bet_request') {
      const bet = await handleBetRequest(JSON.parse(req.body.game_state));
      res.status(200).send(bet.toString());
      return;
    }
    if (req.body.action === 'showdown') {
      await handleShowdown(JSON.parse(req.body.game_state));
      res.status(200).send('OK');
      return;
    }
    if (req.body.action === 'version') {
      res.status(200).send(VERSION);
      return;
    }
    res.status(200).send('OK');
  } catch (error) {
    console.error(JSON.stringify({ error }));
    res.status(500);
  }
});

const port = parseInt(process.env['PORT']) || 3000;
const host = '0.0.0.0';
app.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
