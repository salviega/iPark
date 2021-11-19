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
  SolicitudPresencial,
} from '../models';
import {DuenoLocalRepository} from '../repositories';

export class DuenoLocalSolicitudPresencialController {
  constructor(
    @repository(DuenoLocalRepository) protected duenoLocalRepository: DuenoLocalRepository,
  ) { }

  @get('/dueno-locals/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'DuenoLocal has one SolicitudPresencial',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudPresencial),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudPresencial>,
  ): Promise<SolicitudPresencial> {
    return this.duenoLocalRepository.solicitudPresencial(id).get(filter);
  }

  @post('/dueno-locals/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'DuenoLocal model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudPresencial)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DuenoLocal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {
            title: 'NewSolicitudPresencialInDuenoLocal',
            exclude: ['id'],
            optional: ['duenoLocalId']
          }),
        },
      },
    }) solicitudPresencial: Omit<SolicitudPresencial, 'id'>,
  ): Promise<SolicitudPresencial> {
    return this.duenoLocalRepository.solicitudPresencial(id).create(solicitudPresencial);
  }

  @patch('/dueno-locals/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'DuenoLocal.SolicitudPresencial PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {partial: true}),
        },
      },
    })
    solicitudPresencial: Partial<SolicitudPresencial>,
    @param.query.object('where', getWhereSchemaFor(SolicitudPresencial)) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.duenoLocalRepository.solicitudPresencial(id).patch(solicitudPresencial, where);
  }

  @del('/dueno-locals/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'DuenoLocal.SolicitudPresencial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudPresencial)) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.duenoLocalRepository.solicitudPresencial(id).delete(where);
  }
}
