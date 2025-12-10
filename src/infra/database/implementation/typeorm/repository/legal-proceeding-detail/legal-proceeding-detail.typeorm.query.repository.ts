import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

export class LegalProceedingDetailTypeormQueryRepository
  extends BaseTypeormQueryRepository<LegalProceedingDetailTypeormEntity>
  implements LegalProceedingDetailQueryRepositoryGateway
{
  protected readonly _type = LegalProceedingDetailTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(LegalProceedingDetailTypeormEntity)
    repository: Repository<LegalProceedingDetailTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByLegalProceeding(
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult> {
    const data = await this.findOne({
      where: {
        analysisToolClientLegalProceeding: {
          legalProceedingNumber: legalProceedingNumber.toString(),
        },
      },
      relations: {
        analysisToolClientLegalProceeding: true,
      },
    });

    const mapped = this.mapperGateway.map(
      data,
      LegalProceedingDetailTypeormEntity,
      GetLegalProceedingDetailQueryResult,
    );

    return mapped;
  }
}
