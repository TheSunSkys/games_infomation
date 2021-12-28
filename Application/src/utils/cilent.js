import axios from 'axios';
const token = '8561f52a6caf27899777c7a4e96d3f8d'
// News
const optionsNews = {
    baseURL:
        `https://gnews.io/api/v4`,
};

export const clientInstanceNews = axios.create(optionsNews);

export const clientNews = {
    //   postRequestOTP: res => clientInstance.post('/user/requestOTP', res),
    getSteamNews: () => clientInstanceNews.get(`/search?q=game steam&lang=en&max=10&token=${token}`),
    getEpicNews: () => clientInstanceNews.get(`/search?q=game epic&lang=en&max=10&token=${token}`),
    getOtherNews: () => clientInstanceNews.get(`/search?q=mobile game&lang=en&max=10&token=${token}`),
};
