
let glibrary = ''

if(localStorage.getItem('glibrary')){
    glibrary = JSON.parse(localStorage.getItem('glibrary'))
    if(!glibrary['list'].length == 0){
        addD()
        addM()
    }

}
else{
    let j = {"list":[]}    
    localStorage.setItem('glibrary', JSON.stringify(j))
    glibrary = JSON.parse(localStorage.getItem('glibrary'))

    let u = {"udetails":[]}
    localStorage.setItem('udetails', JSON.stringify(u))
}

document.querySelector('#dAddItem').addEventListener('click', e =>{
    addD('form')
    addM('form')
})

document.querySelector('#mAddItem').addEventListener('click', e =>{
    addM('form')
    addD('form')
})

function createForm(item,i,type,data,edit) {

    let html = ''
    if(edit){
        html += `<div id="item${i}" class="row-4 m-2 px-3 bg-dark">`
    }
    html += 
    `<article class=" py-2 bg-dark text-white" >`+
        `<input type="text" class="form-control" value="${data}" id="name"/>`+
        '<div class="d-flex justify-content-around m-0 my-2">'+
            '<div class="form-check  p-0 mx-1">'+
                '<input type="checkbox" id="steam" value="false">'+
                '<label class="" for="steam"></label>'+
            '</div>'+
            '<div class="form-check p-0 mx-1">'+
                '<input type="checkbox" id="origin" value="false">'+
                '<label class="" for="origin"></label>'+
            '</div>'+
            '<div class="form-check  p-0 mx-1">'+
                '<input type="checkbox" id="epic" value="false">'+
                '<label class="" for="epic"></label>'+
            '</div>'+
            '<div class="form-check  p-0 mx-1">'+
                '<input type="checkbox" id="battle" value="false">'+
                '<label class="" for="battle"></label>'+
            '</div>'+
            '<div class="form-check  p-0 mx-1">'+
                '<input type="checkbox" id="uplay" value="false">'+
                '<label class="" for="uplay"></label>'+
            '</div>'+
        '</div>'+
        '<div class="d-flex justify-content-around">'+
            `<input class="btn" type="button" value="Delete" id"delete" onclick="delGame('item${i}')">`+
            `<input class="btn" type="button" value="Apply" id="apply" onclick="${type}populate('item${i}')">`+
        '</div>'+
'</article>'
    if(edit){
        html += '</div>'
    }
    return html
}

function confirmation(){
    html = 
    '<div id="myModal" class="confirmation">'+
    '<p class="w-100">Are you sure?</p>'
    '<div class="container w-50">'+
    '<button>Yes</button'+
    '<button>No</button'+
    '</div>'+
    '</div>'

    document.querySelector('body').insertAdjacentHTML('afterbegin', html)
    modal = document.querySelector('#myModal')
}

function delGame(idDel){
    let num = idDel.slice(4)
    glibrary['list'].splice(num, 1)
    addD()
    addM()

}

function edit(idEdit){
    let num = idEdit.slice(4)
    let data = document.querySelector(`#mItems #${idEdit} h2`).innerHTML

    document.querySelector(`#mItems #${idEdit}`).innerHTML = createForm('row', num, 'm', data, false)
    document.querySelector(`#dItems #${idEdit}`).innerHTML = createForm('row', num, 'd', data, false)

    document.querySelectorAll(`input[type="checkbox"]`).forEach(e =>{
        e.addEventListener('change', checkChange)
    })
}

function checkChange(e){
    if(e.target.checked){
        document.querySelectorAll(`#${e.target.id} + label`).forEach(e =>{e.style.opacity = '1'})
        document.querySelectorAll(`#${e.target.id}`).forEach(e =>{e.value = 'true'})
    }
    else{
        document.querySelectorAll(`#${e.target.id} + label`).forEach(e =>{e.style.opacity = '0.5'})
        document.querySelectorAll(`#${e.target.id}`).forEach(e =>{e.value = 'false'})
    }
}

function mpopulate(formVal){
    let values = [];
    let num = formVal.slice(4)
    glibrary['list'].splice(num, 1)
    values.push(document.querySelector(`#mItems #${formVal} #name`).value)

    document.querySelectorAll(`#mItems input[type="checkbox"]`).forEach( e =>{
        values.push(e.value)
    })
    addM('game', values)
    addD()
}

