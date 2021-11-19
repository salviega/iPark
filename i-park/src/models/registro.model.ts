import {Entity, model, property, hasOne} from '@loopback/repository';
import {SolicitudVirtual} from './solicitud-virtual.model';
import {LugarParqueadero} from './lugar-parqueadero.model';
import {SolicitudPresencial} from './solicitud-presencial.model';

@model()
export class Registro extends Entity {
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
  placa: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo: number;

  @property({
    type: 'LugarParqueadero',
    required: true,
  })
  lugar: any;

  @hasOne(() => SolicitudVirtual)
  solicitudVirtual: SolicitudVirtual;

  @hasOne(() => LugarParqueadero)
  lugarParqueadero: LugarParqueadero;

  @hasOne(() => SolicitudPresencial)
  solicitudPresencial: SolicitudPresencial;

  constructor(data?: Partial<Registro>) {
    super(data);
  }
}

export interface RegistroRelations {
  // describe navigational properties here
}

export type RegistroWithRelations = Registro & RegistroRelations;
