import 'modern-normalize';
import './styles/style.css'

import products from './assets/products.json';

console.log(products);


const body = document.querySelector('body')

//burger-menu
const burgerBtn = body.querySelector('.burger-btn');
const nav = body.querySelector('.nav');
const menuBtn = body.querySelector('.menu-btn');
const navList = body.querySelector('.nav__list');

burgerBtn.addEventListener('click',()=>{
  nav.classList.toggle('nav_active')
  burgerBtn.classList.toggle('burger-btn_active')
  body.classList.toggle('no-scroll')
})
menuBtn.addEventListener('click',()=>{
  nav.classList.toggle('nav_active')
  burgerBtn.classList.toggle('burger-btn_active')
  body.classList.remove('no-scroll')
})
navList.addEventListener('click',(e)=>{
  if (e.target.classList.contains('nav__link')) {
    nav.classList.toggle('nav_active')
    burgerBtn.classList.toggle('burger-btn_active')
    body.classList.remove('no-scroll')
  }
})

//mode
const themeSwitch = body.querySelector('.theme-switch');
let darkMode = localStorage.getItem('dark-mode');

if (darkMode) {
  body.classList.add('dark-mode')
  console.log(darkMode);
  document.getElementById('radio-moon').checked = true;
} else {
  document.getElementById('radio-sun').checked = true;
  body.classList.remove('dark-mode')
}

themeSwitch.addEventListener('click',(e)=>{
  const btn = e.target.closest(".theme-switch__radio")
  if (btn) {
      console.log(darkMode);
    if (btn.id === "radio-moon") {
      localStorage.setItem('dark-mode', true)
      document.getElementById('radio-moon').checked = true;
      darkMode = localStorage.getItem('dark-mode');
      body.classList.add('dark-mode')
    } else {
      document.getElementById('radio-sun').checked = true;
      localStorage.removeItem('dark-mode');
      darkMode = localStorage.getItem('dark-mode');
      body.classList.remove('dark-mode')
    }  
  }
})
