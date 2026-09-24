require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Hotel Royal Vrindavan backend running on http://localhost:${PORT}`);
});
