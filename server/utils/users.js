[{

}]

//addUser(id, name, room);
//removeUser(id);
//getUser(id);
//getUserList(room)

class Users {
  constructor() {
    this.users = []
  }
  addUser(id, name, room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    //set user
    var user = this.getUser(id);
    //if user exists, set user = filtered users
    if(user){
      this.users = this.users.filter((user)=>user.id!==id);
    }
    //return users
    return user;
  }
  getUser(id){
    //find user and return
    return this.users.filter((user)=>user.id===id)[0];
  }
  getUserList(room){
    var users = this.users.filter((user)=>user.room===room);
    var namesArray = users.map((user)=>user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`
//   }
// }
//
// var me = new Person('Ugur', 33);
// var description = me.getUserDescription();
// console.log(description);
