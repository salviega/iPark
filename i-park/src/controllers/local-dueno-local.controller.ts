import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Local,
  DuenoLocal,
} from '../models';
import {LocalRepository} from '../repositories';

export class LocalDuenoLocalController {
  constructor(
    @repository(LocalRepository)
    public localRepository: LocalRepository,
  ) { }

  @get('/locals/{id}/dueno-local', {
    responses: {
      '200': {
        description: 'DuenoLocal belonging to Local',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DuenoLocal)},
          },
        },
      },
    },
  })
  async getDuenoLocal(
    @param.path.string('id') id: typeof Local.prototype.id,
  ): Promise<DuenoLocal> {
    return this.localRepository.duenoLocal(id);
  }
}
