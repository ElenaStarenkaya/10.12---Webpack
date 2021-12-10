const $taskForm = {
    input: document.querySelector('#new-task'),  // ссылка на  элементы страницы
    button: document.querySelector('#add-task'),   // ссылка на  элементы страницы
}

const $taskList = document.querySelector('.task-list');   // ссылка на  элементы страницы

let tasks = [];   // массив задач (название задачи и значение: выполнено/не выполнено)

let lastID = 1;

function IDGenerator() {   //генерирует уникальный id для каждой задачи
    return lastID++;
}

function addTask() {    //добавляет задачу в список: берет текст из инпута, помещает его в объект, который помещается в массив таскс
    const task = {};
    task.id = IDGenerator();
    task.title = $taskForm.input.value;
    task.done = false;
    tasks.push(task);
    render();
}

// {title:'', done:true}

// < div class="task-item" >
//     <input type="checkbox" class="task-item__done">
//         <span class="task-item__title">Купить воды</span>
//         <button class="task-item__delete">Delete</button>
//     </div>

function createTaskElement({ id, title, done }) {  //создает новый элемент
    const containerEl = document.createElement('DIV');   //создали див
    containerEl.classList.add('task-item');  //добавили класс диву

    const checkboxEl = document.createElement('INPUT');   // создали инпут
    checkboxEl.classList.add('task-item__checkbox'); //добавили инпуту класс
    checkboxEl.setAttribute('type', 'checkbox');   //добавили инпуту аттрибут

    const titleEl = document.createElement('SPAN');
    titleEl.classList.add('task-item__title');
    titleEl.textContent = title;

    const buttonEl = document.createElement('BUTTON');
    buttonEl.classList.add('task-item__delete');
    buttonEl.setAttribute('data-id', id);
    buttonEl.textContent = 'Delete';

    if (done) {
        checkboxEl.setAttribute('checked', 'checked');
        titleEl.classList.add('task-item__title--done');
    }

    // добавляем в див инпут, спан и батон
    containerEl.append(checkboxEl);
    containerEl.append(titleEl);
    containerEl.append(buttonEl);

    return containerEl;
}

// отрисовка на экране
function render() {
    $taskList.textContent = '';  //очищаем содержимое элемента (удаляет введенные 2 задачи,  записывает первые 2 заново и добавляет 3 задачу)
    for (let i = 0; i < tasks.length; i++) {
        $taskList.append(
            createTaskElement(tasks[i])
        )
    }
}

function deleteTask(id) {
    const i = tasks.findIndex((task) => task.id == id)   //проверяет нашли ли мы объект с нужным нам индексом, i - это индекс
    if (i !== -1) {  //то есть нашел, то есть true
     tasks.splice(i, 1);
     render();
    }
}

$taskForm.button.addEventListener('click', addTask);
$taskList.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {   //если мы нажали на кнопку
        const t_id = e.target.getAttribute('data-id');
        deleteTask(t_id);
    }
})

render();