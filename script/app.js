var express = require('express');
var request = require('request');
var app = new express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const http_request = (res, { url, method, token, data }) => {
  request(
    {
      url,
      method,
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(data),
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body));
      }
    },
  );
};

/**
 * @param {url,method, data, token}
 */

// 修改永久密码
app.post('/updatePermanentPasswd', (req, res) => {
  const { url, method, token, data } = req.body;
  http_request(res, { url, method, token, data });
});

/**
 * @param {url,method, data, token}
 */
// 修改临时密码
app.post('/updateTemporaryPasswd', (req, res) => {
  const { url, method, token, data } = req.body;
  http_request(res, { url, method, token, data });
});

app.listen(3000, () => {
  console.log('the listener is executing');
});
