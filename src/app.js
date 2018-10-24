import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import router from './routes';
import mysql from 'mysql';
import config from './config/Config';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname,'../public','images','favicon.ico')));


app.use(router);

// mysql create connection
global.con = mysql.createConnection(config.database);
// mysql conenct
con.connect(function(err) {
  if(!err) {
      console.log("Database is connected...");
  } else {
      console.log("Error connecting database...");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is now running... http://localhost:${PORT}`);
});
