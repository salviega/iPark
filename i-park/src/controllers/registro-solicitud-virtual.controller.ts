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
  SolicitudVirtual,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroSolicitudVirtualController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/solicitud-virtual', {
    responses: {
      '200': {
        description: 'Registro has one SolicitudVirtual',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudVirtual),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudVirtual>,
  ): Promise<SolicitudVirtual> {
    return this.registroRepository.solicitudVirtual(id).get(filter);
  }

  @post('/registros/{id}/solicitud-virtual', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVirtual)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {
            title: 'NewSolicitudVirtualInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) solicitudVirtual: Omit<SolicitudVirtual, 'id'>,
  ): Promise<SolicitudVirtual> {
    return this.registroRepository.solicitudVirtual(id).create(solicitudVirtual);
  }

  @patch('/registros/{id}/solicitud-virtual', {
    responses: {
      '200': {
        description: 'Registro.SolicitudVirtual PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {partial: true}),
        },
      },
    })
    solicitudVirtual: Partial<SolicitudVirtual>,
    @param.query.object('where', getWhereSchemaFor(SolicitudVirtual)) where?: Where<SolicitudVirtual>,
  ): Promise<Count> {
    return this.registroRepository.solicitudVirtual(id).patch(solicitudVirtual, where);
  }

  @del('/registros/{id}/solicitud-virtual', {
    responses: {
      '200': {
        description: 'Registro.SolicitudVirtual DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVirtual)) where?: Where<SolicitudVirtual>,
  ): Promise<Count> {
    return this.registroRepository.solicitudVirtual(id).delete(where);
  }
}
