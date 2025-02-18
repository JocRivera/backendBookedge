import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookedge'
});

connection.connect((err) => {
    if (err) {
        console.log('Error in connecting to the database');
        return;
    }
    console.log('Connected to the database');
}
);

export default connection;
