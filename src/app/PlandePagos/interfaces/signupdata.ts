export interface SignupData {
    id: number;
 firstName: string;
  lastName: string;
    phone: number;
    email: string;
    dni:string;
    password: string;
    confirmPassword: string;
    profileImage?: string; // Permite que profileImage sea opcional
    direccion?: string; // Permite que direccion sea opcional
}
