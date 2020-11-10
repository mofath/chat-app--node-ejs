const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, "assets")));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', (req, res, next) => {
    res.render("index");
});

const PORT = 5000;

app.listen(PORT, () =>
    console.log(`server is listening at port ${PORT}`)
);