function dpopulate(formVal){
    let values = [];
    let num = formVal.slice(4)
    glibrary['list'].splice(num, 1)
    values.push(document.querySelector(`#dItems #${formVal} #name`).value)

    document.querySelectorAll(`#mItems input[type="checkbox"]`).forEach( e =>{
        values.push(e.value)
    })
    addD('game', values)
    addM()
}

function createItem(item, val, i) { 
    let oppacityVal = []
    let html = ''
    html += `<div id="item${i}" class="${item}-4 m-2 px-3 bg-dark filteri" style="min-width:250px;">`
    html += 
    `<article class=" py-2 bg-dark text-white" >`+
        `<div class="d-flex align-items-center" id="fav" style="margin-bottom: 10px"><img onclick="edit('item${i}')" src="images/SVG/brandIcon.svg" width="70" height="70" style="margin-right: 5px"><h2>${val['name']}</h2></div>`+
        '<div class="d-flex justify-content-around" id="launchers">'

    if(val["steam"] == 'true'){
        html += `<img src="images/SVG/steam.svg" width="40" height="40" id="imgTrue" class="mx-1">`      
    }
    else{
        html += `<img src="images/SVG/steam.svg" width="40" height="40" id="imgFalse" class="mx-1">`      

    }

    if(val["origin"] == 'true'){
        html += `<img src="images/SVG/origin.svg" width="40" height="40" id="imgTrue" class="mx-1">`      
    }
    else{
        html += `<img src="images/SVG/origin.svg" width="40" height="40" id="imgFalse" class="mx-1">`      

    }
    if(val["epic"] == 'true'){
        html += `<img src="images/SVG/epic.svg" width="40" height="40" id="imgTrue" class="mx-1">` 
    }

    else{
        html += `<img src="images/SVG/epic.svg" width="40" height="40" id="imgFalse" class="mx-1">`

    }
    if(val["battle"] == 'true'){
        html += `<img src="images/SVG/battlenet.svg" width="40" height="40" id="imgTrue" class="mx-1">`
    }
    else{
        html += `<img src="images/SVG/battlenet.svg" width="40" height="40" id="imgFalse" class="mx-1">`

    }
    if(val["uplay"] == 'true'){
        html += `<img src="images/SVG/uplay.svg" width="40" height="40" id="imgTrue" class="mx-1">`   
    }
    else{
        html += `<img src="images/SVG/uplay.svg" width="40" height="40" id="imgFalse" class="mx-1">`

    }

            
 
     html +=   '</div>'+
     '</article>'+ `</div>`
    return html
}

function addD(prop, val){
    let html = ''
    let counter = -1;

    if(prop== 'game'){
        glibrary['list'].push({"type":"game", "name":val[0], "steam" : val[1], "origin" : val[2], "epic" : val[3], "battle" : val[4], "uplay" : val[5]})
    }

    localStorage.setItem('glibrary', JSON.stringify(glibrary))

    glibrary['list'].forEach(e =>{
        counter++

        if(e.type == 'game'){
            html += createItem('row', e , counter)
        }

    })

    if(prop == 'form'){
        html += createForm('col', glibrary['list'].length , 'd','' , true)
    }

    document.querySelector('#dItems').innerHTML = html
    document.querySelectorAll(`input[type="checkbox"]`).forEach(e =>{
        e.addEventListener('change', checkChange)
    })
}

function addM(prop, val){
    let html = ''
    let counter = -1;
    if(prop== 'game'){
        glibrary['list'].push({"type":"game", "name":val[0], "steam" : val[1], "origin" : val[2], "epic" : val[3], "battle" : val[4], "uplay" : val[5]})
    }
    localStorage.setItem('glibrary', JSON.stringify(glibrary))
    glibrary['list'].forEach(e =>{
        counter++
        if(e.type == 'game'){
            html += createItem('row', e , counter)
        }
    })
    if(prop == 'form'){
        html += createForm('row', glibrary['list'].length, 'm','',true)
    }
    document.querySelector('#mItems').innerHTML = html
    document.querySelectorAll(`input[type="checkbox"]`).forEach(e =>{
        e.addEventListener('click', checkChange)
    })
}

