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
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    nav.classList.remove('nav_active')
    burgerBtn.classList.remove('burger-btn_active')
    body.classList.remove('no-scroll')
  }
});

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


//slider
const slider = body.querySelector('.slider');
const sliderDisplay = body.querySelector('.slider__display');
const sliderList = body.querySelector('.slider__list');
const sliderBtnLeft = body.querySelector('.slider__btn_left');
const sliderBtnRight = body.querySelector('.slider__btn_right');
const ctrlItems = body.querySelectorAll('.controls__item');

if (slider) {
  let slideWidth = sliderDisplay.offsetWidth;
  let slidePosition = 0;
  
  const slideTo = (slideWidth, slidePosition) => {
    slideWidth = sliderDisplay.offsetWidth;
    sliderList.style.transform = `translate(${slideWidth * slidePosition}px)`;
    for (let i = 0; i < ctrlItems.length; i++) {
      let curent = ctrlItems[i].querySelector('.controls__btn');
      curent.classList.remove('controls__btn_active');
      if (slidePosition === -i) {
        curent.classList.add('controls__btn_active')
      }
    }
  }
  let sec = 0;
  let pause = false;
  sliderBtnLeft.addEventListener('click', ()=> {
    if (slidePosition === 0) {
      slidePosition = -2;
    } else {
      slidePosition++;
    }
    slideTo(slideWidth, slidePosition)
    sec = 0;
  })
  sliderBtnRight.addEventListener('click', ()=> {
    if (slidePosition === -2) {
      slidePosition = 0;
    } else {
      slidePosition--;
    }
    slideTo(slideWidth, slidePosition)
    sec = 0;
  })

  slider.addEventListener('mouseover', () => {
    pause = true;
    slider.querySelector('.controls__btn_active').querySelector('.controls__pro-bar') .style.animationPlayState = 'paused';
  })
  slider.addEventListener('mouseleave', () => {
    slider.querySelector('.controls__btn_active').querySelector('.controls__pro-bar') .style.animationPlayState = 'running';
    pause = false;
  })
  setInterval( () => {
    if (!pause && sec !== 5 ) {
      sec++;
    } else if (sec === 5) {
      if (slidePosition === -2) {
        slidePosition = 0;
      } else {
        slidePosition--;
      }
      slideTo(slideWidth, slidePosition)
      sec = 0;
    }
  },1000)

  let downPosition, upPosition;
  slider.addEventListener('mousedown', (e) => {
    downPosition = e.pageX;
  })
  slider.addEventListener('mouseup', (e) => {
    upPosition = e.pageX;
    if (downPosition > upPosition) {
      if (slidePosition === -2) {
        slidePosition = 0;
      } else {
        slidePosition--;
      }
      sec = 0;
      slideTo(slideWidth, slidePosition)
    } 
    if (downPosition < upPosition) {
      if (slidePosition === 0) {
        slidePosition = -2;
      } else {
        slidePosition++;
      }
      sec = 0;
      slideTo(slideWidth, slidePosition)
    }
  })
  slider.addEventListener('touchstart', (e) => {
    downPosition = e.changedTouches[0].pageX;
    slider.querySelector('.controls__btn_active').querySelector('.controls__pro-bar') .style.animationPlayState = 'paused';
    pause = true;

  })
  slider.addEventListener('touchend', (e) => {
    upPosition = e.changedTouches[0].pageX;
    slider.querySelector('.controls__btn_active').querySelector('.controls__pro-bar') .style.animationPlayState = 'running';
    pause = false;
    if (downPosition > upPosition) {
      if (slidePosition === -2) {
        slidePosition = 0;
      } else {
        slidePosition--;
      }
      sec = 0;
      slideTo(slideWidth, slidePosition)
    } 
    if (downPosition < upPosition) {
      if (slidePosition === 0) {
        slidePosition = -2;
      } else {
        slidePosition++;
      }
      sec = 0;
      slideTo(slideWidth, slidePosition)
    }
  })
}


//modal
const modal = body.querySelector('.modal');
console.log(modal)

