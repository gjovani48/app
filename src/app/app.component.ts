import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

import { UserService } from './user.service';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  private users:User[];
  private userName:String;
  private userAge:Number;

  updateUserName:String;
  updateUserAge:Number;
  userID;

  constructor(private userService:UserService){}

  ngOnInit(){

    this.getUsers();

  }

  getUsers(){

  	this.userService.getUsers().subscribe((data)=>{

      this.users = data;

  	});

  }

  getOneUser(id){

    this.userService.getOneUser(id).subscribe((data)=>{

      console.log(data);

      this.updateUserName = data.name;
      this.updateUserAge = data.age;
      this.userID  = data._id;

  	});

  }

  removeUser(id){

    if(confirm("Are you sure you want to remove this record?")){
      this.userService.removeUsers(id).subscribe(data=>{
        alert('deleted');
        this.getUsers();
      })
    }
  }

  updateUser(id){

    const user = new User();

      user.name = this.updateUserName;
      user.age = this.updateUserAge;

      if(confirm("save changes?")){

        if((this.updateUserName!=undefined && this.updateUserAge!=undefined)){

          this.userService.updateUsers(user,id).subscribe((data)=>{

            console.log(data);

            this.getUsers();

          });
        }
        else{

        }

      }


  }

  addUser(){

  	const user = new User();

      user.name = this.userName;
      user.age = this.userAge;


      if((this.userName!=undefined && this.userAge!=undefined)){

            this.userService.addUsers(user).subscribe((data)=>{

                  console.log(data);

                  this.getUsers();

                  alert("User Successfully Added");

              });
      }
      else{
      }
  }

}


