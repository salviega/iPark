import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Registro, RegistroRelations, SolicitudVirtual, LugarParqueadero, SolicitudPresencial} from '../models';
import {SolicitudVirtualRepository} from './solicitud-virtual.repository';
import {LugarParqueaderoRepository} from './lugar-parqueadero.repository';
import {SolicitudPresencialRepository} from './solicitud-presencial.repository';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {

  public readonly solicitudVirtual: HasOneRepositoryFactory<SolicitudVirtual, typeof Registro.prototype.id>;

  public readonly lugarParqueadero: HasOneRepositoryFactory<LugarParqueadero, typeof Registro.prototype.id>;

  public readonly solicitudPresencial: HasOneRepositoryFactory<SolicitudPresencial, typeof Registro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVirtualRepository') protected solicitudVirtualRepositoryGetter: Getter<SolicitudVirtualRepository>, @repository.getter('LugarParqueaderoRepository') protected lugarParqueaderoRepositoryGetter: Getter<LugarParqueaderoRepository>, @repository.getter('SolicitudPresencialRepository') protected solicitudPresencialRepositoryGetter: Getter<SolicitudPresencialRepository>,
  ) {
    super(Registro, dataSource);
    this.solicitudPresencial = this.createHasOneRepositoryFactoryFor('solicitudPresencial', solicitudPresencialRepositoryGetter);
    this.registerInclusionResolver('solicitudPresencial', this.solicitudPresencial.inclusionResolver);
    this.lugarParqueadero = this.createHasOneRepositoryFactoryFor('lugarParqueadero', lugarParqueaderoRepositoryGetter);
    this.registerInclusionResolver('lugarParqueadero', this.lugarParqueadero.inclusionResolver);
    this.solicitudVirtual = this.createHasOneRepositoryFactoryFor('solicitudVirtual', solicitudVirtualRepositoryGetter);
    this.registerInclusionResolver('solicitudVirtual', this.solicitudVirtual.inclusionResolver);
  }
}
