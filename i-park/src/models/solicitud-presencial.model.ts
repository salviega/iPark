import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {LugarParqueadero} from './lugar-parqueadero.model';
import {Registro} from './registro.model';

@model()
export class SolicitudPresencial extends Entity {
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
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  duenoLocalId?: string;

  @hasOne(() => LugarParqueadero)
  lugarParqueadero: LugarParqueadero;

  @belongsTo(() => Registro)
  registroId: string;

  constructor(data?: Partial<SolicitudPresencial>) {
    super(data);
  }
}

export interface SolicitudPresencialRelations {
  // describe navigational properties here
}

export type SolicitudPresencialWithRelations = SolicitudPresencial & SolicitudPresencialRelations;
