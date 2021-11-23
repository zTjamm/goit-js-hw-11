const axios = require('axios');
const API_URL = 'https://pixabay.com/api/';
const MY_KEY = '24343949-498b2150a44ae569b49298aee';
const FILTERS = '&image_type=photo&orientation=horizontal&safesearch=true';
export default async function getElements(name, page) { 
  const item = await axios
    .get(`${API_URL}?key=${MY_KEY}&q=${name}${FILTERS}&page=${page}&per_page=40`)
    .then(function (response) {
      console.log(response)
      return response      
    });
  return item;
}