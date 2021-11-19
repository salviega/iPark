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
  Cliente,
  SolicitudPresencial,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudPresencialController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Cliente has one SolicitudPresencial',
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
    return this.clienteRepository.solicitudPresencial(id).get(filter);
  }

  @post('/clientes/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudPresencial)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {
            title: 'NewSolicitudPresencialInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudPresencial: Omit<SolicitudPresencial, 'id'>,
  ): Promise<SolicitudPresencial> {
    return this.clienteRepository.solicitudPresencial(id).create(solicitudPresencial);
  }

  @patch('/clientes/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudPresencial PATCH success count',
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
    return this.clienteRepository.solicitudPresencial(id).patch(solicitudPresencial, where);
  }

  @del('/clientes/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudPresencial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudPresencial)) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudPresencial(id).delete(where);
  }
}
