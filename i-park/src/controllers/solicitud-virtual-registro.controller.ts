import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudVirtual,
  Registro,
} from '../models';
import {SolicitudVirtualRepository} from '../repositories';

export class SolicitudVirtualRegistroController {
  constructor(
    @repository(SolicitudVirtualRepository)
    public solicitudVirtualRepository: SolicitudVirtualRepository,
  ) { }

  @get('/solicitud-virtuals/{id}/registro', {
    responses: {
      '200': {
        description: 'Registro belonging to SolicitudVirtual',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Registro)},
          },
        },
      },
    },
  })
  async getRegistro(
    @param.path.string('id') id: typeof SolicitudVirtual.prototype.id,
  ): Promise<Registro> {
    return this.solicitudVirtualRepository.registro(id);
  }
}
