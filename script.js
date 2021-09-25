const inputText = document.querySelector('#todo-input');
const addTodoBtn = document.querySelector('#add-todo-btn');
const todoListTitle = document.querySelector('#todo-list-title');
const doneListTitle = document.querySelector('#done-list-title');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.done-list');

let items = [];

// 입력한 할 일을 items에 추가
const addNewTodo = () => {
  const todoObject = {
    id: null,
    text: inputText.value,
    isDone: false,
  };

  // 공백 입력, 중복 입력 방지
  const index = items.findIndex((todo) => todo.text === inputText.value);
  if (inputText.value && index === -1) {
    items.push(todoObject);
    render();
  }

  // 할 일 추가 후 인풋 값 비우기
  inputText.value = '';
};

addTodoBtn.addEventListener('click', addNewTodo);

// 엔터를 눌러도 입력되도록
const enterKey = () => {
  if (window.event.keyCode === 13) {
    addNewTodo();
  }
};

// 삭제 버튼을 누르면 해당하는 항목 삭제
const deleteTodo = (e) => {
  items = items.filter((todo) => 'bin' + todo.id !== e.target.id);
  render();
};

// 할 일의 isDone을 토글
const toggleTodo = (e) => {
  const todo = items.find((todo) => 'todo' + todo.id === e.target.id);
  todo.isDone = !todo.isDone;

  render();
};

// 할 일 목록을 화면에 렌더링
const render = () => {
  // 할 일과 완료한 일의 개수 세기

  const doneTodoCnt = items.filter((todo) => todo.isDone).length;
  const todoCnt = items.length - doneTodoCnt;

  todoListTitle.innerHTML = `📋 TO DO (${todoCnt})`;
  doneListTitle.innerHTML = `💿 DONE (${doneTodoCnt})`;

  // 렌더링 전 todoList와 doneList 비우기
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // 리스트로 만들어 보여주기
  items.map((todo, index) => {
    // id 값 부여
    todo.id = index;

    // 리스트 만들기
    const todoListItem = document.createElement('li');
    const todoListItemText = document.createElement('span');
    todoListItemText.setAttribute('id', 'todo' + index);
    todoListItemText.textContent = todo.text;
    todoListItemText.addEventListener('click', toggleTodo);
    todoListItem.appendChild(todoListItemText);

    // 삭제 버튼 만들어서 붙이기
    const deleteBtn = document.createElement('i');
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.setAttribute('id', 'bin' + index);
    deleteBtn.addEventListener('click', deleteTodo);

    todoListItem.append(deleteBtn);
    todo.isDone ? doneList.append(todoListItem) : todoList.append(todoListItem);
  });

  // Local Storage에 items 배열을 저장
  localStorage.setItem('todoItems', JSON.stringify(items));
};

// Local Storage에 저장된 목록 불러오기
const getFromLocalStorage = () => {
  const savedItems = localStorage.getItem('todoItems');

  if (savedItems) {
    items = JSON.parse(savedItems);
  }

  render();
};

getFromLocalStorage();
