import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SolicitudPresencial} from './solicitud-presencial.model';
import {SolicitudVirtual} from './solicitud-virtual.model';
import {Registro} from './registro.model';

@model()
export class LugarParqueadero extends Entity {
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
  numeroLugar: string;

  @property({
    type: 'string',
    required: true,
  })
  ancho: string;

  @property({
    type: 'string',
    required: true,
  })
  altura: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => SolicitudPresencial)
  solicitudPresencialId: string;

  @belongsTo(() => SolicitudVirtual)
  solicitudVirtualId: string;

  @belongsTo(() => Registro)
  registroId: string;

  constructor(data?: Partial<LugarParqueadero>) {
    super(data);
  }
}

export interface LugarParqueaderoRelations {
  // describe navigational properties here
}

export type LugarParqueaderoWithRelations = LugarParqueadero & LugarParqueaderoRelations;
