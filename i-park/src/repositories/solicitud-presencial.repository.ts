import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudPresencial, SolicitudPresencialRelations, LugarParqueadero, Registro} from '../models';
import {LugarParqueaderoRepository} from './lugar-parqueadero.repository';
import {RegistroRepository} from './registro.repository';

export class SolicitudPresencialRepository extends DefaultCrudRepository<
  SolicitudPresencial,
  typeof SolicitudPresencial.prototype.id,
  SolicitudPresencialRelations
> {

  public readonly lugarParqueadero: HasOneRepositoryFactory<LugarParqueadero, typeof SolicitudPresencial.prototype.id>;

  public readonly registro: BelongsToAccessor<Registro, typeof SolicitudPresencial.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LugarParqueaderoRepository') protected lugarParqueaderoRepositoryGetter: Getter<LugarParqueaderoRepository>, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(SolicitudPresencial, dataSource);
    this.registro = this.createBelongsToAccessorFor('registro', registroRepositoryGetter,);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
    this.lugarParqueadero = this.createHasOneRepositoryFactoryFor('lugarParqueadero', lugarParqueaderoRepositoryGetter);
    this.registerInclusionResolver('lugarParqueadero', this.lugarParqueadero.inclusionResolver);
  }
}
