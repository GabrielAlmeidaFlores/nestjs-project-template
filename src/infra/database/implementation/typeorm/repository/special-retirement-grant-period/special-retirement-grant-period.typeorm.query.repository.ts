import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';

@Injectable()
export class SpecialRetirementGrantPeriodTypeormQueryRepository implements SpecialRetirementGrantPeriodQueryRepositoryGateway {
  protected readonly _type =
    SpecialRetirementGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantPeriodTypeormEntity)
    private readonly repository: Repository<SpecialRetirementGrantPeriodTypeormEntity>,
  ) {}

  public async listIdsBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<SpecialRetirementGrantPeriodId[]> {
    const rows = await this.repository.find({
      select: { id: true },
      where: {
        specialRetirementGrant: { id: specialRetirementGrantId.toString() },
      },
      withDeleted: false,
    });

    return rows.map((r) => new SpecialRetirementGrantPeriodId(r.id));
  }
}
