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
    return `<div id="form">${this.AddForm()}</div> ${this.TodoList(result)}`
  },

  AddForm() {
    return (`<input type='text' id='title'>
         <button onclick="App.add(document.getElementById('title').value)">Add</button>`)
  },
  editForm(todo) {
    return (`<input type='text' value=${todo.title} id='title'>
          <button onclick="App.update(${todo.id}, document.getElementById('title').value)">Update</button>`)
  },
  TodoList(result) {
    return `<ul>${result.map(item => this.SingleTodo(item)).join("")}</ul>`
  },
  SingleTodo(todo) {
    return (`<li>${todo.title}</li>
      <button onclick="App.edit(${todo.id})">Edit</button>
      <button onclick="App.delete(${todo.id})">Delete</button>`)
  },
  add(title) {
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

  },
  edit(id) {
    const todo = this.todos.find(todo => todo.id === id)
    render(document.getElementById("form"), this.editForm(todo))

  },
  update(id, title) {
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
  },
  delete(id) {
    fetch(`api/todos/${id}`, {method: "delete"}).then(result => result.json()).then(result => {
      this.todos = result
      render(root, this.display(result))
    }).catch(err => console.log(err))
  }
}
