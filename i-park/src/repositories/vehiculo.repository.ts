import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Cliente, DuenoLocal} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DuenoLocalRepository} from './dueno-local.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Vehiculo.prototype.id>;

  public readonly duenoLocal: BelongsToAccessor<DuenoLocal, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DuenoLocalRepository') protected duenoLocalRepositoryGetter: Getter<DuenoLocalRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.duenoLocal = this.createBelongsToAccessorFor('duenoLocal', duenoLocalRepositoryGetter,);
    this.registerInclusionResolver('duenoLocal', this.duenoLocal.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
