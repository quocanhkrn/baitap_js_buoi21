// GLOBAL FUNCTION
function DOM(id) {
  return document.getElementById(id)
}

function appendEle(parent, tag, content = '') {
  let elem = document.createElement(tag)
  elem.innerText = content
  parent.appendChild(elem)
}

// DISPLAY TABLE
function displayUserList(list = userList.list) {
  let table = DOM('user-list')
  table.innerHTML = ''
  for (let user of list) {
    let tr = document.createElement('tr')
    appendEle(tr, 'td', user.username)
    appendEle(tr, 'td', user.fullName)
    appendEle(tr, 'td', user.email)
    appendEle(tr, 'td', user.workDate)
    appendEle(tr, 'td', user.position)
    appendEle(tr, 'td', user.totalSalary.toLocaleString('en-us'))
    appendEle(tr, 'td', user.rank)
    let td = document.createElement('td')
    td.classList = `options-btns d-flex flex-column`
    td.innerHTML = `<button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#myModal" onclick="initializeUpdateModal(this)">Cập nhật</button>`
    td.innerHTML += `<button type="button" class="btn btn-sm btn-danger" onclick="delUser(this)">Xoá</button>`
    tr.appendChild(td)
    table.appendChild(tr)
  }
}

// DELETE USER
function delUser(btn) {
  const td = btn.parentElement.parentElement.children
  for (let i = 0; i < userList.list.length; i++) {
    if (userList.list[i].username === td[0].innerText) {
      userList.delUser(i)
      displayUserList()
      break
    }
  }
}

// SEARCH RANK
DOM('search-rank').addEventListener('keyup', function (e) {
  let value = this.value.toUpperCase()
  if (value === '' || value.indexOf(' ') === 0) {
    displayUserList()
  } else {
    let result = new Array
    for (user of userList.list) {
      let rank = user.rank.toUpperCase()
      if (rank.indexOf(value) === 0) {
        result.push(user)
      }
    }
    displayUserList(result)
  }
})

// ADD NEW USER
function newUser() {
  DOM('username').disabled = false

  let username = DOM('username').value
  let fullName = DOM('full-name').value
  let email = DOM('email').value
  let password = DOM('password').value
  let workDate = DOM('work-date').value
  let baseSalary = parseInt(DOM('base-salary').value)
  let position = DOM('position').value
  let workTime = parseInt(DOM('work-time').value)

  let newUser = new Users(username, fullName, email, password, workDate, baseSalary, position, workTime)
  newUser.getRank()
  newUser.getTotalSalary()
  for (let user of userList.list) {
    if (username === user.username)
      return alert('Đã tồn tại người dùng này!')
  }
  userList.addUser(newUser)
}

// UPDATING MODAL
function initializeUpdateModal(btn) {
  DOM('updateUser').style.display = 'inline-block'
  DOM('addUser').style.display = 'none'

  const td = btn.parentElement.parentElement.children
  const username = td[0].innerText
  for (let user of userList.list) {
    if (user.username === username) {
      DOM('username').value = user.username
      DOM('username').disabled = true
      DOM('full-name').value = user.fullName
      DOM('email').value = user.email
      DOM('work-date').value = user.workDate
      DOM('base-salary').value = user.baseSalary
      DOM('position').value = user.position
      DOM('work-time').value = user.workTime
      break
    }
  }

  document.getElementById('form').onsubmit = function () {
    let username = DOM('username').value
    let fullName = DOM('full-name').value
    let email = DOM('email').value
    let password = DOM('password').value
    let workDate = DOM('work-date').value
    let baseSalary = parseInt(DOM('base-salary').value)
    let position = DOM('position').value
    let workTime = parseInt(DOM('work-time').value)
    let newUser = new Users(username, fullName, email, password, workDate, baseSalary, position, workTime)
    newUser.getRank()
    newUser.getTotalSalary()
    userList.updateUser(newUser)
  }
}

// INITIALIZE
let userList = new UserList()
if (localStorage.key('user-list')) {
  userList.list = JSON.parse(localStorage.getItem('user-list'))
}
displayUserList()

DOM('newUser').addEventListener('click', function (e) {
  DOM('updateUser').style.display = 'none'
  DOM('addUser').style.display = 'inline-block'
})