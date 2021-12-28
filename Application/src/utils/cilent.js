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
    getSteamNews: () => clientInstanceNews.get(`/search?q=game steam&lang=en&max=10&token=${TOKEN}`),
    getEpicNews: () => clientInstanceNews.get(`/search?q=game epic&lang=en&max=10&token=${TOKEN}`),
    getOtherNews: () => clientInstanceNews.get(`/search?q=mobile game&lang=en&max=10&token=${TOKEN}`),
    
};
