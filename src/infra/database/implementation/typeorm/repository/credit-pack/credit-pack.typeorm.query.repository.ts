import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { CreditPackEntity } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

@Injectable()
export class CreditPackTypeormQueryRepository
  extends BaseTypeormQueryRepository<CreditPackTypeormEntity>
  implements CreditPackQueryRepositoryGateway
{
  protected readonly _type = CreditPackTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CreditPackTypeormEntity)
    repository: Repository<CreditPackTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneCreditPackById(
    id: CreditPackId,
  ): Promise<CreditPackEntity | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      CreditPackTypeormEntity,
      CreditPackEntity,
    );
  }

  public async listCreditPacks(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<CreditPackEntity>> {
    const data = await this.list(pagination);

    const mapped = this.mapperGateway.mapArray(
      data.resource,
      CreditPackTypeormEntity,
      CreditPackEntity,
    );

    return new ListDataOutputModel<CreditPackEntity>({
      ...data,
      resource: mapped,
    });
  }

  public async listActiveCreditPacks(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<CreditPackEntity>> {
    const data = await this.list(pagination, { where: { active: true } });

    const mapped = this.mapperGateway.mapArray(
      data.resource,
      CreditPackTypeormEntity,
      CreditPackEntity,
    );

    return new ListDataOutputModel<CreditPackEntity>({
      ...data,
      resource: mapped,
    });
  }
}
