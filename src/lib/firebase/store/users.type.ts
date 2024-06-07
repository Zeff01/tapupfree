export type Users = {
  company: string;
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  printStatus: boolean;
  user_link?: string;
};

export interface Photo {
  preview: string;
  raw: File;
}