const createModal = ( productName) => {
  const modalContent = document.createElement('div');
  let curentProduct;
  products.forEach(product => {
    if (productName === product.name) {
      curentProduct = product;
    }
  });
  modalContent.innerHTML = `
    <div class="modal__pic">
      <img src="${curentProduct.img}" alt="coffee" class="modal__img">
    </div>
    <div class="modal__info">
      <span class="modal__title h3">${curentProduct.name}</span>
      <span class="modal__text">${curentProduct.description}</span>
      <div class="setting setting-size">
        <span class="setting__title">Size</span>
        <ul class="setting__list">
          <li class="setting__item">
            <label class="setting__label">
            <input type="radio" class="setting__radio settings__input" checked="checked" name="Size" id="sm" data-price="${curentProduct.sizes.s.addPrice}">
            <div class="setting__btn">
            <span class="setting__icon">S</span>
            <span class="setting__name">${curentProduct.sizes.s.size}</span>
              </div>
            </label>
          </li>
          <li class="setting__item">
            <label class="setting__label">
            <input type="radio" class="setting__radio settings__input" name="Size" id="md" data-price="${curentProduct.sizes.m.addPrice}">
            <div class="setting__btn">
            <span class="setting__icon">M</span>
            <span class="setting__name">${curentProduct.sizes.m.size}</span>
              </div>
            </label>
          </li>
          <li class="setting__item">
            <label class="setting__label">
            <input type="radio" class="setting__radio settings__input" name="Size" id="lg" data-price="${curentProduct.sizes.l.addPrice}">
            <div class="setting__btn">
            <span class="setting__icon">L</span>
            <span class="setting__name">${curentProduct.sizes.l.size}</span>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div class="setting setting-additives">
        <span class="setting__title">Additives</span>
        <ul class="setting__list">
          <li class="setting__item">
            <label class="setting__label">
              <input type="checkbox" class="setting__checkbox settings__input" name="Additives" id="sugar" data-price="${curentProduct.additives[0].addPrice}">
              <div class="setting__btn">
                <span class="setting__icon">1</span>
                <span class="setting__name">${curentProduct.additives[0].name}</span>
              </div>
            </label>
          </li>
          <li class="setting__item">
            <label class="setting__label">
              <input type="checkbox" class="setting__checkbox settings__input" name="Additives" id="cinnamon" data-price="${curentProduct.additives[1].addPrice}">
              <div class="setting__btn">
                <span class="setting__icon">2</span>
                <span class="setting__name">${curentProduct.additives[1].name}</span>
              </div>
            </label>
          </li>
          <li class="setting__item">
            <label class="setting__label">
              <input type="checkbox" class="setting__checkbox settings__input" name="Additives" id="syrup" data-price="${curentProduct.additives[2].addPrice}">
              <div class="setting__btn">
                <span class="setting__icon">3</span>
                <span class="setting__name">${curentProduct.additives[2].name}</span>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div class="total" data-total="${curentProduct.price}">
        <span class="total__title">Total:</span>
        <span class="total__price">$${curentProduct.price}</span>
      </div>
      <div class="alert">
        <span class="alert__icon">
          <svg class="svg alert__svg">
            <use xlink:href="img/sprite.svg#info-empty"/>
          </svg>
        </span>
        <span class="alert__text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</span>
      </div>
      <button class="close-btn">Close</button>
    </div>`
  modalContent.classList.add('modal__content');
  return modalContent;
}

if (modal) {

  menuList.addEventListener('click', (e)=>{
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
      const productName = menuItem.querySelector('.menu-item__title').innerText;
      modal.classList.add('modal_active')
      modal.innerHTML =''
      modal.style.transform = `translate(0px, ${ window.scrollY}px)`;
      body.classList.add('no-scroll')
      modal.appendChild(createModal(productName));
    }
  })
  modal.addEventListener('click', (e)=>{
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-btn')) {
      body.classList.remove('no-scroll')
      modal.classList.remove('modal_active')
    }
    if (e.target.closest('.settings__input')) {
      let total = parseFloat(modal.querySelector('.total').dataset.total);
      const inputs = modal.querySelectorAll('input');
      inputs.forEach(input => {
        if (input.checked) {
          total += parseFloat(input.dataset.price)
        }
      });
      modal.querySelector('.total__price').innerText = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  })
}

