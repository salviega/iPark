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
  LugarParqueadero,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroLugarParqueaderoController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'Registro has one LugarParqueadero',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LugarParqueadero),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LugarParqueadero>,
  ): Promise<LugarParqueadero> {
    return this.registroRepository.lugarParqueadero(id).get(filter);
  }

  @post('/registros/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(LugarParqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {
            title: 'NewLugarParqueaderoInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) lugarParqueadero: Omit<LugarParqueadero, 'id'>,
  ): Promise<LugarParqueadero> {
    return this.registroRepository.lugarParqueadero(id).create(lugarParqueadero);
  }

  @patch('/registros/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'Registro.LugarParqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LugarParqueadero, {partial: true}),
        },
      },
    })
    lugarParqueadero: Partial<LugarParqueadero>,
    @param.query.object('where', getWhereSchemaFor(LugarParqueadero)) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.registroRepository.lugarParqueadero(id).patch(lugarParqueadero, where);
  }

  @del('/registros/{id}/lugar-parqueadero', {
    responses: {
      '200': {
        description: 'Registro.LugarParqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LugarParqueadero)) where?: Where<LugarParqueadero>,
  ): Promise<Count> {
    return this.registroRepository.lugarParqueadero(id).delete(where);
  }
}
