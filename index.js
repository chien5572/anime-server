const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
const app = express();
const port = 3000;

function crawlListAnime($) {
    let listAnime = [];
    $('.movie-item').each((index, el) => {
        const movieItem = $(el).find('a');
        const id = $(el).attr('id').slice(9);
        const name = movieItem.attr('title');
        const link = movieItem.attr('href');
        const episodeNumber = movieItem.find('.episode-latest span').text();
        const image = movieItem.find('div img').attr('data-cfsrc');
        const alt = movieItem.find('div img').attr('alt');
        // const anime = new Anime(id, name, link, episodeNumber, image, alt);
        listAnime.push({
            id, name, link, episodeNumber, image, alt
        });
    })
    return listAnime;
}

function getSlide(n, mode) {
    const list = []
    switch (mode) {
        case 1:
            for (let i of n) {
                list.push(i['children']['0']['data']);
            }
            break;
        case 2:
            for (let i of n) {
                list.push(i['children']['0']['data'].slice(1));
            }
            break;
        case 3:
            for (let i of n) {
                list.push(i['attribs']['href'])
            }
            break;
        case 4:
            for (let i of n) {
                list.push(i['attribs']['data-cfsrc'])//['data-cfsrc'])
            }
            break;
    }

    return list;
}

function crawlSlide($) {
    let listSlice = [];
    $('.ah-carousel').each((index, el) => {
        const slide = $(el).find('div');
        const name = getSlide(slide.find('.name'), 1)
        const episode = getSlide(slide.find('.episode_latest'), 2);
        const link = getSlide(slide.find('a'), 3);
        const img = getSlide(slide.find('img'), 4)
        for (let i in name) {
            listSlice.push({
                'name': name[i],
                'episode': episode[i],
                'link': link[i],
                'img': img[i]
            })
        }
        // console.log(listSlice);
    })
    return listSlice;
}


app.get('/', (req, res) => {
    request('https://animehay.club/', (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const listAnime = crawlListAnime($);
            const listSlice = crawlSlide($);
            res.send({
                'slide': listSlice,
                'animes': listAnime
            })
        } else {
            console.log(error);
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
