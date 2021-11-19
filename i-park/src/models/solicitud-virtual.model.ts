import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {LugarParqueadero} from './lugar-parqueadero.model';
import {Registro} from './registro.model';

@model()
export class SolicitudVirtual extends Entity {
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
  placaVehiculo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'LugarParqueadero',
    required: true,
  })
  lugar: any;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => LugarParqueadero)
  lugarParqueadero: LugarParqueadero;

  @belongsTo(() => Registro)
  registroId: string;

  constructor(data?: Partial<SolicitudVirtual>) {
    super(data);
  }
}

export interface SolicitudVirtualRelations {
  // describe navigational properties here
}

export type SolicitudVirtualWithRelations = SolicitudVirtual & SolicitudVirtualRelations;
