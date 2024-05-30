const connection = require('../config/database.js')
const { getAllUsers, getEditUser, editUser, deleteUserDB } = require('../services/CRUD.js')

const getHomePage = async (req, res) => {
    try {
        const results = await getAllUsers()
        // Passing the results to the 'home.ejs' template under the variable 'users'
        return res.render('home.ejs', { users: results });
    } catch (error) {
        // Handling potential errors
        console.error("Failed to retrieve users:", error);
        res.status(500).send("Error retrieving user data");
    }
};

const imgPage = (req, res) => {
    res.render('sample.ejs');
};

const getCreatePage = (req, res) => {
    return res.render('createUser.ejs')
};

const postCreateUser = async (req, res) => {
    const { email, name, city } = req.body;
    try {
        await connection.query(
            `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
            [email, name, city]
        );
        res.redirect('/'); // Redirect to home after creation
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(500).send('Error creating user');
    }
};


const getUserToEdit = async (req, res) => {
    try {
        const id = req.params.id; // Get the user ID from the URL parameter
        let results = await getEditUser(id)

        if (results.length > 0) {
            res.render('editUser.ejs', { user: results[0] }); // Pass the user data to the edit form
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Failed to retrieve the user for editing:', error);
        res.status(500).send('Error retrieving user data');
    }
};
const postUserToEdit = async (req, res) => {
    const id = req.params.id;
    const { name, email, city } = req.body;

    try {
        await editUser(name, email, city, id)
        res.redirect('/'); // Redirect to the home page after updating
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).send('Error updating user data');
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteUserDB(id)
        res.redirect('/'); // Redirect to the home page after updating
    } catch (error) {
        console.error('Failed to Delete user:', error);
        res.status(500).send('Error updating user data');
    }
};



module.exports = {
    getHomePage,
    imgPage,
    postCreateUser,
    getCreatePage,
    getUserToEdit,
    postUserToEdit,
    deleteUser,

};