function filterItems(e){
    let input = document.querySelector(`#${e.id}`)
    let filter = input.value.toLowerCase()
    let filterItems = document.querySelectorAll('.filteri')
    let filterSelected = ''
    
    if(e.id == 'search'){
        filterSelected = document.querySelector('#gameTypes').value.toLowerCase()
    }
    else{
        filterSelected = document.querySelector('#mgameTypes').value.toLowerCase()
    }

    filterItems.forEach(e =>{
        let filterGame = e.querySelectorAll('#launchers img')
        if(filter.length == 0){
            e.style.display = "";
        }
        else if(e.querySelector('h2').innerHTML.toLowerCase().includes(filter)){
            if(filterSelected == 'filter'){
                e.style.display = "";
            }
            else if(filterSelected == 'steam' && filterGame[0].id == "imgTrue"){
                e.style.display = "";
            }
            else if(filterSelected == 'origin' && filterGame[1].id == "imgTrue"){
                e.style.display = "";
            }
            else if(filterSelected == 'epic' && filterGame[2].id == "imgTrue"){
                e.style.display = "";
            }
            else if(filterSelected == 'battle.net' && filterGame[3].id == "imgTrue"){
                e.style.display = "";
            }
            else if(filterSelected == 'uplay' && filterGame[4].id == "imgTrue"){
                e.style.display = "";
            }
            else{
                e.style.display = "none";
            }
        }
        else{
            e.style.display = "none";
        }
    })
}

function msearch(){
    let html = 
    '<div id="myModal" class="popUp ">'+
        '<div class="py-2 bg-dark w-100">'+
        '<form class="form-inline justify-content-around">'+
        '<input class="ml-4 py-1" type="text" class="form-control" style="width: 50%;" id="msearch" onkeyup="filterItems(this)"/>'+
            '<select class="custom-select w-25" style="max-width: 120px;" id="mgameTypes">'+
            '<option selected>Filter</option>'+
            '<option>Steam</option>'+
            '<option>Origin</option>'+
            '<option>Epic</option>'+
            '<option>Battle.Net</option>'+
            '<option>Uplay</option>'+
            '</select>'+
        '</form>'+
        '</div>'+
    '</div>'

    document.querySelector('.mnavbar').insertAdjacentHTML('afterbegin', html)
    modal = document.querySelector('#myModal')
}

function removeUp(){
    document.querySelector('#myModal').remove()
}

function profile(){
    values = JSON.parse(localStorage.getItem('udetails'))

    html = '<div id="myModal" class="profile">'+
    '<div class="container bg-dark" id="pcontent">'+
    '<form class="form-inline justify-content-around">'+
    `<input class="w-75 my-2" type="text" id="uname" value="${values[0]}"/>`+
    `<input class="w-75 my-2" type="text" id="pword"value="${values[1]}"/>`+
    '<button type="button" onclick="addUser()"class="w-50 btn">Save Details</button>'+
    '</form>'+
    '<div class="w-50 mx-auto mt-5">'+
    '<button class="w-100 my-2 p-3 btn" onclick="clearlib()" style="font-size: 25px">Delete Library</button>'+
    '<button class="w-100 my-2 p-3 btn" onclick="delAccount()" style="font-size: 25px">Delete Account</button>'+
    '</div>'+
    '</div>'+
'</div>'

document.querySelector('body').insertAdjacentHTML('afterbegin', html)
modal = document.querySelector('#myModal')
}

function savedetails(){
    let info = [document.querySelector('#uname').value, document.querySelector('#pword').value]
    localStorage.setItem('udetails', JSON.stringify(info))
}

function delAccount(){
    let j = {"list":[]}    
    localStorage.setItem('glibrary', JSON.stringify(j))

    let u = {"udetails":[]}
    localStorage.setItem('udetails', JSON.stringify(u))

    location.reload(true)

}

function checkUser(){
    values = JSON.parse(localStorage.getItem('udetails'))

    if(!(document.querySelector('#uname').value == values[0]) || !(document.querySelector('#pword').value == values[1])){

        html = '<div id="myModal" class="profile">'+
        '<div class="container bg-dark text-center" id="pcontent">'+
        '<p>Incorrect username or password</p>'+
        '</div>'+
        '</div>'

    document.querySelector('body').insertAdjacentHTML('afterbegin', html)
    modal = document.querySelector('#myModal')
    }
    else{
        showContent()
    }
}

function clearlib(){
    let j = {"list":[]}    
    localStorage.setItem('glibrary', JSON.stringify(j))
    glibrary = JSON.parse(localStorage.getItem('glibrary'))
    addD()
    addM() 
}

