import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTermsQueryResult } from '@module/customer/account/domain/repository/terms/query/result/get-terms.query.result';
import { TermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/terms/query/terms.query.repository.gateway';

@Injectable()
export class TermsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TermsAndConditionsTypeormEntity>
  implements TermsQueryRepositoryGateway
{
  protected readonly _type = TermsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TermsAndConditionsTypeormEntity)
    repository: Repository<TermsAndConditionsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByStatus(
    isActive: boolean,
  ): Promise<GetTermsQueryResult> {
    const terms = await this.repository.findOne({
      where: { isActive },
    });

    const mappedData = this.mapperGateway.map(
      terms,
      TermsAndConditionsTypeormEntity,
      GetTermsQueryResult,
    );

    return mappedData;
  }
}
