const UserController = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    // Test
    app.get('/api/test', UserController.testApi);

    // Create New User
    app.post("/api/register", UserController.register);

    // Login User
    app.post('/api/login', UserController.login);

    // Logout User
    app.get('/api/logout', UserController.logoutUser);

    // Get all Users
    app.get("/api/users", UserController.getAllUsers);

    // Get One User
    app.get("/api/getUser/", UserController.getUser);

    // Delete User
    app.delete("/api/user/:id", UserController.deleteUser);
}


    // this route now has to be authenticated
    // app.get("/api/users", authenticate, Users.getAll);