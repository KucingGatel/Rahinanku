const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const { sequelize } = require('./config/db.config');
const { authenticateDB } = require('./helpers/db.helper');
const guestRoutes = require('./routes/guest.route');
const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(cors());

app.use(guestRoutes);
app.use(userRoutes);

app.use('/api/guest', guestRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
	authenticateDB(sequelize)
		.then(() => {
			console.log(`Example app listening on port ${port}`);
		})
		.catch((err) => {
			console.log(err);
		});
});
