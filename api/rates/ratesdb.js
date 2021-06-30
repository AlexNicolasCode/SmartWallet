const request = require('request')
const cheerio = require('cheerio')
const Rate = require('./ratesModel')

const usdToBrl = {
  from: "USD",
  to: "BRL",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=USD&To=BRL`}
const usdToEur = {
  from: "USD",
  to: "EUR",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=USD&To=EUR`
}
const usdToUsd = {
  from: "USD",
  to: "USD",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=USD&To=USD`
}

const eurToBrl = {
  from: "EUR",
  to: "BRL",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=EUR&To=BRL`
}
const eurToUsd = {
  from: "EUR",
  to: "USD",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=EUR&To=USD`
}
const eurToEur = {
  from: "EUR",
  to: "EUR",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=EUR&To=EUR`
}

const brlToEur = {
  from: "BRL",
  to: "EUR",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=BRL&To=EUR`
}
const brlToUsd = {
  from: "BRL",
  to: "USD",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=BRL&To=USD`
}
const brlToBrl = {
  from: "BRL",
  to: "BRL",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=BRL&To=BRL`
}

const uri = [brlToEur, brlToUsd, brlToBrl, eurToBrl, eurToUsd, eurToEur, usdToBrl, usdToEur, usdToUsd]
let rates = []

exports.newCheckRates = function (req, res) {
    uri.forEach(item => {
        request.get(item.link, (err, res, body) => {
            if (err) console.log(err)
            if (!err && res.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.result__BigRate-sc-1bsijpp-1.iGrAod').each(function() {
                    let data = $(this).html().slice(0, 4);
                    Rate.deleteOne({from: item.from, to: item.to}, function(err, result) {
                      if (err) console.log(err);
                    });
                    Rate.create({
                        from: item.from,
                        to: item.to,
                        rate: data.replace(",", ".")
                    }, (err, result) => {
                        if (err) throw err;
                    })
                })
            }
        })
    })
}

exports.rates = rates