import './sass/main.scss';
import '../node_modules/geolocator/dist/geolocator.min.js'
import './js/geolocator'
import "./js/sortByCountry"

import './js/fetchAndMarkup';
import prePagination from './js/prePagination';
import showPage from './js/showPageOfNumber';

import { trackScroll, backToTop } from './js/backToTop';

import {refs} from './js/getRefs';
import { onSearchEvent} from './js/searchEvent';

import './js/modal'; 

refs.formRef.addEventListener('submit', onSearchEvent);

refs.backToTopBtn.addEventListener('click', backToTop);
window.addEventListener('scroll', trackScroll);

prePagination();

refs.paginationRef.addEventListener('click', showPage); 


