import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LugarParqueadero, LugarParqueaderoRelations, SolicitudPresencial, SolicitudVirtual, Registro} from '../models';
import {SolicitudPresencialRepository} from './solicitud-presencial.repository';
import {SolicitudVirtualRepository} from './solicitud-virtual.repository';
import {RegistroRepository} from './registro.repository';

export class LugarParqueaderoRepository extends DefaultCrudRepository<
  LugarParqueadero,
  typeof LugarParqueadero.prototype.id,
  LugarParqueaderoRelations
> {

  public readonly solicitudPresencial: BelongsToAccessor<SolicitudPresencial, typeof LugarParqueadero.prototype.id>;

  public readonly solicitudVirtual: BelongsToAccessor<SolicitudVirtual, typeof LugarParqueadero.prototype.id>;

  public readonly registro: BelongsToAccessor<Registro, typeof LugarParqueadero.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudPresencialRepository') protected solicitudPresencialRepositoryGetter: Getter<SolicitudPresencialRepository>, @repository.getter('SolicitudVirtualRepository') protected solicitudVirtualRepositoryGetter: Getter<SolicitudVirtualRepository>, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(LugarParqueadero, dataSource);
    this.registro = this.createBelongsToAccessorFor('registro', registroRepositoryGetter,);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
    this.solicitudVirtual = this.createBelongsToAccessorFor('solicitudVirtual', solicitudVirtualRepositoryGetter,);
    this.registerInclusionResolver('solicitudVirtual', this.solicitudVirtual.inclusionResolver);
    this.solicitudPresencial = this.createBelongsToAccessorFor('solicitudPresencial', solicitudPresencialRepositoryGetter,);
    this.registerInclusionResolver('solicitudPresencial', this.solicitudPresencial.inclusionResolver);
  }
}
