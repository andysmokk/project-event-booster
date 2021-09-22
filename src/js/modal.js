import modalTpl from '../templates/modal.hbs';
import { fetchEventById, fetchByEventAndCountry, fetchByEvent } from './apiService';
import { fetchAndMarkup, createMarkup } from './fetchAndMarkup';
import { refs } from './getRefs';
import { states } from './getStates';

//================================================================

let elId = null;
let author;
let selectInformation;

// ====================================================
refs.mainListRef.addEventListener('click', clickListener);
refs.closeBtn.addEventListener('click', closeModal);
refs.modalBackdrop.addEventListener('click', closeModalOverlay);
window.addEventListener('keydown', closeModalESC);

//====================================================
export function clickListener(e) {
  const cards = document.querySelectorAll('.main-item');
  cards.forEach(el => el.addEventListener('click', openModalHandler));
}

function openModalHandler(e) {
  refs.modalBackdrop.classList.remove('is-hidden');
  document.body.classList.toggle('is-open');
  elId = e.currentTarget.getAttribute('id');
  console.log(elId);
  responseByIdAndRender();
}

function modalShowMoreBtnHandler(e) {
  e.preventDefault();
  closeModal();
  refs.inputForm.value = author;
  selectInformation = refs.inputForm.value
  states.page = 1;

  if (selectInformation.length > 2 ) {
    fetchByEvent(refs.inputForm.value)
    .then(data=>createMarkup(data))
    .catch(err=>console.log(err));
    return;
  }

  fetchByEventAndCountry(refs.inputForm.value, refs.formSelect.value)
  .then(data=>createMarkup(data))
  .catch(err=>console.log(err));
}

async function responseByIdAndRender() {
  const response = await fetchEventById(elId)
    .then(data => data._embedded.events)
    .then(data => createMarkupForModal(data['0']));
  return response;
}

function createMarkupForModal(data) {
  const event = {
    ...data,
    imgCircleUrl: data.images.find(img => img.width === 305 && img.height === 225),
    imgPosterUrl: data.images.find(img => img.width === 1024 && img.height === 683),
    newTime: data.dates.start.localTime
      ? data.dates.start.localTime.split(':').slice(0, 2).join(':')
      : '',
  };
  const renderEl = modalTpl(event);
  
  author =  data.name;
 
  refs.modalMainContainer.innerHTML = renderEl;
  const showInfo = document.querySelector('.modal__more-info-link');
  showInfo.addEventListener('click', modalShowMoreBtnHandler);
  //console.log(showInfo);
}

function closeModalESC(event) {
  if (event.key === 'Escape') {
    closeModal(event);
  }
}

function closeModalOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  document.body.classList.toggle('is-open');
  refs.modalBackdrop.classList.toggle('is-hidden');
  refs.modalMainContainer.innerHTML = '';
}

// function clearModalMarkup() {
//   refs.modalMainContainer.innerHTML = '';
// }
