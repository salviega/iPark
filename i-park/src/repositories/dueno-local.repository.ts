import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DuenoLocal, DuenoLocalRelations, Local, Vehiculo, SolicitudPresencial} from '../models';
import {LocalRepository} from './local.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {SolicitudPresencialRepository} from './solicitud-presencial.repository';

export class DuenoLocalRepository extends DefaultCrudRepository<
  DuenoLocal,
  typeof DuenoLocal.prototype.id,
  DuenoLocalRelations
> {

  public readonly locals: HasManyRepositoryFactory<Local, typeof DuenoLocal.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof DuenoLocal.prototype.id>;

  public readonly solicitudPresencial: HasOneRepositoryFactory<SolicitudPresencial, typeof DuenoLocal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LocalRepository') protected localRepositoryGetter: Getter<LocalRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('SolicitudPresencialRepository') protected solicitudPresencialRepositoryGetter: Getter<SolicitudPresencialRepository>,
  ) {
    super(DuenoLocal, dataSource);
    this.solicitudPresencial = this.createHasOneRepositoryFactoryFor('solicitudPresencial', solicitudPresencialRepositoryGetter);
    this.registerInclusionResolver('solicitudPresencial', this.solicitudPresencial.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.locals = this.createHasManyRepositoryFactoryFor('locals', localRepositoryGetter,);
    this.registerInclusionResolver('locals', this.locals.inclusionResolver);
  }
}
