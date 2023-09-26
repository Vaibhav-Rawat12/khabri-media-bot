const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'your-database-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Export the MySQL connection
module.exports = connection;
