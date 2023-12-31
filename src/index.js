
// Є Discovery API (https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2)
// API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
// Потрібно відрендерити колекцію  івентів і реалізувати пагінацію
// за допомогою бібліотеки tui - pagination(https://www.npmjs.com/package/tui-pagination)
// запит робимо використовуючи fetch().
import {pagination} from './pagination'


const backdropEl = document.querySelector('.backdrop')
const modalEl = document.querySelector('.modal')

const formEl = document.querySelector('.form')
const list = document.querySelector('.gallery')
const page = pagination.getCurrentPage()
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/'
const API_KEY = 'uHSLi07StIOlriMPxJGxUbSYsHDs6AFx';
let query = '';

formEl.addEventListener('submit', onFormSearch)

function onFormSearch(e) {
    e.preventDefault();
    console.log(e);
    query = e.target.elements.input.value;
    console.log(query);

    renderFirstPage(page, query)

}

list.addEventListener('click', onItemClick)

function onItemClick(e) {
    const id = e.target.id
    console.log(id);
    backdropEl.classList.remove('is-hidden')
    createModalMarkup(id)

}

backdropEl.addEventListener('click', onclickBackdrop)

function onclickBackdrop() {
    backdropEl.classList.add('is-hidden')
}

function fetchDataId(id) {
    return fetch(`${BASE_URL}events.json?apikey=${API_KEY}&id=${id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error                
            }
            return res.json();
                    })
        .catch((err) => { console.log(err);})

}


function createModalMarkup(id) {
    fetchDataId(id).then((data) => {
        console.log(data);

        
        const markup = `<img src="${data._embedded.events[0].images[0].url}" alt="${data._embedded.events[0].name}"><p>${data._embedded.events[0].name}</p>`
        
        modalEl.innerHTML = markup;

})
    
}




function fetchData(page, query) {
    return fetch(`${BASE_URL}events.json?apikey=${API_KEY}&page=${page}&keyword=${query}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error                
            }
            return res.json();
            
        })
        .catch((err) => { console.log(err);})

}
renderFirstPage(page, query)

function renderFirstPage(page,query) {
    fetchData(page, query).then(data => {
        pagination.reset(data.page.totalElements);
createMarkup(data._embedded.events)    }
    )
        .catch((err) => {
        console.log(err)
    
    }) 
}

function createMarkup(arr) {
    const markup = arr.map(({ name, id }) => `<li id="${id}"><p id="${id}">${name}</p></li>`).join('');
    list.innerHTML = markup;
}
function renderEvt(page, query) {
    fetchData(page, query).then(data => {
        
createMarkup(data._embedded.events)    }
    )
    .catch(() => {
    
    }) 
}
pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    renderEvt(currentPage, query)
  console.log(currentPage);
});


// async function servicesCountry() {
//     const resp = await fetch('https://restcountries.com/v3.1/name/Ukraine')
//     console.log(resp);

//     if (!resp.ok) {
//         throw new Error(resp.statusText)
//     }
//     const data = await resp.json()
// }
// servicesCountry()

// function reverseString(str) {
//     const a = str.split('').reverse().join('');
//     console.log(a);
//   return a;
// }

// reverseString("hello");

// function findLongestWordLength(str) {
//     const arrWords = str.split(' ');
//     let longWord=0;

//     for (let i = 0; i < arrWords.length; i += 1) {
//         if (arrWords[i].length > longWord) {
//             longWord = arrWords[i].length;
        
      
//         }

//     }return longWord
// }

// findLongestWordLength("The quick brown fox jumped over the lazy dog");

// function largestOfFour(arr) {
//     let results = [];
// for (let i = 0; i < arr.length; i++) {
//     const largestNumber = arr[i][0];
//     for (let j = 1; j < arr[i].length; j++) {
//        if (arr[i][j] > largestNumber) {
//         largestNumber = arr[i][j];
        
//     }
    
// }results[i] = largestNumber;
//   }

//   return results;
// }

// largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

// function repeatStringNumTimes(str, num) {
//     let newStr = '';
//     if (num <= 0) {
//         return
//     } else {
//         for (let i = 1; i <= num; i += 1) {
//              newStr+=str
//         }

//     } return newStr
// }

// repeatStringNumTimes("abc", 3);

function truncateString(str, num) {
let newStr='';
    if (str.length > num) {
       
        newStr = str.slice(num - 1).concat('...')
        console.log(newStr);
  }
  return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);