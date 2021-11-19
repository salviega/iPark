import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudPresencial,
  Registro,
} from '../models';
import {SolicitudPresencialRepository} from '../repositories';

export class SolicitudPresencialRegistroController {
  constructor(
    @repository(SolicitudPresencialRepository)
    public solicitudPresencialRepository: SolicitudPresencialRepository,
  ) { }

  @get('/solicitud-presencials/{id}/registro', {
    responses: {
      '200': {
        description: 'Registro belonging to SolicitudPresencial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Registro)},
          },
        },
      },
    },
  })
  async getRegistro(
    @param.path.string('id') id: typeof SolicitudPresencial.prototype.id,
  ): Promise<Registro> {
    return this.solicitudPresencialRepository.registro(id);
  }
}
