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
  SolicitudPresencial,
  LugarParqueadero,
} from '../models';
import {SolicitudPresencialRepository} from '../repositories';

export class SolicitudPresencialLugarParqueaderoController {
  constructor(
    @repository(SolicitudPresencialRepository) protected solicitudPresencialRepository: SolicitudPresencialRepository,
  ) { }

  @get('/solicitud-presencials/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudPresencial has one LugarParqueadero',
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
    return this.solicitudPresencialRepository.lugarParqueadero(id).get(filter);
  }

  @post('/solicitud-presencials/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudPresencial model instance',
        content: {'application/json': {schema: getModelSchemaRef(LugarParqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudPresencial.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {
            title: 'NewLugarParqueaderoInSolicitudPresencial',
            exclude: ['id'],
            optional: ['solicitudPresencialId']
          }),
        },
      },
    }) lugarParqueadero: Omit<LugarParqueadero, 'id'>,
  ): Promise<LugarParqueadero> {
    return this.solicitudPresencialRepository.lugarParqueadero(id).create(lugarParqueadero);
  }

  @patch('/solicitud-presencials/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudPresencial.LugarParqueadero PATCH success count',
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
    return this.solicitudPresencialRepository.lugarParqueadero(id).patch(lugarParqueadero, where);
  }

  @del('/solicitud-presencials/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'SolicitudPresencial.LugarParqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LugarParqueadero)) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.solicitudPresencialRepository.lugarParqueadero(id).delete(where);
  }
}
