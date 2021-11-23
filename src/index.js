import getElements from './js/api_function';
import Notiflix from 'notiflix';
import tamplate from './templates/templateList.hbs';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = {
  container: document.querySelector('#content_container'),
  form: document.querySelector('#search-form'),
  btn: document.querySelector('button'),
  input: document.querySelector('input'),
};
let inputValue = '';
let page = 1;
refs.input.addEventListener('input', inputSaver);
function inputSaver() {
  inputValue = refs.input.value;
  return inputValue;
}
refs.form.addEventListener('submit', onSubmitForm);
function onSubmitForm(event) {
  event.preventDefault();
  refs.container.innerHTML=''
  page = 1;
  console.log(inputValue);
  renderItems(inputValue);
  return 
}
async function renderItems(name) {
  try {
    const items = await getElements(name, page);
    if (items.data.hits.length > 0) {
      const listMarkup = tamplate( {items} );
      refs.container.insertAdjacentHTML("beforeEnd", listMarkup);      
      galleryLiteBox.refresh();
      return page +=1;
    }
    Notiflix.Notify.warning('такого нет');
  } catch (error) {
    console.log(error);
  }
}
let galleryLiteBox = new SimpleLightbox('.gallery a');
galleryLiteBox.on('show.simplelightbox', function () {	
});
window.addEventListener('scroll',  e => {
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  if(scrollTop+clientHeight > scrollHeight-10){     
    renderItems(inputValue)
  }
})