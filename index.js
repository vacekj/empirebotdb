const express = require('express');
const bodyparser = require("body-parser");


const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres'
});

const app = express();
app.use(bodyparser.json());
const port = process.env.port || 3000;

class Bet extends Model {
}

Bet.init({
	steam_id: DataTypes.STRING,
	profit: DataTypes.DOUBLE,
	target: DataTypes.STRING,
	actual: DataTypes.STRING,
}, { sequelize, modelName: 'bet' });

sequelize.sync();

app.get('/bet', async (req, res) => {
	return await sequelize
		.sync()
		.then(() => {
			return Bet.create({
				steam_id: req.body.steam_id,
				target: req.body.target,
				actual: req.body.actual,
				profit: parseFloat(req.body.profit),
			});
		})
		.then((bet) => {
			return res.json(bet);
		})
		.catch((err) => {
			return res.json(err);
		});
});

app.listen(port, () => console.log(`Bet app listening on port ${port}!`));
