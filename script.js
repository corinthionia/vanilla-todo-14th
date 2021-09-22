const todoList = document.querySelector('#todo-list');
const text = document.querySelector('#todo-input');

// 입력한 할 일을 리스트에 추가
const addNewTodo = () => {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.innerText = '✖';

  const newTodo = document.createElement('li');
  newTodo.textContent = text.value;
  newTodo.append(deleteBtn);
  todoList.append(newTodo);

  text.value = '';
};

// ➕ 버튼에 이벤트 연결
addTodoBtn.addEventListener('click', addNewTodo);
