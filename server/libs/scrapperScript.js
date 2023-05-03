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
    console.log('Conneting to MongoDB...');
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    const data = await StartScrappingContent();
    const database = client.db('meta');
    const trending = database.collection('trending');
    console.log('Starting to clear trending collection');
    const clearCollection = await trending.deleteMany({});
    console.log('Srending collection cleared successfully');
    console.log('Starting data insertion into collection');
    console.log(data);
    const insertTrendingData = await trending.insertMany(data);

    let ids = insertTrendingData.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }
  } catch (err) {
    console.log('Could not complete script ending connection ');
    console.log(err.message);
    process.exit();
  }
  console.log('Script successfully completed! ending connection ');
  await client.close();
  process.exit();
}
run().catch(console.dir);

const StartScrappingContent = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch((error) => {
    console.log('Waiting for dom content to load...');
  });

  await page.goto('https://9animetv.to/home', {
    waitUntil: ['load', 'domcontentloaded'],
  });

  const content = await page.evaluate(async () => {
    console.log('Dom content loaded starting to scrap');
    const data = [];
    const sliders = document.querySelectorAll('#slider .swiper-wrapper .swiper-slide');

    await new Promise((resolve, reject) => {
      sliders.forEach(async (currentValue, currentIndex) => {
        const title = currentValue.querySelector('.desi-head-title').innerText;
        const description = currentValue.querySelector('.desi-description').innerText;
        const coverImage = currentValue
          .querySelector('.film-poster-img')
          .getAttribute('src');

        const animeId = await fetch(
          `https://api.consumet.org/anime/gogoanime/${title}`
        ).then(async (res) => {
          const anime = await res.json();
          const ress = anime.results;
          return ress[0].id;
        });

        const anime = await fetch(
          `https://api.consumet.org/anime/gogoanime/info/${animeId}`
        ).then(async (res) => {
          const data = await res.json();
          return data;
        });

        data.push({
          ...anime,
          description,
          coverImage,
        });
        if (currentIndex === Array.from(sliders).length - 1) resolve();
      });
    });

    return data;
  });
  return content;
};
