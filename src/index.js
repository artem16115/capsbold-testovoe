import './index.html'
import './index.scss'
import checkIcon from './icons/check.svg'

window.onload = function () {
    const openFormBtn = document.querySelector('#open-add-form')
    const addForm = document.querySelector('.add-todo-form')
    const closeFormBtn = document.querySelector('.close-form-button')
    const titleInput = document.querySelector('#form-title-input')
    const descrInput = document.querySelector('#form-description-input')
    const ulList = document.querySelector('.todo-list')
    let items = []

    const addOrRemoveChecked = (id) => {
        const index = items.findIndex(el => el.id == id)
        items[index].checked = !items[index].checked
        localStorage.setItem('ToDos', JSON.stringify(items));
        renderItems()
    }

    const renderItems = () => {
        items = JSON.parse(localStorage.getItem('ToDos')) || [];
        while (ulList.firstChild) {
            ulList.removeChild(ulList.lastChild);
        }
        if (items && items.length) {
            items.forEach(element => {
                ulList.appendChild(createItem(element))
            });
        }
    }

    const createItem = (element) => {
        const item = document.createElement("li");
        const checkbox = document.createElement("div");
        const textContainer = document.createElement("div");
        const title = document.createElement("span");
        const descr = document.createElement("span");
        const iconElem = document.createElement("img")
        item.classList.add('todo-item');
        checkbox.classList.add('custom-checkbox');
        textContainer.classList.add('item-text');
        title.classList.add('item-title');
        descr.classList.add('item-description');

        iconElem.src = checkIcon
        title.innerHTML = element.title
        descr.innerHTML = element.description
        item.id = element.id

        textContainer.appendChild(title)
        if (element.checked) {
            checkbox.appendChild(iconElem)
            checkbox.classList.add('checked')
            title.classList.add('checked')
        } else {
            textContainer.appendChild(descr)
        }
        item.appendChild(checkbox)
        item.appendChild(textContainer)

        item.addEventListener('click', () => addOrRemoveChecked(item.id))

        return item
    }


    const closeForm = () => {
        addForm.classList.remove('opened')
        titleInput.value = ''
        descrInput.value = ''
    }

    const saveToDo = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (!formProps.title || formProps.title.trim().length === 0) return

        formProps.id = new Date().valueOf();
        formProps.checked = false;

        items.push(formProps)
        localStorage.setItem('ToDos', JSON.stringify(items));

        closeForm()
        renderItems()
    }

    openFormBtn.addEventListener('click', () => {
        addForm.classList.add('opened')
    })

    closeFormBtn.addEventListener('click', () => {
        closeForm()
    })

    addForm.addEventListener("submit", saveToDo);
    renderItems();
}
