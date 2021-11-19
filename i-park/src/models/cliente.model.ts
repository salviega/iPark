import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {SolicitudVirtual} from './solicitud-virtual.model';
import {SolicitudPresencial} from './solicitud-presencial.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasMany(() => SolicitudVirtual)
  solicitudVirtuals: SolicitudVirtual[];

  @hasOne(() => SolicitudPresencial)
  solicitudPresencial: SolicitudPresencial;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
