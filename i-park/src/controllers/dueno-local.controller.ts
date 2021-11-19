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
import {DuenoLocal} from '../models';
import {DuenoLocalRepository} from '../repositories';

export class DuenoLocalController {
  constructor(
    @repository(DuenoLocalRepository)
    public duenoLocalRepository : DuenoLocalRepository,
  ) {}

  @post('/dueno-locals')
  @response(200, {
    description: 'DuenoLocal model instance',
    content: {'application/json': {schema: getModelSchemaRef(DuenoLocal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoLocal, {
            title: 'NewDuenoLocal',
            exclude: ['id'],
          }),
        },
      },
    })
    duenoLocal: Omit<DuenoLocal, 'id'>,
  ): Promise<DuenoLocal> {
    return this.duenoLocalRepository.create(duenoLocal);
  }

  @get('/dueno-locals/count')
  @response(200, {
    description: 'DuenoLocal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DuenoLocal) where?: Where<DuenoLocal>,
  ): Promise<Count> {
    return this.duenoLocalRepository.count(where);
  }

  @get('/dueno-locals')
  @response(200, {
    description: 'Array of DuenoLocal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DuenoLocal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DuenoLocal) filter?: Filter<DuenoLocal>,
  ): Promise<DuenoLocal[]> {
    return this.duenoLocalRepository.find(filter);
  }

  @patch('/dueno-locals')
  @response(200, {
    description: 'DuenoLocal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoLocal, {partial: true}),
        },
      },
    })
    duenoLocal: DuenoLocal,
    @param.where(DuenoLocal) where?: Where<DuenoLocal>,
  ): Promise<Count> {
    return this.duenoLocalRepository.updateAll(duenoLocal, where);
  }

  @get('/dueno-locals/{id}')
  @response(200, {
    description: 'DuenoLocal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DuenoLocal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DuenoLocal, {exclude: 'where'}) filter?: FilterExcludingWhere<DuenoLocal>
  ): Promise<DuenoLocal> {
    return this.duenoLocalRepository.findById(id, filter);
  }

  @patch('/dueno-locals/{id}')
  @response(204, {
    description: 'DuenoLocal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoLocal, {partial: true}),
        },
      },
    })
    duenoLocal: DuenoLocal,
  ): Promise<void> {
    await this.duenoLocalRepository.updateById(id, duenoLocal);
  }

  @put('/dueno-locals/{id}')
  @response(204, {
    description: 'DuenoLocal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() duenoLocal: DuenoLocal,
  ): Promise<void> {
    await this.duenoLocalRepository.replaceById(id, duenoLocal);
  }

  @del('/dueno-locals/{id}')
  @response(204, {
    description: 'DuenoLocal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.duenoLocalRepository.deleteById(id);
  }
}
