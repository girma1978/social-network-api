import express, { Express } from 'express';
import db from './config/connection';
import routes from './routes/api/index';

const PORT = process.env.PORT || 3001;
const app: Express = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api', routes);

// Start server after DB connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});