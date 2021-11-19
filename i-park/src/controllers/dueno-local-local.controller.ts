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
  DuenoLocal,
  Local,
} from '../models';
import {DuenoLocalRepository} from '../repositories';

export class DuenoLocalLocalController {
  constructor(
    @repository(DuenoLocalRepository) protected duenoLocalRepository: DuenoLocalRepository,
  ) { }

  @get('/dueno-locals/{id}/locals', {
    responses: {
      '200': {
        description: 'Array of DuenoLocal has many Local',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Local)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Local>,
  ): Promise<Local[]> {
    return this.duenoLocalRepository.locals(id).find(filter);
  }

  @post('/dueno-locals/{id}/locals', {
    responses: {
      '200': {
        description: 'DuenoLocal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Local)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DuenoLocal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Local, {
            title: 'NewLocalInDuenoLocal',
            exclude: ['id'],
            optional: ['duenoLocalId']
          }),
        },
      },
    }) local: Omit<Local, 'id'>,
  ): Promise<Local> {
    return this.duenoLocalRepository.locals(id).create(local);
  }

  @patch('/dueno-locals/{id}/locals', {
    responses: {
      '200': {
        description: 'DuenoLocal.Local PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Local, {partial: true}),
        },
      },
    })
    local: Partial<Local>,
    @param.query.object('where', getWhereSchemaFor(Local)) where?: Where<Local>,
  ): Promise<Count> {
    return this.duenoLocalRepository.locals(id).patch(local, where);
  }

  @del('/dueno-locals/{id}/locals', {
    responses: {
      '200': {
        description: 'DuenoLocal.Local DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Local)) where?: Where<Local>,
  ): Promise<Count> {
    return this.duenoLocalRepository.locals(id).delete(where);
  }
}
