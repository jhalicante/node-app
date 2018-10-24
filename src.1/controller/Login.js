import jwt from 'jsonwebtoken';
import config from '../config/Config';


class LoginController {
  Login(req, res) {
    res.header('Content-Type', 'application/json');

    var token = jwt.sign({ foo: 'bar' }, config.jwt_secret_key, {expiresIn: '1d'});
    var decoded = jwt.verify(token, config.jwt_secret_key);

    var email = req.body.email;
    var pword = req.body.password;

    con.query('SELECT * from accounts WHERE email="'+email+'" AND password="'+pword+'" ', function (error, results, fields) {
        if (error){
          res.status(200)
          .send({
            errorCode : 400,
            message : 'Unable to login an account',
            // response : {
            //   errorMessage : error
            // }
          });
        }
        else {
          if(results.length == 1) {
            res.status(200)
            .send({
              errorCode : 0,
              message: 'account exists',
              response : {
                token : token,
                profile : {
                  fname : results[0].fname,
                  lname : results[0].lname,
                }
              }
            });
          } else {
            res.status(200)
            .send({
              errorCode : 400,
              message: 'invalid email or password'
            });    
          }

        }

    });
  }
}

const _LoginController = new LoginController();
export default _LoginController;
