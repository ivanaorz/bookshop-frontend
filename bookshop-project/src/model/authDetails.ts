/** Here we define the data type of SigninAuthDetails' properties like username, password and role. */
export interface SigninAuthDetails {
    username: string;
    password: string;
    role: string;
  }
  
  export interface SignupAuthDetails extends SigninAuthDetails {}