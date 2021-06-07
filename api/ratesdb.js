const request = require('request')
const cheerio = require('cheerio')
const Rate = require('./api/models/ratesModel')

const usdToBrl = {
  from: "USD",
  to: "BRL",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=USD&To=BRL`}
const usdToEur = {
  from: "USD",
  to: "EUR",
  link: `https://www.xe.com/pt/currencyconverter/convert/?Amount=1&From=BRL&To=EUR`
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

const uri = [brlToEur, brlToUsd, eurToBrl, eurToUsd, usdToBrl, usdToEur]
let rates = []

exports.newCheckRates = function (req, res) {
    uri.forEach(item => {
        request.get(item.link, (err, res, body) => {
            if (err) console.log(err)
            if (!err && res.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.result__BigRate-sc-1bsijpp-1.iGrAod').each(function() {
                    let data = $(this).html().slice(0, 4);
                    rates.push({
                        from: item.from,
                        to: item.to,
                        rate: data
                    });
                    Rate.deleteOne(rates);
                    Rate.create({
                        from: item.from,
                        to: item.to,
                        rate: data
                    }, (err, result) => {
                        if (err) {
                            console.log(err)
                            throw err;
                        } else {
                            console.log("saved in db")
                        }
                    })
                })
            }
        })
    })
}

exports.rates = rates