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
import {LugarParqueadero} from '../models';
import {LugarParqueaderoRepository} from '../repositories';

export class LugarParqueaderoController {
  constructor(
    @repository(LugarParqueaderoRepository)
    public lugarParqueaderoRepository : LugarParqueaderoRepository,
  ) {}

  @post('/lugar-parqueaderos')
  @response(200, {
    description: 'LugarParqueadero model instance',
    content: {'application/json': {schema: getModelSchemaRef(LugarParqueadero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {
            title: 'NewLugarParqueadero',
            exclude: ['id'],
          }),
        },
      },
    })
    lugarParqueadero: Omit<LugarParqueadero, 'id'>,
  ): Promise<LugarParqueadero> {
    return this.lugarParqueaderoRepository.create(lugarParqueadero);
  }

  @get('/lugar-parqueaderos/count')
  @response(200, {
    description: 'LugarParqueadero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LugarParqueadero) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.lugarParqueaderoRepository.count(where);
  }

  @get('/lugar-parqueaderos')
  @response(200, {
    description: 'Array of LugarParqueadero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LugarParqueadero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LugarParqueadero) filter?: Filter<LugarParqueadero>,
  ): Promise<LugarParqueadero[]> {
    return this.lugarParqueaderoRepository.find(filter);
  }

  @patch('/lugar-parqueaderos')
  @response(200, {
    description: 'LugarParqueadero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {partial: true}),
        },
      },
    })
    lugarParqueadero: LugarParqueadero,
    @param.where(LugarParqueadero) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.lugarParqueaderoRepository.updateAll(lugarParqueadero, where);
  }

  @get('/lugar-parqueaderos/{id}')
  @response(200, {
    description: 'LugarParqueadero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LugarParqueadero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LugarParqueadero, {exclude: 'where'}) filter?: FilterExcludingWhere<LugarParqueadero>
  ): Promise<LugarParqueadero> {
    return this.lugarParqueaderoRepository.findById(id, filter);
  }

  @patch('/lugar-parqueaderos/{id}')
  @response(204, {
    description: 'LugarParqueadero PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {partial: true}),
        },
      },
    })
    lugarParqueadero: LugarParqueadero,
  ): Promise<void> {
    await this.lugarParqueaderoRepository.updateById(id, lugarParqueadero);
  }

  @put('/lugar-parqueaderos/{id}')
  @response(204, {
    description: 'LugarParqueadero PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lugarParqueadero: LugarParqueadero,
  ): Promise<void> {
    await this.lugarParqueaderoRepository.replaceById(id, lugarParqueadero);
  }

  @del('/lugar-parqueaderos/{id}')
  @response(204, {
    description: 'LugarParqueadero DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lugarParqueaderoRepository.deleteById(id);
  }
}
