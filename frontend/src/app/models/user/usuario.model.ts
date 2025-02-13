export interface Usuario {
    access_token: string;
    usuario: {
        id: number;
        nombre: string;
        apellidos: string;
        email?: string;
        foto?: string;
        password?: string;
        telefono?: string;
        biografia?: string;
        vehiculos?: string;
        direccion?: string;
        rol: 'usuario' | 'admin' | 'moderador';
        token?: string;
    }

}