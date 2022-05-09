const mongoose = require('mongoose');

/**
 * @description Connect to the database function
 * @returns {Promise<void>} - promise
 * @throws {Error} - if connection fails
 */
const dbConnection = async() => {
    try {
        mongoose.connection.openUri(process.env.MONGODB_CNN , (err, res) => {
            if (err) throw err;
        });

    } catch (error) {
        throw new Error('Database connection failed');
    }
};

module.exports = {
    dbConnection
};