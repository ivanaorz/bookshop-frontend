/** Here we define the data type of properties username and password. */
export interface SigninAuthDetails {
    username: string;
    password: string;
  }
  
  export interface SignupAuthDetails extends SigninAuthDetails {}