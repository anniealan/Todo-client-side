function render(root, component) {
  root.innerHTML = component;
}
const root = document.getElementById("app")

fetch('api/todos').then(result => result.json()).then(result => {
  App.todos = result
  render(root, App.display(result))
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
          <button onclick="App.update(${todo.id}, document.getElementById('title').value)">Update</button>
          <p id = "err"></p>`)
  },
  todoList(result) {
    return `<ul>${result.map(item => this.singleTodo(item)).join("")}</ul>`
  },
  singleTodo(todo) {
    return (`<li>${todo.title}</li>
      <button onclick="App.edit(${todo.id})">Edit</button>
      <button onclick="App.delete(${todo.id})">Delete</button>`)
  },
  add(title) {
    if(title != "") {
      const initObj = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
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
  edit(id) {
    const todo = this.todos.find(todo => todo.id === id)
    render(document.getElementById("form"), this.editForm(todo))

  },
  update(id, title) {
    if(title != "") {
      const initObj = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
      }
      fetch(`api/todos/${id}`, initObj).then(result => result.json()).then(result => {
        this.todos = result
        render(root, this.display(result))
      }).catch(err => console.log(err))
    } else {
      document.getElementById("err").innerHTML = "Title cannot be empty"
    }
  },
  delete(id) {
    fetch(`api/todos/${id}`, {method: "delete"}).then(result => result.json()).then(result => {
      this.todos = result
      render(root, this.display(result))
    }).catch(err => console.log(err))
  }
}
