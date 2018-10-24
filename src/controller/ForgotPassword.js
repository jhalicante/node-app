import jwt from 'jsonwebtoken';
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

import config from '../config/Config';

class ForgotPasswordController {

  ForgorPasswordPage(req, res) {
    res.render('forgotpassword', { title: 'Fast Food - Forgot Password' });
  }

  SendForgotPasswordLink(req, res) {
    res.header('Content-Type', 'application/json');
    var email = req.body.email;

    con.query('SELECT * from accounts WHERE email="'+email+'" ', function (error, results, fields) {
      if (error){
        res.status(200)
        .send({
          errorCode : 400,
          message : 'Unable to find your account'
        });
      }
      else {
        if(results.length == 1) {

          var token = jwt.sign({ uid : results[0].uid, email : email }, config.jwt_secret_key, {expiresIn: '1d'});

          var transport = nodemailer.createTransport(smtpTransport({
              service: 'gmail',
              auth: {
                user: 'jma.itsprogrammer@gmail.com',
                pass: 'misterhugoalicantemae09114'
              }
            })),
          mailOptions = {
            from: 'jma.itsprogrammer@gmail.com',
            to: email,
            subject: 'Fast Food Reset Password',
            html: '<!DOCTYPE html><html><body style="font-family:Century Gothic;"><h2 style="background:#55ae49;padding:10px;text-align:center;color:#fff;">Fast Food</h2><h4>Hello '+results[0].fname+' '+results[0].lname+',</h4><p>We have received a request to reset your password for your Account. click the button below to proceed.</p><a href="https://fastfood-mob-app.herokuapp.com/forgotpassword?token='+token+'" target="_blank" style="color:#55ae49;">Reset Link</a></p><br/><p><b>Thank you,</b><br>Fast Food</p></body></html>'
          };
          
          transport.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.status(200)
              .send({
                errorCode : 0,
                message: 'error sending sending reset link'
              });
            } else {
              res.status(200)
              .send({
                errorCode : 0,
                message: 'reset link successfully sent',
                response : {
                  email : results[0].email,
                  fname : results[0].fname,
                  lname : results[0].lname
                }
              });
            };
          });
        } else {
          res.status(200)
          .send({
            errorCode : 400,
            message: 'email address does not exists'
          });    
        }
      }
    });
  }

  UpdatePassword(req, res) {

    res.header('Content-Type', 'application/json');

    var token = req.body.token;
    var pword = req.body.password;

    var decoded = jwt.verify(token, config.jwt_secret_key);

    con.query('UPDATE accounts SET password = ? WHERE uid = ? ', [config.encrypt(pword), decoded.uid] ,function (error, results, fields) {
      if (error){
        res.status(200)
        .send({
          errorCode : 400,
          message : 'Unable to process password',
        });
      }
      else {
        if(results.affectedRows == 1) {
          res.status(200)
          .send({
            errorCode : 0,
            message: 'password successfully updated'
          });
        } else {
          res.status(200)
          .send({
            errorCode : 400,
            message: 'failed to updated password'
          });
        }
      }
    });
  }
}

const _ForgotPasswordController = new ForgotPasswordController();
export default _ForgotPasswordController;
