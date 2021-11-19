import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DuenoLocal,
  Vehiculo,
} from '../models';
import {DuenoLocalRepository} from '../repositories';

export class DuenoLocalVehiculoController {
  constructor(
    @repository(DuenoLocalRepository) protected duenoLocalRepository: DuenoLocalRepository,
  ) { }

  @get('/dueno-locals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of DuenoLocal has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.duenoLocalRepository.vehiculos(id).find(filter);
  }

  @post('/dueno-locals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'DuenoLocal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DuenoLocal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInDuenoLocal',
            exclude: ['id'],
            optional: ['duenoLocalId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.duenoLocalRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/dueno-locals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'DuenoLocal.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenoLocalRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/dueno-locals/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'DuenoLocal.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.duenoLocalRepository.vehiculos(id).delete(where);
  }
}
