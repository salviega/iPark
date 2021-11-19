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
  SolicitudPresencial,
} from '../models';
import {LugarParqueaderoRepository} from '../repositories';

export class LugarParqueaderoSolicitudPresencialController {
  constructor(
    @repository(LugarParqueaderoRepository)
    public lugarParqueaderoRepository: LugarParqueaderoRepository,
  ) { }

  @get('/lugar-parqueaderos/{id}/solicitud-presencial', {
    responses: {
      '200': {
        description: 'SolicitudPresencial belonging to LugarParqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudPresencial)},
          },
        },
      },
    },
  })
  async getSolicitudPresencial(
    @param.path.string('id') id: typeof LugarParqueadero.prototype.id,
  ): Promise<SolicitudPresencial> {
    return this.lugarParqueaderoRepository.solicitudPresencial(id);
  }
}
