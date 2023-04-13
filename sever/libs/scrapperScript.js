require('dotenv').config();
const puppeteer = require('puppeteer');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const data = await StartScrappingContent();
    const database = client.db('meta');
    const trending = database.collection('trending');
    const insertTrendingData = await trending.insertMany(data);

    let ids = insertTrendingData.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }
  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const StartScrappingContent = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch((error) => {
    console.log('error');
  });

  await page.goto('https://9animetv.to/home', {
    waitUntil: ['load', 'domcontentloaded'],
  });

  const content = await page.evaluate(() => {
    const data = [];
    const sliders = document.querySelectorAll('#slider .swiper-wrapper .swiper-slide');

    sliders.forEach((slide) => {
      const title = slide.querySelector('.desi-head-title').innerText;
      const description = slide.querySelector('.desi-description').innerText;
      const coverImage = slide.querySelector('.film-poster-img').getAttribute('src');
      const anime = {
        title,
        description,
        coverImage,
      };
      data.push(anime);
    });
    return data;
  });
  return content;
};
