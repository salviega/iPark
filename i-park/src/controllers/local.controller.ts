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
import {Local} from '../models';
import {LocalRepository} from '../repositories';

export class LocalController {
  constructor(
    @repository(LocalRepository)
    public localRepository : LocalRepository,
  ) {}

  @post('/locals')
  @response(200, {
    description: 'Local model instance',
    content: {'application/json': {schema: getModelSchemaRef(Local)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Local, {
            title: 'NewLocal',
            exclude: ['id'],
          }),
        },
      },
    })
    local: Omit<Local, 'id'>,
  ): Promise<Local> {
    return this.localRepository.create(local);
  }

  @get('/locals/count')
  @response(200, {
    description: 'Local model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Local) where?: Where<Local>,
  ): Promise<Count> {
    return this.localRepository.count(where);
  }

  @get('/locals')
  @response(200, {
    description: 'Array of Local model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Local, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Local) filter?: Filter<Local>,
  ): Promise<Local[]> {
    return this.localRepository.find(filter);
  }

  @patch('/locals')
  @response(200, {
    description: 'Local PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Local, {partial: true}),
        },
      },
    })
    local: Local,
    @param.where(Local) where?: Where<Local>,
  ): Promise<Count> {
    return this.localRepository.updateAll(local, where);
  }

  @get('/locals/{id}')
  @response(200, {
    description: 'Local model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Local, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Local, {exclude: 'where'}) filter?: FilterExcludingWhere<Local>
  ): Promise<Local> {
    return this.localRepository.findById(id, filter);
  }

  @patch('/locals/{id}')
  @response(204, {
    description: 'Local PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Local, {partial: true}),
        },
      },
    })
    local: Local,
  ): Promise<void> {
    await this.localRepository.updateById(id, local);
  }

  @put('/locals/{id}')
  @response(204, {
    description: 'Local PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() local: Local,
  ): Promise<void> {
    await this.localRepository.replaceById(id, local);
  }

  @del('/locals/{id}')
  @response(204, {
    description: 'Local DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.localRepository.deleteById(id);
  }
}
