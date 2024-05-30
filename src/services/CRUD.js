const connection = require('../config/database.js')

const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM Users');
    return results
}


const getEditUser = async (id) => {
    const [results, fields] = await connection.query('SELECT * FROM Users WHERE id = ?', [id]);
    return results
}
const editUser = async (name, email, city, id) => {
    await connection.query(
        'UPDATE Users SET name = ?, email = ?, city = ? WHERE id = ?',
        [name, email, city, id]
    );
}
const deleteUserDB = async (id) => {
    await connection.query(
        'DELETE FROM Users WHERE id = ?',
        [id]
    );
}
module.exports = {
    getAllUsers,
    getEditUser,
    editUser,
    deleteUserDB
}