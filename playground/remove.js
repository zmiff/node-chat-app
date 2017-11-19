class Users {
  constructor() {
    this.users = []
  }
  removeUser(id){
    //find user
    var toRemove = this.users.filter((user)=>user.id===id);
    console.log(toRemove);
    //find indexOf
    var i = this.users.indexOf(toRemove[0]);
    console.log(i);
    //remove user
    if(i>=0){
    this.users.splice(i, 1);
    }
    //return users
    return this.users;
  }

  echoUsers(){
    console.log(this.users);
  }
}

users = new Users();
users.users = [{
  id: 1,
  name: 'Name1',
  room: 'Room1'
},{
  id: 2,
  name: 'Name2',
  room: 'Room2'
},{
  id: 3,
  name: 'Name3',
  room: 'Room1'
}];

users.removeUser(1);
users.echoUsers();
