import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SolicitudVirtual} from '../models';
import {SolicitudVirtualRepository} from '../repositories';

export class SolicitudVirtualController {
  constructor(
    @repository(SolicitudVirtualRepository)
    public solicitudVirtualRepository : SolicitudVirtualRepository,
  ) {}

  @post('/solicitud-virtuals')
  @response(200, {
    description: 'SolicitudVirtual model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudVirtual)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {
            title: 'NewSolicitudVirtual',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudVirtual: Omit<SolicitudVirtual, 'id'>,
  ): Promise<SolicitudVirtual> {
    return this.solicitudVirtualRepository.create(solicitudVirtual);
  }

  @get('/solicitud-virtuals/count')
  @response(200, {
    description: 'SolicitudVirtual model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudVirtual) where?: Where<SolicitudVirtual>,
  ): Promise<Count> {
    return this.solicitudVirtualRepository.count(where);
  }

  @get('/solicitud-virtuals')
  @response(200, {
    description: 'Array of SolicitudVirtual model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudVirtual, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudVirtual) filter?: Filter<SolicitudVirtual>,
  ): Promise<SolicitudVirtual[]> {
    return this.solicitudVirtualRepository.find(filter);
  }

  @patch('/solicitud-virtuals')
  @response(200, {
    description: 'SolicitudVirtual PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {partial: true}),
        },
      },
    })
    solicitudVirtual: SolicitudVirtual,
    @param.where(SolicitudVirtual) where?: Where<SolicitudVirtual>,
  ): Promise<Count> {
    return this.solicitudVirtualRepository.updateAll(solicitudVirtual, where);
  }

  @get('/solicitud-virtuals/{id}')
  @response(200, {
    description: 'SolicitudVirtual model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudVirtual, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudVirtual, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudVirtual>
  ): Promise<SolicitudVirtual> {
    return this.solicitudVirtualRepository.findById(id, filter);
  }

  @patch('/solicitud-virtuals/{id}')
  @response(204, {
    description: 'SolicitudVirtual PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVirtual, {partial: true}),
        },
      },
    })
    solicitudVirtual: SolicitudVirtual,
  ): Promise<void> {
    await this.solicitudVirtualRepository.updateById(id, solicitudVirtual);
  }

  @put('/solicitud-virtuals/{id}')
  @response(204, {
    description: 'SolicitudVirtual PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudVirtual: SolicitudVirtual,
  ): Promise<void> {
    await this.solicitudVirtualRepository.replaceById(id, solicitudVirtual);
  }

  @del('/solicitud-virtuals/{id}')
  @response(204, {
    description: 'SolicitudVirtual DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudVirtualRepository.deleteById(id);
  }
}
