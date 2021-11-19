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
  Registro,
  SolicitudPresencial,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroSolicitudPresencialController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Registro has one SolicitudPresencial',
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
    return this.registroRepository.solicitudPresencial(id).get(filter);
  }

  @post('/registros/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudPresencial)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {
            title: 'NewSolicitudPresencialInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) solicitudPresencial: Omit<SolicitudPresencial, 'id'>,
  ): Promise<SolicitudPresencial> {
    return this.registroRepository.solicitudPresencial(id).create(solicitudPresencial);
  }

  @patch('/registros/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Registro.SolicitudPresencial PATCH success count',
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
    return this.registroRepository.solicitudPresencial(id).patch(solicitudPresencial, where);
  }

  @del('/registros/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Registro.SolicitudPresencial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudPresencial)) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.registroRepository.solicitudPresencial(id).delete(where);
  }
}
