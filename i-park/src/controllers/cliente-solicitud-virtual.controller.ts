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
  SolicitudVirtual,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudVirtualController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-virtuals', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudVirtual',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVirtual)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudVirtual>,
  ): Promise<SolicitudVirtual[]> {
    return this.clienteRepository.solicitudVirtuals(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-virtuals', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVirtual)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {
            title: 'NewSolicitudVirtualInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudVirtual: Omit<SolicitudVirtual, 'id'>,
  ): Promise<SolicitudVirtual> {
    return this.clienteRepository.solicitudVirtuals(id).create(solicitudVirtual);
  }

  @patch('/clientes/{id}/solicitud-virtuals', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudVirtual PATCH success count',
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
    return this.clienteRepository.solicitudVirtuals(id).patch(solicitudVirtual, where);
  }

  @del('/clientes/{id}/solicitud-virtuals', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudVirtual DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVirtual)) where?: Where<SolicitudVirtual>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudVirtuals(id).delete(where);
  }
}
