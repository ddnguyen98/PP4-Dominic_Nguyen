
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
        html += `<div id="item${i}" class="m-2 px-3 bg-dark">`
    }
    html += 
    `<article class="${item}-4 p-2 bg-dark text-white" >`+
        `<input type="text" class="form-control" value="${data}" id="name"/>`+
        '<div class="d-flex justify-content-around  m-0 my-2">'+
            '<div class="form-check form-check-inline">'+
                '<input type="checkbox" id="steam" value="false">'+
                '<label class="" for="steam"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input type="checkbox" id="origin" value="false">'+
                '<label class="" for="origin"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input type="checkbox" id="epic" value="false">'+
                '<label class="" for="epic"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input type="checkbox" id="battle" value="false">'+
                '<label class="" for="battle"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input type="checkbox" id="uplay" value="false">'+
                '<label class="" for="uplay"></label>'+
            '</div>'+
        '</div>'+
        '<div class="d-flex justify-content-around">'+
            `<input class="btn btn-primary" type="button" value="Delete" id"delete" onclick="delGame('item${i}')">`+
            '<input class="btn btn-primary" type="button" value="Favorite">'+
            `<input class="btn btn-primary" type="button" value="Apply" id="apply" onclick="${type}populate('item${i}')">`+
        '</div>'+
'</article>'
    if(edit){
        html += '</div>'
    }
    return html
}

function delGame(idDel){
    let num = idDel.slice(4)
    glibrary['list'].splice(num, 1)
    addD()
    addM()

    //add
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
    html += `<div id="item${i}" class="m-2 px-3 bg-dark filteri">`
    html += 
    `<article class="${item}-4 py-2 bg-dark text-white" >`+
        `<div class="d-flex align-items-center" style="margin-bottom: 10px"><img onclick="edit('item${i}')" src="images/SVG/brandIcon.svg" width="70" height="70" style="margin-right: 5px"><h2>${val['name']}</h2></div>`+
        '<div class="d-flex justify-content-around" id="launchers">'
    if(val["steam"] == 'true'){
        html += `<img src="images/SVG/steam.svg" width="40" height="40" id="imgTrue">`      
    }
    else{
        html += `<img src="images/SVG/steam.svg" width="40" height="40" id="imgFalse">`      

    }

    if(val["origin"] == 'true'){
        html += `<img src="images/SVG/origin.svg" width="40" height="40" id="imgTrue">`      
    }
    else{
        html += `<img src="images/SVG/origin.svg" width="40" height="40" id="imgFalse">`      

    }
    if(val["epic"] == 'true'){
        html += `<img src="images/SVG/epic.svg" width="40" height="40" id="imgTrue">` 
    }

    else{
        html += `<img src="images/SVG/epic.svg" width="40" height="40" id="imgFalse">`

    }
    if(val["battle"] == 'true'){
        html += `<img src="images/SVG/battlenet.svg" width="40" height="40" id="imgTrue">`
    }
    else{
        html += `<img src="images/SVG/battlenet.svg" width="40" height="40" id="imgFalse">`

    }
    if(val["uplay"] == 'true'){
        html += `<img src="images/SVG/uplay.svg" width="40" height="40" id="imgTrue">`   
    }
    else{
        html += `<img src="images/SVG/uplay.svg" width="40" height="40" id="imgFalse">`

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
        html += createForm('row', glibrary['list'].length , 'd','' , true)
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

var modal = ''

window.onclick = function(event) {
  if (event.target == modal) {
    modal.remove()
  }
}
    


