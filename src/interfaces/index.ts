export interface IRegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface IuserProps {
  first_name: string;
  last_name: string;
  email: string;
  isAdmin: boolean;
  isDoctor: boolean;
  hasApplied: boolean;
  userId: string | null;
  unseenNotification: any;
  seenNotification: any;
}

