import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SpecialRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-earnings-history.typeorm.entity';
import { GetSpecialRetirementGrantEarningsHistoryQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/query/result/get-special-retirement-grant-earnings-history.query.result';
import { SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-earnings-history/query/special-retirement-grant-earnings-history.query.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/value-object/special-retirement-grant-earnings-history-id/special-retirement-grant-earnings-history-id.value-object';

@Injectable()
export class SpecialRetirementGrantEarningsHistoryTypeormQueryRepository implements SpecialRetirementGrantEarningsHistoryQueryRepositoryGateway {
  protected readonly _type =
    SpecialRetirementGrantEarningsHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantEarningsHistoryTypeormEntity)
    private readonly repository: Repository<SpecialRetirementGrantEarningsHistoryTypeormEntity>,
  ) {}

  public async listBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantEarningsHistoryQueryResult[]> {
    const rows = await this.repository.find({
      where: {
        specialRetirementGrant: {
          id: specialRetirementGrantId.toString(),
        },
      },
      withDeleted: false,
      order: { competence: 'ASC' },
    });

    return rows.map((row) =>
      GetSpecialRetirementGrantEarningsHistoryQueryResult.build({
        id: new SpecialRetirementGrantEarningsHistoryId(row.id),
        competence: row.competence,
        remuneration: row.remuneration,
        indicators: row.indicators,
        paymentDate: row.paymentDate,
        competenceBelowTheMinimum: row.competenceBelowTheMinimum,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        deletedAt: row.deletedAt,
      }),
    );
  }
}
