var request = require('request');
var express = require('express');
var router = express.Router();
var dados = "";

function getCEP(url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      result = JSON.stringify(JSON.parse(body));
      return callback(result, false);
    } else {
      return callback(null, response);;
    }
  });
}

/* GET home page. */
router.get('/', function (req, res, next) {

  //Verifica se o CEP é um numero válido
  var len = dados.length;
  dados = parseInt(dados);
  if (!isNaN(dados) && (len == 8)) {
    //Faz a Consulta do Endereço em uma API
    url = 'https://viacep.com.br/ws/' + dados + '/json/';

    getCEP(url, function (data, response) {
      if (response) return res.render('index', { flag: response, resposta: JSON.parse(data) });
      res.render('index',{ flag: 200, resposta: JSON.parse(data) });
    });

  } else { //CEP não é um número válido
    if ((len == 0)) {
      res.render('index', { flag: 000, resposta: "" });  
    }else{
      res.render('index', { flag: 500, resposta: "CEP inválido! Digite apenas os 8 números, sem nenhum caractere especial!" });
    }
  }
});

/* POST home page. */
router.post('/', function (req, res, next) {
  //Pega o cep
  dados = req.body.cep;
  res.redirect('/');
});

module.exports = router;
