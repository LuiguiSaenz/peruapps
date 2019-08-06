import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'util';
declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _users: UsersService,
    private modalService: NgbModal
  ) { 
    this.getUsers();
  }

  users: Array<any>
  page: number = 1
  total: number
  pageSize: number
  userSelectedId: number
  name: string
  lastName1: string
  lastName2: string
  email: string
  birthday: Object

  getUsers() {
    let partialUrl = "?page=" + this.page.toString()
    this._users.listUsers(partialUrl).subscribe(({data, total, per_page}) => {
      this.users = data
      this.pageSize = per_page
      this.total = total  
    })
  }

  open(content, userId) {
    this.userSelectedId = userId
    this.modalService.open(content)
  }

  send() {
    let form = new FormData()
    form.append("nombre", this.name)
    form.append("apellidopat", this.lastName1)
    form.append("apellidomat", this.lastName2)
    form.append("email", this.email)
    let birthdayString = (this.birthday.day > 9 ? this.birthday.day : "0" + this.birthday.day) + "/" + (this.birthday.month > 9 ? this.birthday.month : "0" + this.birthday.month) + "/" + this.birthday.year
    form.append("fchnac", birthdayString)
    form.append("fchingreso", birthdayString)
    this._users.addUser(form).subscribe((response) => {
      console.log(response)
    })
  }
  ngOnInit() {
  }

}
