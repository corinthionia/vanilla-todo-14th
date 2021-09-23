const inputText = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');

let items = [{ text: '할일할일', isDone: false }];

// 입력한 할 일을 리스트에 추가
const addNewTodo = () => {
  const todoObject = {
    text: inputText.value,
    isDone: false,
  };

  items.push(todoObject);

  inputText.value = '';
  render();
};

addTodoBtn.addEventListener('click', addNewTodo);

// 삭제 버튼을 누르면 삭제
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

// 할 일 목록을 화면에 렌더하는 함수
const render = () => {
  todoList.innerHTML = 'TO DO';
  doneList.innerHTML = 'DONE';

  items.map((todo) => {
    const todoListItem = document.createElement('li');
    todoListItem.textContent = todo.text;
    todoListItem.onclick = toggleTodo;

    // 삭제 버튼 만들어서 붙이기
    const deleteBtn = document.createElement('i');
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.addEventListener('click', deleteTodo);

    todoListItem.appendChild(deleteBtn);
    if (todo.isDone) {
      doneList.append(todoListItem);
    } else {
      todoList.append(todoListItem);
    }
  });
};

render();
