const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());

function getCookies(req) {
    if (!req.headers.cookie) return {};
    return req.headers.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key.trim()] = value;
        return acc;
    }, {});
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    if (!token) return res.redirect('/administrator/login');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/administrator/login');
        req.user = user;
        next();
    });
}

// Ruta za login stranicu
app.get('/administrator/login', (req, res) => {
    res.sendFile('login.html', { root: './static/administrator' });
});

// Ruta za glavnu stranicu nakon logovanja (admin panel)
app.get('/administrator', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static/administrator' });
});

// Ruta za skriptove i ostale resurse iz 'script' foldera
app.get('/administrator/script/:file', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/script', req.params.file));
});

// Ruta za sve ostale entitete (HTML stranice)
app.get('/administrator/:page', authToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'static/administrator', `${req.params.page}.html`));
});

app.listen(9000, () => {
    console.log('Server running on port 9000');
});
