export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  picturePath: string;
}

export type UserOptional = Partial<User>;
