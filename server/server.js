const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
    consumer_key: '2D83St1YvbkPg7Gi8mbXDjIZP',
    consumer_secret: 'A1Ie7GdCjt0kdx0Qzq1gtfv3dKRbAfRkU2ysP3OTxmTuq5eV3B',
    access_token: '1266089445679403008-uWhslsyspyomaOsZYwaCLgbUXy1bpX',
    access_token_secret: 'n5qiWaDoADnEhH9cVGpl174fLQSnxKPEDoVBOlOaGSZ2T'
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/search/:word', (req, res) => {
    const params = { count: 50, tweet_mode: 'extended', q: req.params.word, result_type: 'recent', lang: 'es' };
    client
        .get(`search/tweets`, params)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        });

});

app.post('/favorites/:id', (req, res) => {
    const params = { id: req.params.id };
    client
        .post(`favorites/create`, params)
        .then(favorites => {
            res.send(favorites);
        })
        .catch(error => {
            res.send(error);
        });

});

app.post('/nofavorites/:id', (req, res) => {
    const params = { id: req.params.id };
    client
        .post(`favorites/destroy`, params)
        .then(nofavorites => {
            res.send(nofavorites);
        })
        .catch(error => {
            res.send(error);
        });

});

app.post('/retweet/:id', (req, res) => {
    const params = { id: req.params.id };
    client
        .post(`statuses/retweet`, params)
        .then(retweet => {
            res.send(retweet);
        })
        .catch(error => {
            res.send(error);
        });

});

app.post('/unretweet/:id', (req, res) => {
    const params = { id: req.params.id };
    client
        .post(`statuses/unretweet`, params)
        .then(unretweet => {
            res.send(unretweet);
        })
        .catch(error => {
            res.send(error);
        });

});


app.listen(5000, () => console.log('Server running'));