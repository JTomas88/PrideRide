export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email?: string;
    password?: string;
    telefono?: string;
    biografia?: string;
    vehiculos?: string;
    direccion?: string;
    rol: 'usuario' | 'admin' | 'moderador';
    token?: string;
}