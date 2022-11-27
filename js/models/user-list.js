function UserList() {
  this.list = []

  this.addUser = function (user) {
    this.list.push(user)
    this.updateLocalStorage(this.list)
  }

  this.updateUser = function (user) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].username === user.username) {
        this.list[i] = user
        break
      }
    }
    this.updateLocalStorage(this.list)
  }

  this.delUser = function (user) {
    this.list.splice(user, 1)
    this.updateLocalStorage(this.list)
  }

  this.updateLocalStorage = function (list) {
    let userListString = JSON.stringify(list)
    localStorage.setItem('user-list', userListString)
  }
}