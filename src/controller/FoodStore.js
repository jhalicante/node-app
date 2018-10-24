import jwt from 'jsonwebtoken';
import config from '../config/Config';

class FoodStoreController {
    
    FoodStore(req, res) {
        con.query('SELECT foodstore_id, foodstore_name, profile_photo, cover_photo, location, latitude, longitude from foodstore WHERE 1 ', function (error, results, fields) {
            if (error){
                res.status(200)
                .send({
                    errorCode : 400,
                    message : 'Unable to fetch foodstore',
                });
            }
            else {
                res.render('foodstore', { 
                    title: 'Food Store Page - Rest API',
                    foodStores: results
                });
            }
        });
    }

    FoodStoreAdd(req, res) {
        if(req.body.foodstore_name != undefined &&
            req.body.profilePhoto != undefined &&
            req.body.coverPhoto != undefined &&
            req.body.location != undefined &&
            req.body.latitude != undefined &&
            req.body.longitude != undefined) {
            
            var data = {
                foodstore_id : config.encrypt(new Date()),
                foodstore_name : req.body.foodstore_name,
                profile_photo : req.body.profilePhoto,
                cover_photo : req.body.coverPhoto,
                location : req.body.location,
                latitude : req.body.latitude,
                longitude : req.body.longitude,
                created_date : new Date()
            };

            con.query('INSERT INTO foodstore SET ? ', [data], function (error, results, fields) {
                res.status(200)
                .send({
                    errorCode : 0,
                    message: 'foodstore sucessfully saved'
                });    
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

    FoodStoreList(req, res) {
        res.header('Content-Type', 'application/json');
    
        con.query('SELECT foodstore_id, foodstore_name, profile_photo, cover_photo, location, latitude, longitude from foodstore WHERE 1 ', function (error, results, fields) {
            if (error){
                res.status(200)
                .send({
                    errorCode : 304,
                    message : 'Unable to fetch foodstore',
                });
            }
            else {
                if(results.length >= 1) { 
                    res.status(200)
                    .send({
                        errorCode : 400,
                        message: results.length+' results found',
                        response : results
                    });
                } else {
                    res.status(200)
                    .send({
                        errorCode : 400,
                        message: 'no result'
                    });    
                }
            }
        });
    }

    FoodStoreMenuFetchStoreId(req, res) {
        res.header('Content-Type', 'application/json');
        
        let foodstore_id = req.params.foodstore_id;

        con.query('SELECT foodstore_id,item_id, item_name, item_price, item_description, photo_url from foodmenu WHERE foodstore_id=? ', [foodstore_id], function (error, results, fields) {
            if (error){
                res.status(200)
                .send({
                    errorCode : 400,
                    message : 'Unable to fetch foodstore'
                });
            }
            else {
                if(results.length >= 1) { 
                    res.status(200)
                    .send({
                        errorCode : 0,
                        message: results.length+' results found',
                        response : results
                    });
                } else {
                    res.status(200)
                    .send({
                        errorCode : 400,
                        message: 'no result',
                    });    
                }
            }
        });
    }

    FoodStoreDelete(req, res) {
        res.header('Content-Type', 'application/json');
        
        let foodstore_id = req.params.foodstore_id;

        con.query('DELETE FROM foodstore WHERE foodstore_id = ? ', [foodstore_id], function (error, results, fields) {
            if (error){
                res.status(200)
                .send({
                    errorCode : 400,
                    message : 'Unable to fetch foodstore'
                });
            }
            else {
                res.status(200)
                .send({
                    errorCode : 0,
                    message: 'successfully deleted',
                });
            }
        });
    }

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

const _FoodStoreController = new FoodStoreController();
export default _FoodStoreController;
