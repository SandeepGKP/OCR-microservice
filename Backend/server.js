const express = require('express');
const app = express();
const reportsRouter = require('./routes/reports');

app.use(express.json());
app.use('/api', reportsRouter);

app.get('/', (req, res) => res.send('Server is working'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
