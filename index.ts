const cheerio = require('cheerio');
const request = require('request-promise');

request('https://animehay.club/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.movie-item').each((index, el) => {
            // const job = $(el).find('a').attr('href');
            const anime = $(el).find('a');
            const title = anime.attr('title');
            const href = anime.attr('href');
            const episode = anime.find('.episode-latest span').text();
            const img = anime.find('div.img').attr('src');
            console.log(img);
        })
    } else {
        console.log(error);
    }
});