function showContent(){
    if(document.querySelector('#uname').value.length == 0 || document.querySelector('#pword').value.length == 0){
        html = '<div id="myModal" class="profile">'+
        '<div class="container bg-dark text-center" id="pcontent">'+
        '<p>Make sure you entered something</p>'
        '</div>'+
    '</div>'
    document.querySelector('body').insertAdjacentHTML('afterbegin', html)
    modal = document.querySelector('#myModal')
    }
    else{
        document.querySelector('#signin').style.display = 'none';
        document.querySelector('#signin').style.visibility = 'hidden';
        document.querySelector('#fcontent').style.display = 'block';
        document.querySelector('#fcontent').style.visibility = 'visible';
    }

}

function tourContent(){
    let html =
    
    '<div id="carouselExampleControls" class="carousel slide mx-auto mb-5" data-ride="carousel">'+
    '<div class="carousel-inner ">'+
    '<div class="carousel-item active">'+
      '<img class="w-100" src="./images/lib.png" alt="First slide">'+
    '</div>'+
    '<div class="carousel-item ">'+
      '<img class="w-100" src="./images/edit.png" alt="Second slide">'+
    '</div>'+
    '<div class="carousel-item">'+
      '<img class="w-100" src="./images/add.png" alt="Third slide">'+
    '</div>'+
    '<div class="carousel-item">'+
    '<img class="w-100" src="./images/filter.png" alt="Fourth slide">'+
  '</div>'+
  '</div>'+
  '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">'+
    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
    '<span class="sr-only">Previous</span>'+
  '</a>'+
  '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">'+
    '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
    '<span class="sr-only">Next</span>'+
    '</a>'+
    '</div>'+
    '<div class="w-100 text-center" id="tourcontent">'+
    '<h2 class="text-center mb-5">Features avaliable to you</h2>'+
    '<ul class="row p-0 ">'+
    '<li class="col-md-4 p-4"><h3>Add games</h3><p>Manage a large online game collection to combine games from all your launchers into one simple place</p></li>'+
    '<li class="col-md-4 p-4"><h3>Edit</h3><p>Edit them with ease by clicking on the logo with your item in it to quickly change the title and games launchers afiliated with it.</p></li>'+
    '<li class="col-md-4 p-4"><h3>Search</h3><p>Search by name along with by game type to find the perfect game you are looking for to enjoy a relaxing afternoon.</li></p>'+
    '<li class="col-md-4 p-4"><h3>Portable</h3><p>Manage games easily through mobile as well and launch them while you make your way home.</li></p>'+
    '<li class="col-md-4 p-4"><h3>Fast</h3><p>Quick and easy to start up your game with a single click of a button.</li></p>'+
    '<li class="col-md-4 p-4"><h3>Free!</h3><p>This is all for free as well. Sign up today to start your new massive game collection!</li></p>'+
    '</ul>'+
    '<button class="btn w-75" onclick="signup()">Sign Up!</button>'+
    '</div>'
    document.querySelector("#splash").innerHTML = html
}

function signup(){
    html = '<h2 class="text-center w-100">Sign up below to start your Unilaunchers Experience.</h2>'+
    '<form class="form-inline justify-content-around w-75 mx-auto" id="signup">'+
      '<input class="w-100 my-2" type="text" placeholder="Username"id="uname"/>'+
      '<input class="w-100 my-s2" type="text" placeholder="Password"id="pword"/>'+
      '<button type="button" class="w-100 btn" onclick="addUser()">Sign Up</button>'+
    '</form>'

    document.querySelector("#splash").innerHTML = html
}

function addUser(){
    if(document.querySelector('#uname').value.length == 0 || document.querySelector('#pword').value.length == 0){
        html = '<div id="myModal" class="profile">'+
        '<div class="container bg-dark text-center" id="pcontent">'+
        '<p>Make sure you entered something</p>'+
        '</div>'+
    '</div>'
    document.querySelector('body').insertAdjacentHTML('afterbegin', html)
    modal = document.querySelector('#myModal')
    }
    else{
        let info = [document.querySelector('#uname').value, document.querySelector('#pword').value]
        localStorage.setItem('udetails', JSON.stringify(info))
        showContent()
    } 

}


var modal = ''
window.onclick = function(event) {
  if (event.target == modal) {
    modal.remove()
  }
}
    


