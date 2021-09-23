const inputText = document.querySelector('#todo-input');

const todoList = [];
const doneList = [];

// 입력한 할 일을 리스트에 추가
const addNewTodo = () => {
  const todoObject = {
    text: inputText.value,
    isDone: false,
  };

  todoList.push(todoObject);

  inputText.value = '';
};

addTodoBtn.addEventListener('click', addNewTodo);
