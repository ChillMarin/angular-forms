export interface User{
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
