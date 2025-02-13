import { Usuario } from "../user/usuario.model";

export interface Viaje {
  id: number;
  origen: string;
  destino: string;
  plazas: number;
  hora_salida: string;
  fecha_salida: string;
  ruta_seleccionada?: any;
  usuario_id: number;
  created_at: string;
  usuario?: any; 
}
