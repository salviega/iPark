import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudVirtual, SolicitudVirtualRelations, LugarParqueadero, Registro} from '../models';
import {LugarParqueaderoRepository} from './lugar-parqueadero.repository';
import {RegistroRepository} from './registro.repository';

export class SolicitudVirtualRepository extends DefaultCrudRepository<
  SolicitudVirtual,
  typeof SolicitudVirtual.prototype.id,
  SolicitudVirtualRelations
> {

  public readonly lugarParqueadero: HasOneRepositoryFactory<LugarParqueadero, typeof SolicitudVirtual.prototype.id>;

  public readonly registro: BelongsToAccessor<Registro, typeof SolicitudVirtual.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LugarParqueaderoRepository') protected lugarParqueaderoRepositoryGetter: Getter<LugarParqueaderoRepository>, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(SolicitudVirtual, dataSource);
    this.registro = this.createBelongsToAccessorFor('registro', registroRepositoryGetter,);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
    this.lugarParqueadero = this.createHasOneRepositoryFactoryFor('lugarParqueadero', lugarParqueaderoRepositoryGetter);
    this.registerInclusionResolver('lugarParqueadero', this.lugarParqueadero.inclusionResolver);
  }
}
