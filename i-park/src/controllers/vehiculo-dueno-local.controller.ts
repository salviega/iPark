import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  DuenoLocal,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoDuenoLocalController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/dueno-local', {
    responses: {
      '200': {
        description: 'DuenoLocal belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DuenoLocal)},
          },
        },
      },
    },
  })
  async getDuenoLocal(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<DuenoLocal> {
    return this.vehiculoRepository.duenoLocal(id);
  }
}
