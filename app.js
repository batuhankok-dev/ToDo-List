// let inputDOM = document.querySelector('#input');

// let ekleBtn = document.querySelector('#ekleBtn');

// let ulDOM = document.querySelector('#list');

// ekleBtn.addEventListener("click", addTodo)

// function addTodo(e) {
//     let todo = inputDOM.ariaValueMax.trim()
//     if(todo.length > 0) {
//         addTodoList(todo)

//         deleteItim()

//         inputDOM.value = ""
//     } else{
//         $(".error.toast").toast("hide")
//     }
//     e.preventDefault()
// }

// function addTodoList(todo){
//     let liDOM = document.createElement('li')
//     liDOM.classList.add("li")
//     liDOM.innerHTML = `${todo}`
//     let span = document.createElement("span")
//     span.classList.add("close")
//     span.innerHTML = `x`

//     $(".success.toast").toast("show")

//     checkli(liDOM)

//     liDOM.append(span)
//     ulDOM.appendChild(liDOM)


//     let object = [todo]
//     let list = JSON.parse(localStorage.getItem("Todos"))
//     if(list) {
//         list.push(object)
//         localStorage.setItem("Todos", JSON.stringify(list))
//     } else {
//         localStorage.setItem("Todos", JSON.stringify(object))
//     }
// }

// function deleteItim() {
//     let deleteItim = document.querySelectorAll(".close")
//     if(deleteItim.length > 0) {
//         deleteItim.forEach(function(x){
//             x.addEventListener("click", function(){
//                 x.parentElement.remove()
//             })
//         })
//     }
// }

// function checkli(isaretlendi) {
// isaretlendi.addEventListener("click", function(){
//     if(isaretlendi.classList.contains("checked")){
//             isaretlendi.classList.remove("checked")
//         } else {
//             isaretlendi.classList.add("checked")
//         }
//     })
// }

const form = document.querySelector('#userForm')
const addInput = document.querySelector('#task')
const todoList = document.querySelector('#list')
const removeButton = document.querySelector('#list')
let todos = [];


runEvents();

// GENEL FONKS??YONLAR

function runEvents() {
    form.addEventListener('submit', addTodo)
    document.addEventListener('DOMContentLoaded', pageLoaded)
    removeButton.addEventListener('click', removeTodoToUI)
    donelist = addEventListener('click', listitemdone)
}

//SAYFA Y??KLEND??????NDE KAYDED??LM???? L??ST ??TEMLER?? YER??NE KOY

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })
}

// ??TEMLER??N ??ST??NE TIKLANDI??INDA BG-COLOR YE????L OLSUN

function listitemdone(event) {
    if (event.target.className === "listitem d-flex justify-content-between align-items-center") {
        const listItem = event.target;
        listItem.className = "bg-info listitem d-flex justify-content-between align-items-center"
    } else if (event.target.className === "bg-info listitem d-flex justify-content-between align-items-center") {
        const listItem = event.target;
        listItem.className = "listitem d-flex justify-content-between align-items-center"
    }

}

// ??TEMLER?? S??LMEK

function removeTodoToUI(event) {
    if (event.target.className === `float-right btn btn-outline-danger pb-0 pt-0`) {
        // EKRANDAN S??LME
        const todo = event.target.parentElement;
        todo.remove();
        // STORAGEDEN S??LME 
        const itemName = todo.firstChild.textContent;
        removeTodoToStorage(itemName);

    }
}

// LOCAL STORAGEDEN ??TEMLER?? S??LMEK

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


//??TEMLER?? EKLEMEK VE TOASTLARIN G??STER??LMES??

function addTodo(event) {
    const inputText = addInput.value.trim()
    if (inputText == null || inputText == "") {
        $(document).ready(function () {
            $('#liveToast2').toast({
                delay: 3000
            });
            $('#liveToast2').toast('show');
        });
    } else {
        // Aray??ze Ekleme
        addTodoToUI(inputText);
        $(document).ready(function () {
            $('#liveToast1').toast({
                delay: 3000
            });
            $('#liveToast1').toast('show');
        });
        // Storage Ekleme
        addTodoToStorage(inputText);
    }


    event.preventDefault();
}

//ARAY??ZE ??TEMLER??N EKLENMES??

function addTodoToUI(newtodo) {
    const li = document.createElement('li')
    li.className = "listitem d-flex justify-content-between align-items-center"

    const itemName = document.createElement('p')
    itemName.textContent = newtodo
    itemName.className = "itemname mb-0"

    const button = document.createElement('button')
    button.className = "float-right btn btn-outline-danger pb-0 pt-0"
    button.textContent = "Sil"

    todoList.appendChild(li)
    li.appendChild(itemName)
    li.appendChild(button)

    addInput.value = ""
}

//LOCAL STORAGE ??TEM EKLEME

function addTodoToStorage(newtodo) {
    checkTodosFromStorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// LOCAL STORAGE KONTROL

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}