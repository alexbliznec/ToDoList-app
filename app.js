const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const passport = require('koa-passport');
const session = require('koa-session');

const sessionStore = require('./libs/sessionStore');
const todolistRoutes = require('./routes/toDoListRoutes/toDoList');
const authRoutes = require('./routes/auth');
const app = new Koa();
const router = new Router();


app.use(session({signed: false, store: sessionStore}, app));
app.use(bodyParser());
app.use(static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());



router.post('/register', authRoutes.register);
router.get('/loginpage', authRoutes.loginPage);
router.post('/login', authRoutes.login);
router.get('/logout', authRoutes.logout);

router.get('/todolist', authRoutes.isAuthenticated, todolistRoutes.allTasksPage);
router.get('/todolisttaskwindow/:taskID', todolistRoutes.modalWindow);
router.post('/todolist/addtask', todolistRoutes.addTask);
router.post('/todolist/addtaskdescription/:taskID', todolistRoutes.addTaskDescription);
router.put('/todolist/updatetask/:taskID', todolistRoutes.updateTask);
router.get('/todolist/deletetask/:taskID', todolistRoutes.deleteTask);
router.get('/totdolist/completetask/:taskID', todolistRoutes.completeTask);
router.get('/failed', async (ctx) => {ctx.body = `authorization failed`});

module.exports = app;

