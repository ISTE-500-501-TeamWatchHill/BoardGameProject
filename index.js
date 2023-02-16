require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
let bodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const port =  process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CookieParser());

// DB Scripts
mongoose.connect(mongoString);
const db = mongoose.connection;
mongoose.set('strictQuery', false);
db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

// Route Imports
const defaultRoute = require('./routes/default.js');
const auth = require('./routes/auth/auth.js');
const loginRoutes = require('./routes/auth/login.js');
const registerRoutes = require('./routes/auth/register.js');
const userRoutes = require('./routes/user/userRoutes.js');
const universityRoutes = require('./routes/university/universityRoutes.js');
const teamRoutes = require('./routes/team/teamRoutes.js');
const permissionRoutes = require('./routes/permissions/permissionRoutes.js');
const gameRoutes = require('./routes/game/gameRoutes.js');

// Route Definitions
app.use('/', defaultRoute);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/user', auth, userRoutes);
app.use('/university', auth, universityRoutes);
app.use('/team', auth, teamRoutes);
app.use('/permission', permissionRoutes);
app.use('/game', auth, gameRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port} 🙃`);
});