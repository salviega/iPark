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
  SolicitudVirtual,
} from '../models';
import {LugarParqueaderoRepository} from '../repositories';

export class LugarParqueaderoSolicitudVirtualController {
  constructor(
    @repository(LugarParqueaderoRepository)
    public lugarParqueaderoRepository: LugarParqueaderoRepository,
  ) { }

  @get('/lugar-parqueaderos/{id}/solicitud-virtual', {
    responses: {
      '200': {
        description: 'SolicitudVirtual belonging to LugarParqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVirtual)},
          },
        },
      },
    },
  })
  async getSolicitudVirtual(
    @param.path.string('id') id: typeof LugarParqueadero.prototype.id,
  ): Promise<SolicitudVirtual> {
    return this.lugarParqueaderoRepository.solicitudVirtual(id);
  }
}
