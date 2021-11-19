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
  SolicitudVirtual,
  LugarParqueadero,
} from '../models';
import {SolicitudVirtualRepository} from '../repositories';

export class SolicitudVirtualLugarParqueaderoController {
  constructor(
    @repository(SolicitudVirtualRepository) protected solicitudVirtualRepository: SolicitudVirtualRepository,
  ) { }

  @get('/solicitud-virtuals/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudVirtual has one LugarParqueadero',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LugarParqueadero),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LugarParqueadero>,
  ): Promise<LugarParqueadero> {
    return this.solicitudVirtualRepository.lugarParqueadero(id).get(filter);
  }

  @post('/solicitud-virtuals/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudVirtual model instance',
        content: {'application/json': {schema: getModelSchemaRef(LugarParqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudVirtual.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {
            title: 'NewLugarParqueaderoInSolicitudVirtual',
            exclude: ['id'],
            optional: ['solicitudVirtualId']
          }),
        },
      },
    }) lugarParqueadero: Omit<LugarParqueadero, 'id'>,
  ): Promise<LugarParqueadero> {
    return this.solicitudVirtualRepository.lugarParqueadero(id).create(lugarParqueadero);
  }

  @patch('/solicitud-virtuals/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudVirtual.LugarParqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {partial: true}),
        },
      },
    })
    lugarParqueadero: Partial<LugarParqueadero>,
    @param.query.object('where', getWhereSchemaFor(LugarParqueadero)) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.solicitudVirtualRepository.lugarParqueadero(id).patch(lugarParqueadero, where);
  }

  @del('/solicitud-virtuals/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudVirtual.LugarParqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LugarParqueadero)) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.solicitudVirtualRepository.lugarParqueadero(id).delete(where);
  }
}
