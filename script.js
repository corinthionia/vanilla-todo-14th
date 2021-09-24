const inputText = document.querySelector('#todo-input');
const addTodoBtn = document.querySelector('#add-todo-btn');
const todoListTitle = document.querySelector('#todo-list-title');
const doneListTitle = document.querySelector('#done-list-title');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.done-list');

let items = [];

// 입력한 할 일을 items 리스트에 추가
const addNewTodo = () => {
  const todoObject = {
    text: inputText.value,
    isDone: false,
  };

  // 공백 입력, 중복 입력 방지
  const index = items.findIndex((todo) => todo.text == inputText.value);
  if (inputText.value && index === -1) {
    items.push(todoObject);
    render();
  }

  // 할 일 추가 후 인풋 값 비우기
  inputText.value = '';
};

addTodoBtn.addEventListener('click', addNewTodo);

// 삭제 버튼을 누르면 해당하는 항목 삭제
const deleteTodo = (e) => {
  items = items.filter((todo) => todo.text !== e.target.parentNode.textContent);

  render();
};

// 할 일의 isDone을 토글
const toggleTodo = (e) => {
  const todo = items.find((todo) => todo.text === e.target.textContent);
  todo.isDone = !todo.isDone;

  render();
};

// 할 일 목록을 화면에 렌더링
const render = () => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // 할 일과 완료한 일의 개수 세기
  const doneTodoCnt = items.filter((todo) => todo.isDone).length;
  const todoCnt = items.length - doneTodoCnt;
  todoListTitle.innerHTML = `📋 TO DO (${todoCnt})`;
  doneListTitle.innerHTML = `💿 DONE (${doneTodoCnt})`;

  items.map((todo) => {
    const todoListItem = document.createElement('li');
    const todoListItemText = document.createElement('span');
    todoListItemText.textContent = todo.text;
    todoListItemText.addEventListener('click', toggleTodo);
    todoListItem.appendChild(todoListItemText);

    // 삭제 버튼 만들어서 붙이기
    const deleteBtn = document.createElement('i');
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.addEventListener('click', deleteTodo);

    todoListItem.appendChild(deleteBtn);
    todo.isDone
      ? doneList.appendChild(todoListItem)
      : todoList.appendChild(todoListItem);
  });

  // Local Storage에 items 배열을 저장
  localStorage.setItem('todoItems', JSON.stringify(items));
};

// Local Storage에 저장된 목록 불러오기
const getFromLocalStorage = () => {
  const savedItems = localStorage.getItem('todoItems');
  if (savedItems) {
    items = JSON.parse(savedItems);
    render();
  }
};

getFromLocalStorage();
