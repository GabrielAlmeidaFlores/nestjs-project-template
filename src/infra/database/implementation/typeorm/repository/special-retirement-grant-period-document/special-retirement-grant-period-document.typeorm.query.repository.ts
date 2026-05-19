import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-document.typeorm.entity';
import { SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-document/query/special-retirement-grant-period-document.query.repository.gateway';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialRetirementGrantPeriodDocumentTypeormEntity>
  implements SpecialRetirementGrantPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodDocumentTypeormEntity)
    repository: Repository<SpecialRetirementGrantPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public async listIdsBySpecialRetirementGrantPeriodId(
    specialRetirementGrantPeriodId: SpecialRetirementGrantPeriodId,
  ): Promise<SpecialRetirementGrantPeriodDocumentId[]> {
    const rows = await this.find({
      select: { id: true },
      where: {
        specialRetirementGrantPeriod: {
          id: specialRetirementGrantPeriodId.toString(),
        },
      },
    });

    return rows.map((r) => new SpecialRetirementGrantPeriodDocumentId(r.id));
  }
}
