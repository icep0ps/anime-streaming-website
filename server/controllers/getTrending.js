const axios = require('axios');
const cheerio = require('cheerio');

async function getTrending(req, res) {
  try {
    const html = await axios.get('https://9animetv.to/home').then((res) => res.data);
    const $ = await cheerio.load(html);

    const data = [];

    $('div.swiper-wrapper')
      .find('div.deslide-item')
      .each((i, element) => {
        data.push({
          title: $(
            $(element).find($('div.deslide-item-content > div.desi-head-title'))
          ).text(),
          description: $(
            $(element).find($('div.deslide-item-content > div.desi-description'))
          ).text(),
          cover: $(
            $(element).find($('div.deslide-cover > div.deslide-cover-img > img'))
          ).attr('src'),
          link: $(
            $(element).find($('div.deslide-item-content > div.desi-buttons > a'))
          ).attr('href'),
        });
      });
    res.json({ data: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('sorry an unexpected error occured');
  }
}
module.exports = getTrending;
