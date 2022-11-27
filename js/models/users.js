function Users(_username, _fullName, _email, _password, _workDate, _baseSalary, _position, _workTime) {
  this.username = _username
  this.fullName = _fullName
  this.email = _email
  this.password = _password
  this.workDate = _workDate
  this.baseSalary = _baseSalary
  this.position = _position
  this.workTime = _workTime
  this.totalSalary = 0
  this.rank = ''

  this.getTotalSalary = function () {
    switch (this.position) {
      case 'Sếp':
        this.totalSalary = this.baseSalary * 3
        break;
      case 'Trưởng phòng':
        this.totalSalary = this.baseSalary * 2
        break;
      case 'Nhân viên':
        this.totalSalary = this.baseSalary
        break;
    }
  }

  this.getRank = function () {
    if (this.workTime >= 192) {
      this.rank = 'Xuất sắc'
    } else if (this.workTime >= 176) {
      this.rank = 'Giỏi'
    } else if (this.workTime >= 160) {
      this.rank = 'Khá'
    } else (this.rank = 'Trung bình')
  }
}