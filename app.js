import express from 'express';
import connection from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);




