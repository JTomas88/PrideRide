export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email?: string;  // Opcional porque podría ser null o vacío
    password?: string;  // Opcional dependiendo de si quieres manipular la contraseña en el frontend
    telefono?: string;
    biografia?: string;
    vehiculos?: string;
    direccion?: string;
    rol: 'usuario' | 'admin' | 'moderador';  // Tipo enum, puedes usar los valores como en tu backend
}