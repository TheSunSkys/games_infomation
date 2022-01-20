import axios from 'axios';
import { TOKEN } from '@env';
// News
const optionsNews = {
    baseURL:
        `https://gnews.io/api/v4`,
};

export const clientInstanceNews = axios.create(optionsNews);

export const clientNews = {
    //   postRequestOTP: res => clientInstance.post('/user/requestOTP', res),
    getSteamNews: (max) => clientInstanceNews.get(`/search?q=game steam&lang=en&max=${max}&token=${TOKEN}`),
    getEpicNews: (max) => clientInstanceNews.get(`/search?q=game epic&lang=en&max=${max}&token=${TOKEN}`),
    getOtherNews: (max) => clientInstanceNews.get(`/search?q=mobile game&lang=en&max=${max}&token=${TOKEN}`),
};

// RoV
const optionsRovHero = {
    baseURL:
        `https://mws.eutc.ngame.proximabeta.com/`,
};

const optionsRovImage = {
    baseURL:
        `https://gnews.io/api/v4`,
};


export const clientInstanceRovHero = axios.create(optionsRovHero);

export const clientRov = {
    getHero: (id) => clientInstanceRovHero.get(`fcgi-bin/gift.fcgi?heroid=${id}&ticket=miniweb`),
};

// Dota 2
const optionsDota2 = {
    baseURL:
        `https://api.opendota.com/api/`,
};

const optionsDota2Two = {
    baseURL:
        `https://www.dota2.com/`,
};

export const clientInstanceDota2 = axios.create(optionsDota2);
export const clientInstanceDota2Two = axios.create(optionsDota2Two);

export const clientDota2 = {
    getHero: () => clientInstanceDota2.get(`heroStats`),
    getHeroDetail: (id) => clientInstanceDota2Two.get(`datafeed/herodata?language=english&hero_id=${id}`)
};
