import {Entity, model, property, belongsTo} from '@loopback/repository';
import {DuenoLocal} from './dueno-local.model';

@model()
export class Local extends Entity {
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
  referenciaComercial: string;

  @property({
    type: 'string',
    required: true,
  })
  anoCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacionLocal: string;

  @belongsTo(() => DuenoLocal)
  duenoLocalId: string;

  constructor(data?: Partial<Local>) {
    super(data);
  }
}

export interface LocalRelations {
  // describe navigational properties here
}

export type LocalWithRelations = Local & LocalRelations;
