const mongoose = require('mongoose');

const fs = require('fs');
const debug = require('debug')('app:etl')

const { Rate } = require('./models')
const config = require('./config.js');

function load(filename, rawData) {
  const data = JSON.stringify(rawData);
  fs.writeFileSync(`./static/data/${filename}.json`, data);
}

function presenter(data) {
  const rate = {
    buy: data.buy,
    createdAt: data.createdAt,
    entity: data.entity,
    sell: data.sell,
    source: data.source,
    url: data.url,
  }

  return rate
}

async function saveHomepage() {
  const lastRate = await Rate.findOne().sort({createdAt: -1})

  const rates = await Rate.find({createdAt: lastRate.createdAt})

  load('homepage', {
    rates: rates.map(presenter),
    date: lastRate.createdAt,
  })
}

function createDirectory() {
  const dir = './static/data'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

function openDB() {
  return mongoose.connect(config.get('db.url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

async function main() {
  await openDB();

  createDirectory()

  await saveHomepage()
}

if (require.main === module) {
  main().then(() => {
    debug('done')
    process.exit(0);
  });
}
