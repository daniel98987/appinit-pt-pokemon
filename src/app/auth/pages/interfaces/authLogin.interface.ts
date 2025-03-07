export interface AuthLogin {
    email:string,
    password:string
}


export interface User {
    id: string;
    name: string;
    roles:  string[];
}


export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
