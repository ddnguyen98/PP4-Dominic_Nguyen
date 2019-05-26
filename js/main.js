
let glibrary = ''

if(localStorage.getItem('glibrary')){
    glibrary = JSON.parse(localStorage.getItem('glibrary'))
    if(!glibrary['list'].length == 0){
        addD()
        addM()
    }
    else{
        
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

function createForm(item,i,type,data) {
    let html = ''
    if(!document.querySelector(`#${item}${i}`)){
        html += `<div id="item${i}">`
    }

    html += 
    `<form class="${item}-4 mx-2 my-2 p-2 bg-dark text-white" >`+
        `<input type="text" class="form-control" placeholder="${data}" id="name"/>`+
        '<div class="d-inline-flex">'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input" type="checkbox" id="steam" value="steam">'+
                '<label class="form-check-label" for="steam"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input" type="checkbox" id="origin" value="origin">'+
                '<label class="form-check-label" for="origin"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input" type="checkbox" id="epic" value="epic">'+
                '<label class="form-check-label" for="epic"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input" type="checkbox" id="battle" value="battle">'+
                '<label class="form-check-label" for="battle"></label>'+
            '</div>'+
            '<div class="form-check form-check-inline">'+
                '<input class="form-check-input" type="checkbox" id="uplay" value="uplay">'+
                '<label class="form-check-label" for="uplay"></label>'+
            '</div>'+
        '</div>'+
        '<div>'+
            `<input class="btn btn-primary" type="button" value="Delete" id"delete" onclick="delGame('item${i}')">`+
            '<input class="btn btn-primary" type="button" value="Favorite">'+
            `<input class="btn btn-primary" type="button" value="Apply" id="apply" onclick="${type}populate('item${i}')">`+
        '</div>'+
'</form>'

if(!document.querySelector(`#item${i}`)){
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

    document.querySelector(`#mItems #${idEdit}`).innerHTML = createForm('row', num, 'm', data)
    document.querySelector(`#dItems #${idEdit}`).innerHTML = createForm('row', num, 'd', data)
}

function mpopulate(formVal){
    let values = [];
    let num = formVal.slice(4)
    console.log(glibrary['list'].splice(num, 1))
    values.push(document.querySelector(`#mItems #${formVal} #name`).value)
    addM('game', values)
    addD()

}

function dpopulate(formVal){
    let values = [];

    values.push(document.querySelector(`#dItems #${formVal} #name`).value)
    addD('game', values)
    addM()
}

function createItem(item, val, i) {     
    let html = ''
    if(!document.querySelector(`#${item}${i}`)){
        html += `<div id="item${i}">`
    }
    html += 
    `<article class="${item}-4 mx-2 my-2 p-2 bg-dark text-white" >`+
        `<div class="d-flex align-items-center" style="margin-bottom: 10px"><img onclick="edit('item${i}')" src="images/SVG/brandIcon.svg" width="80" height="80" style="margin-right: 5px"><h2>${val['name']}</h2></div>`+
        '<div class="d-flex justify-content-around" id="launchers">'+
            '<img src="images/SVG/steam.svg" width="50" height="50" >'+
            '<img src="images/SVG/epic.svg" width="50" height="50"></img>'+
            '<img src="images/SVG/battlenet.svg" width="50" height="50">'+
            '<img src="images/SVG/uplay.svg" width="50" height="50">'+
            '<img src="images/SVG/origin.svg" width="50" height="50">'+
    '</div>'+
    '</article>'
    if(!document.querySelector(`#${item}${i}`)){
        html += `</div>`
    }
    return html
}

function addD(prop, val){
    let html = ''
    let counter = -1;

    if(prop== 'game'){
        glibrary['list'].push({"type":"game", "name": val[0]})
    }

    localStorage.setItem('glibrary', JSON.stringify(glibrary))

    glibrary['list'].forEach(e =>{
        counter++

        if(e.type == 'game'){
            html += createItem('row', e , counter)
        }

    })

    if(prop == 'form'){
        html += createForm('row', glibrary['list'].length , 'd')
    }

    document.querySelector('#dItems').innerHTML = html
}

function addM(prop, val){
    let html = ''
    let counter = -1;
    if(prop== 'game'){
        glibrary['list'].push({"type":"game", "name": val[0]})
    }
    localStorage.setItem('glibrary', JSON.stringify(glibrary))
    glibrary['list'].forEach(e =>{
        counter++

        if(e.type == 'game'){
            html += createItem('row', e , counter)
        }
    })
    if(prop == 'form'){
        html += createForm('row', glibrary['list'].length, 'm')
    }
    document.querySelector('#mItems').innerHTML = html
}
    


