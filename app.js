let siteNameInput = document.querySelector('.site-name');
let siteUrlInput = document.querySelector('.site-url');
let submitButton = document.querySelector('.submit');
let visitButton = document.querySelector('.visit');
let deleteButton = document.querySelector('.delete');
let urlBox = document.querySelector('.web-url-box');
let massage = document.querySelector('.massage');
let allUrl = document.querySelector('.all-url');






class NamesLinks{
  constructor(name, link){
  this.name = name;
  this.link = link;
  }
}

class Storage{


  storeInLocal(item){
    let items;
    if(localStorage.getItem('items') === null){
     items = [];
     items.push(item)
     localStorage.setItem('items', JSON.stringify(items));
    } else{
      items = JSON.parse(localStorage.getItem('items'));
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    }
  }

  getFromLocal(){
    let items;
    if(localStorage.getItem('items') === null){
      items = [];
    } else{
      items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
  }
}



//class for ui

class UI{

  setLinkToVisit(url){
  let urlReOne = /^(https:\/\/)((www).)([(a-zA-Z0-9)]+).([a-zA-Z0-9]{2,5})(\/)?$/;
  let urlReTwo = /^((www).)([(a-zA-Z0-9)]+).([a-zA-Z0-9]{2,5})(\/)?$/;
  let urlReThree = /^([(a-zA-Z0-9)]+).([a-zA-Z0-9]{2,5})(\/)?$/;
  let link;
  if(urlReOne.test(url)){
   console.log('this url is urlReOne')
   return link = url;
  } else if(urlReTwo.test(url)){
    console.log('this url is urlReTwo')
    return link = `https://${url}`
  } else if(urlReThree.test(url)){
    console.log('this url is urlReThree')
    return link = `https://www.${url}`
  }
  
  return link;
  
  }

  giveMassage(adding,msg){
    if(adding === 'fail'){
    let div = document.createElement('div');
    div.className = 'massage';
    let p = document.createElement('p');
    p.textContent = msg;
    div.appendChild(p);

    urlBox.insertAdjacentElement("afterbegin", div);
    }
    if(adding === 'success'){
      let div = document.createElement('div');
      div.className = 'massage2';
      let p = document.createElement('p');
      p.textContent = msg;
      div.appendChild(p);
  
      urlBox.insertAdjacentElement("afterbegin", div);
      }
    
  }

  showLinks(siteName,url){
    let div = document.createElement('div');
    div.className = 'url-name';
    let h1 = document.createElement('h1');
    h1.textContent = siteName;
    let a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.textContent = 'visit';
    let button = document.createElement('button');
    button.className = 'delete';
    button.textContent = 'Delete'


   div.appendChild(h1);
   div.appendChild(a);
   div.appendChild(button);
    
   allUrl.insertAdjacentElement('beforeend', div);
  }

  clearInputs(){
    siteUrlInput.value = '';
    siteNameInput.value = '';
  }

  removeFromLocal(currentText){
  let links = JSON.parse(localStorage.getItem('items'));
  console.log(currentText);
  links.forEach(function(link, index){
    if(link.name === currentText){
    links.splice(index, 1);
    
    }
  })
  localStorage.setItem('items', JSON.stringify(links));
  }
}




//intentiate class variable
let ui = new UI();
let store = new Storage();

//get from local and display them
let sites = store.getFromLocal();
console.log(sites);
sites.forEach(function(site){
  ui.showLinks(site.name, site.link)
})

//submit event section

submitButton.addEventListener('click', submitEvent)

function submitEvent(e){
  console.log('submit event working')
  let nameInput = siteNameInput.value;
  let urlInput = siteUrlInput.value;
  let urlRe = /^(https:\/\/)?((www).)?([(a-zA-Z0-9)]+)(\.)([a-zA-Z0-9]{2,5})(\/)?$/

  if(!urlRe.test(urlInput)){
    console.log('not match')
    ui.giveMassage('fail', 'Put a valid url')
  } else{
    let visitLink = ui.setLinkToVisit(urlInput);
    const nameLink = new NamesLinks(nameInput, visitLink);
    store.storeInLocal(nameLink);
    
    console.log(nameLink);
    
    ui.giveMassage('success', 'Successfuly Added');
    // let visitLink = ui.setLinkToVisit(urlInput);
    console.log(visitLink);
    ui.showLinks(nameInput, visitLink)
    console.log('match');
    ui.clearInputs();
    
   
    
   
  }

  

  if(e.target.parentElement.previousElementSibling.previousElementSibling.children[0].classList.contains('massage') === true){
    console.log('massage class found');
    setTimeout(function(){
      e.target.parentElement.previousElementSibling.previousElementSibling.children[0].remove()
    }, 1000);
    
  }

  if(e.target.parentElement.previousElementSibling.previousElementSibling.children[0].classList.contains('massage2') === true){
    console.log('massage class found');
    setTimeout(function(){
      e.target.parentElement.previousElementSibling.previousElementSibling.children[0].remove()
    }, 1000);
    
  }
  
  

  e.preventDefault();
}




//delete event section
allUrl.addEventListener('click', deleteEvent);

function deleteEvent(x){
  console.log('event working');
  console.log(x.target.classList);
  if(x.target.classList.contains('delete')){
  console.log('delete class found');
  x.target.parentElement.remove();
  ui.removeFromLocal(x.target.parentElement.children[0].textContent)
  }
  console.log(x.target.parentElement.children[0].textContent)
}



