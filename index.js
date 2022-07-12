const cheerio = require('cheerio');
const request = require('request-promise');

request('https://animehay.club/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html); 

        $('.movie-item').each((index, el) => { 
            const anime = $(el).find('a');
            // const id = $(el).attr('id').;
            const name = anime.attr('title');
            const link = anime.attr('href');
            const episodeNumber = anime.find('.episode-latest span').text();
            const image = anime.find('div img').attr('data-cfsrc');
            const alt = anime.find('div img').attr('alt');

            console.log(image);
        })
    } else {
        console.log(error);
    }
});