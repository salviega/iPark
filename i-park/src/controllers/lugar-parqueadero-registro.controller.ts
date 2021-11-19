import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LugarParqueadero,
  Registro,
} from '../models';
import {LugarParqueaderoRepository} from '../repositories';

export class LugarParqueaderoRegistroController {
  constructor(
    @repository(LugarParqueaderoRepository)
    public lugarParqueaderoRepository: LugarParqueaderoRepository,
  ) { }

  @get('/lugar-parqueaderos/{id}/registro', {
    responses: {
      '200': {
        description: 'Registro belonging to LugarParqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Registro)},
          },
        },
      },
    },
  })
  async getRegistro(
    @param.path.string('id') id: typeof LugarParqueadero.prototype.id,
  ): Promise<Registro> {
    return this.lugarParqueaderoRepository.registro(id);
  }
}
