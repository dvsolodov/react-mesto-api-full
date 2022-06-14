require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');

const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const { urlPattern } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
  }),
}), createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', () => {
  throw new NotFoundError('Нет данных');
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка: ${err.name} = ${err.message}`
        : message,
    });

  return next();
});

app.listen(PORT);
