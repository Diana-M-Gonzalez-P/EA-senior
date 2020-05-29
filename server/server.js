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
    const params = { count: 200, tweet_mode: 'extended', q: req.params.word, result_type: 'recent', lang: 'es' };
    client
        .get(`search/tweets`, params)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        });

});


app.listen(5000, () => console.log('Server running'));