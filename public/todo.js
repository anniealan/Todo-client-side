function render(root, component) {
  root.innerHTML = component;
}
const root = document.getElementById("app")

fetch('api/todos', {credentials: 'include'}).then(result => result.json()).then(result => {
  App.todos = result.tasks
  render(root, App.display(result.tasks))
})

const App = {
  todos: [],
  display(result) {
    return `<div id="form">${this.addForm()}</div> ${this.todoList(result)}`
  },

  addForm() {
    return (`<input type='text' id='title'>
         <button onclick="App.add(document.getElementById('title').value)">Add</button>
         <p id = "err"></p>`)
  },
  editForm(todo) {
    return (`<input type='text' value=${todo.title} id='title'>
          <button onclick="App.update('${todo._id}', document.getElementById('title').value)">Update</button>
          <p id = "err"></p>`)
  },
  todoList(result) {
    return `<ul>${result.map(item => this.singleTodo(item)).join("")}</ul>`
  },
  singleTodo(todo) {
    return (`<li>${todo.title}</li>
      <button onclick="App.edit('${todo._id}')">Edit</button>
      <button onclick="App.delete('${todo._id}')">Delete</button>`)
  },
  add(title) {
    if(title != "") {
      const initObj = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({title})
      }
      fetch('api/todos', initObj).then(result => result.json()).then(result => {
        this.todos = result
        render(root, this.display(result))
      })
    } else {
      document.getElementById("err").innerHTML = "Title cannot be empty"
    }
  },
  edit(_id) {

    const todo = this.todos.find(todo => todo._id === _id)
    render(document.getElementById("form"), this.editForm(todo))

  },
  update(_id, title) {
    if(title != "") {
      const initObj = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({title})
      }
      fetch(`api/todos/${_id}`, initObj).then(result => result.json()).then(result => {
        this.todos = result
        render(root, this.display(result))
      }).catch(err => console.log(err))
    } else {
      document.getElementById("err").innerHTML = "Title cannot be empty"
    }
  },
  delete(id) {
    fetch(`api/todos/${id}`, {method: "delete", credentials: 'include'})
    .then(result => result.json()).then(result => {
      this.todos = result
      render(root, this.display(result))
    }).catch(err => console.log(err))
  }
}
