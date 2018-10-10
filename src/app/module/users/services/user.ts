export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}


export const USERS_FIXTURES: User[] = [
  {
    id: 'uid4-1234-5678-9101',
    firstName: 'John',
    lastName: 'Public',
    email: 'john.public@gmail.com',
  },
  {
    id: 'uid4-1234-5678-9102',
    firstName: 'Elaine',
    lastName: 'Private',
    email: 'helen.oftroy@gmail.com',
  },
  {
    id: 'uid4-1234-5678-9103',
    firstName: 'Saul',
    lastName: 'Good',
    email: 'saul.good@gmail.com',
  },
  {
    id: 'uid4-1234-5678-9104',
    firstName: 'Peter',
    lastName: 'Yellow',
    email: 'p.yellow@gmail.com',
  },
  {
    id: 'uid4-1234-5678-9105',
    firstName: 'Kylie',
    lastName: 'Underwood',
    email: 'underwood.k@gmail.com',
  },
  {
    id: 'uid4-1234-5678-9106',
    firstName: 'Martin',
    lastName: 'Starter',
    email: 'start@gmail.com',
  }
];


