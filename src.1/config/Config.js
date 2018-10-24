/*
*   DB Connection
*/
import crypto from 'crypto';

let algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';


module.exports = {
    project_title : 'Fast Food API',
    jwt_secret_key : 'fastfoodapi',
    port : process.env.PORT || 9090,
    apiVersion : '/api/v1',
    // database: {
    //     socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    //     host  : 'localhost',
    //     user   : 'root',
    //     password  : 'root',
    //     database   : 'fastfood_db', 
    // },
    database: {
        host  : 'den1.mysql4.gear.host',
        user   : 'fastfoodmobapp',
        password  : 'Bu6r?638MjB_',
        database   : 'fastfoodmobapp', 
    },
    encrypt : (val) => {
        var text = val.toString();
        var cipher = crypto.createCipher(algorithm,password)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt(val){
        var text = val.toString();        
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
       
      
}
