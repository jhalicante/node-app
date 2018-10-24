import jwt from 'jsonwebtoken';
import config from '../config/Config';

class RegisterController {
  Register(req, res) {
    res.header('Content-Type', 'application/json');

    var token = jwt.sign({ foo: 'bar' }, config.jwt_secret_key, {expiresIn: '1d'});
    var decoded = jwt.verify(token, config.jwt_secret_key);

    if(req.body.fname != undefined && 
        req.body.lname != undefined && 
        req.body.email != undefined && 
        req.body.password != undefined &&
        req.body.type != undefined) {
        
        var data = {
            uid : config.encrypt(new Date()),
            fname : req.body.fname,
            lname : req.body.lname,        
            email : req.body.email,
            password : config.encrypt(req.body.password),
            type : req.body.type,
            createdDate : new Date()
        };

        con.query('SELECT * from accounts WHERE email="'+data.email+'" ', function (error, results, fields) {
            if (error){
                res.status(200)
                .send({
                    errorCode : 400,
                    message : 'Unable to check details',
                });
            }
            else {
                if(results.length >= 1) {
                    res.status(200)
                    .send({
                        errorCode : 0,
                        message: 'email already exists'
                    });
                } 
                else { 
                    con.query('INSERT INTO accounts SET ? ', [data], function (error, results, fields) {
                        if (error){
                            res.status(200)
                            .send({
                                errorCode : 400,
                                data : error,
                                message : 'Unable to register an account',
                                response : {
                                    errorMessage : error
                                }
                            });
                        }
                        else {
                            res.status(200)
                            .send({
                                errorCode : 0,
                                message: 'sucessfully registered'
                            });    
                        }
                    });
                }
            }
    
        });   
    }
    else {
        res.status(200)
        .send({
            errorCode : 400,
            message: 'no valid parameters'
        });       
    }
  }
}

const _RegisterController = new RegisterController();
export default _RegisterController;
