export class userLevelAccess{

  // this service is for checking/determining if user is admin or not
  myLocalDatails = JSON.parse(localStorage.getItem('userData')|| '{}');
  // create a property
  userLevel = false;
  myLevel = this.myLocalDatails.user_role;

  constructor(){}

  accessLevel(){
    return this.userLevel;
  }

  myAccessLevel(){
    return this.myLevel;
  }
}
