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
import {SolicitudPresencial} from '../models';
import {SolicitudPresencialRepository} from '../repositories';

export class SolicitudPresencialController {
  constructor(
    @repository(SolicitudPresencialRepository)
    public solicitudPresencialRepository : SolicitudPresencialRepository,
  ) {}

  @post('/solicitud-presencials')
  @response(200, {
    description: 'SolicitudPresencial model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudPresencial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {
            title: 'NewSolicitudPresencial',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudPresencial: Omit<SolicitudPresencial, 'id'>,
  ): Promise<SolicitudPresencial> {
    return this.solicitudPresencialRepository.create(solicitudPresencial);
  }

  @get('/solicitud-presencials/count')
  @response(200, {
    description: 'SolicitudPresencial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudPresencial) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.solicitudPresencialRepository.count(where);
  }

  @get('/solicitud-presencials')
  @response(200, {
    description: 'Array of SolicitudPresencial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudPresencial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudPresencial) filter?: Filter<SolicitudPresencial>,
  ): Promise<SolicitudPresencial[]> {
    return this.solicitudPresencialRepository.find(filter);
  }

  @patch('/solicitud-presencials')
  @response(200, {
    description: 'SolicitudPresencial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {partial: true}),
        },
      },
    })
    solicitudPresencial: SolicitudPresencial,
    @param.where(SolicitudPresencial) where?: Where<SolicitudPresencial>,
  ): Promise<Count> {
    return this.solicitudPresencialRepository.updateAll(solicitudPresencial, where);
  }

  @get('/solicitud-presencials/{id}')
  @response(200, {
    description: 'SolicitudPresencial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudPresencial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudPresencial, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudPresencial>
  ): Promise<SolicitudPresencial> {
    return this.solicitudPresencialRepository.findById(id, filter);
  }

  @patch('/solicitud-presencials/{id}')
  @response(204, {
    description: 'SolicitudPresencial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudPresencial, {partial: true}),
        },
      },
    })
    solicitudPresencial: SolicitudPresencial,
  ): Promise<void> {
    await this.solicitudPresencialRepository.updateById(id, solicitudPresencial);
  }

  @put('/solicitud-presencials/{id}')
  @response(204, {
    description: 'SolicitudPresencial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudPresencial: SolicitudPresencial,
  ): Promise<void> {
    await this.solicitudPresencialRepository.replaceById(id, solicitudPresencial);
  }

  @del('/solicitud-presencials/{id}')
  @response(204, {
    description: 'SolicitudPresencial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudPresencialRepository.deleteById(id);
  }
}
