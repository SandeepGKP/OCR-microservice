const express = require('express');
const app = express();
const reportsRouter = require('./routes/reports');

app.use(express.json());
app.use('/', reportsRouter);

app.get('/', (req, res) => res.send('Server is working'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
