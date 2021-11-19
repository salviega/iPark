import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Local} from './local.model';
import {Vehiculo} from './vehiculo.model';
import {SolicitudPresencial} from './solicitud-presencial.model';

@model()
export class DuenoLocal extends Entity {
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

  @hasMany(() => Local)
  locals: Local[];

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @hasOne(() => SolicitudPresencial)
  solicitudPresencial: SolicitudPresencial;

  constructor(data?: Partial<DuenoLocal>) {
    super(data);
  }
}

export interface DuenoLocalRelations {
  // describe navigational properties here
}

export type DuenoLocalWithRelations = DuenoLocal & DuenoLocalRelations;
