import express from 'express';
import config from '../config/Config'; // Config

// Index Page Controller
import IndexPageCtrlr from '../controller/IndexPage';
import ErrorPageCtrlr from '../controller/ErrorPage';

// Controller
import LoginCtrlr from '../controller/Login';
import RegisterCtrlr from '../controller/Register';
import ForgotPasswordCtrlr from '../controller/ForgotPassword';

// Food Store
import FoodStoreCtrlr from '../controller/FoodStore';



const router = express.Router(); // Instantiate express

// Error Page
// router.use(ErrorPageCtrlr.ErrorPage);

// Index Page
router.get('/', IndexPageCtrlr.IndexPage);

// Login
router.post(config.apiVersion+'/login', LoginCtrlr.Login);

// Registration
router.post(config.apiVersion+'/register', RegisterCtrlr.Register);

// Forgot Password
router.get('/forgotpassword', ForgotPasswordCtrlr.ForgorPasswordPage);
router.post(config.apiVersion+'/forgotpassword', ForgotPasswordCtrlr.SendForgotPasswordLink);
router.post(config.apiVersion+'/updatepassword', ForgotPasswordCtrlr.UpdatePassword);

// FoodStore
router.get('/foodstore', FoodStoreCtrlr.FoodStore); // Food Store Page
router.post(config.apiVersion+'/foodstore/add', FoodStoreCtrlr.FoodStoreAdd); // Add foodstore
router.delete(config.apiVersion+'/foodstore/delete/:foodstore_id', FoodStoreCtrlr.FoodStoreDelete); // Delete foodstore

router.get(config.apiVersion+'/foodstore/list', FoodStoreCtrlr.FoodStoreList); // Fetch all foodstore records
// router.get(config.apiVersion+'/foodstore/:foodstore_id', FoodStoreCtrlr.FoodStoreFetchId); // Fetch specific food store

router.get(config.apiVersion+'/foodstore/menu/:foodstore_id', FoodStoreCtrlr.FoodStoreMenuFetchStoreId); // Fetch all food menu
// router.get(config.apiVersion+'/foodstore/menu/:food_id', FoodStoreCtrlr.FoodStoreMenuFetchId); // Fetch specific food based on the foodstore id


// router.get('/api/v1/todos/:id', TodoController.getTodo);
// router.post('/api/v1/todos', TodoController.createTodo);
// router.put('/api/v1/todos/:id', TodoController.updateTodo);
// router.delete('/api/v1/todos/:id', TodoController.deleteTodo);

export default router;
