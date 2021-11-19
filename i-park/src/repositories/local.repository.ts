import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Local, LocalRelations, DuenoLocal} from '../models';
import {DuenoLocalRepository} from './dueno-local.repository';

export class LocalRepository extends DefaultCrudRepository<
  Local,
  typeof Local.prototype.id,
  LocalRelations
> {

  public readonly duenoLocal: BelongsToAccessor<DuenoLocal, typeof Local.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DuenoLocalRepository') protected duenoLocalRepositoryGetter: Getter<DuenoLocalRepository>,
  ) {
    super(Local, dataSource);
    this.duenoLocal = this.createBelongsToAccessorFor('duenoLocal', duenoLocalRepositoryGetter,);
    this.registerInclusionResolver('duenoLocal', this.duenoLocal.inclusionResolver);
  }
}
