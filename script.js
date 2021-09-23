const inputText = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const doneList = document.querySelector('#done-list');

const items = [];

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

// 할 일 목록을 화면에 렌더하는 함수
const render = () => {
  // 삭제 버튼 붙이기
  const deleteBtn = document.createElement('i');
  deleteBtn.setAttribute('class', 'delete-btn');

  const todoListItem = document.createElement('li');

  items.map((todo) => {
    todoListItem.textContent = todo.text;
    todoListItem.appendChild(deleteBtn);
    if (todo.isDone) {
      doneList.append(todoListItem);
    } else {
      todoList.append(todoListItem);
    }
  });
};
