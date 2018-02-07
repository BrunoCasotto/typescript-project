import User from './user';
import AccessLevel from './accessLevel';
import Departments from './departments';

/*
* Super user class
*/
export default class SuperUser extends User {
  level: AccessLevel;
  sector: Departments
}
