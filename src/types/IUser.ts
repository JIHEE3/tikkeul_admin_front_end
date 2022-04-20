export default interface IUser {
  id: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  avatar: File | null;
}