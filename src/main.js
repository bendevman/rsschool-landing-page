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

//categories
const tabs = body.querySelector('.tabs');
const menu = body.querySelector('.menu');
const menuList = body.querySelector('.menu__list');
const tabsItems = body.querySelectorAll('.tabs__item')
const refreshBtn = body.querySelector('.refresh-btn')

const createProduct = (product) => {
  const menuItem = document.createElement('li');
  console.log(product)
  menuItem.innerHTML = `
    <div class="menu-item__pic">
      <img src="/${product.img}" alt="coffee" class="menu-item__img">
    </div>
    <div class="menu-item__info">
      <span class="menu-item__title h3">${product.name}</span>
      <span class="menu-item__text">${product.description}</span>
      <span class="menu-item__price h3">$${product.price}</span>
    </div>`
  menuItem.classList.add('menu__item','menu-item');
  return menuItem;
}
const fillMenu = (products, all) => {
  menuList.innerHTML = '';
  let counter = 0;
  const category = tabs.querySelector('.tabs__item_active').querySelector('.tabs__btn').dataset.category;
  refreshBtn.classList.remove('refresh-btn_active')
  products.forEach(product => {
    if (category === product.category) {
      counter++;
      if (counter > 4 && !all) {
        refreshBtn.classList.add('refresh-btn_active')
        return 0;
      }
      menuList.appendChild(createProduct(product));
    }
  });
}

if (menu) {
  if ( screen.width <= 768 ) {
    fillMenu(products, false)
  } else {
    fillMenu(products, true)
  }
  tabs.addEventListener('click', e => {
    const tabsItem = e.target.closest('.tabs__item')
    if (tabsItem) {
      tabsItems.forEach(tabsItem => {
        tabsItem.classList.remove('tabs__item_active')
      });
      tabsItem.classList.add('tabs__item_active');
      if ( screen.width <= 768 ) {
        fillMenu(products, false)
      } else {
        fillMenu(products, true)
      }
    }
  })
  refreshBtn.addEventListener('click', () => {
    fillMenu(products, true)
  })
  window.addEventListener("resize", () => {
    if ( screen.width <= 768 ) {
      fillMenu(products, false)
    } else {
      fillMenu(products, true)
    }
  });
}
