import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';
import { GetSpecialRetirementGrantPeriodWithChildrenQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/result/get-special-retirement-grant-period-with-children.query.result';
import { SpecialRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/special-retirement-grant-period.query.repository.gateway';
import { GetSpecialRetirementGrantPeriodOverdueContributionQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-overdue-contribution/query/result/get-special-retirement-grant-period-overdue-contribution.query.result';
import { GetSpecialRetirementGrantPeriodObservationQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-observation/query/result/get-special-retirement-grant-period-observation.query.result';
import { GetSpecialRetirementGrantPeriodPendingExitDateQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-pending-exit-date/query/result/get-special-retirement-grant-period-pending-exit-date.query.result';
import { GetSpecialRetirementGrantPeriodUnderMinimumQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-under-minimum/query/result/get-special-retirement-grant-period-under-minimum.query.result';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';
import { SpecialRetirementGrantPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/value-object/special-retirement-grant-period-overdue-contribution-id/special-retirement-grant-period-overdue-contribution-id.value-object';
import { SpecialRetirementGrantPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/value-object/special-retirement-grant-period-pending-exit-date-id/special-retirement-grant-period-pending-exit-date-id.value-object';
import { SpecialRetirementGrantPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/value-object/special-retirement-grant-period-under-minimum-id/special-retirement-grant-period-under-minimum-id.value-object';

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

  public async listPeriodsWithChildrenBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantPeriodWithChildrenQueryResult[]> {
    const rows = await this.repository.find({
      where: {
        specialRetirementGrant: { id: specialRetirementGrantId.toString() },
      },
      relations: {
        specialRetirementGrantPeriodOverdueContribution: true,
        specialRetirementGrantPeriodUnderMinimum: true,
        specialRetirementGrantPeriodPendingExitDate: true,
        specialRetirementGrantPeriodObservation: true,
      },
      withDeleted: false,
      order: { createdAt: 'ASC' },
    });

    return rows.map((row) =>
      GetSpecialRetirementGrantPeriodWithChildrenQueryResult.build({
        id: new SpecialRetirementGrantPeriodId(row.id),
        sequencial: row.sequencial ?? null,
        employmentRelationshipSource: row.employmentRelationshipSource ?? null,
        startDate: row.startDate ?? null,
        endDate: row.endDate ?? null,
        category: row.category ?? null,
        status: row.status ?? null,
        averageContributionAmount:
          row.averageContributionAmount !== null &&
          row.averageContributionAmount !== undefined
            ? new DecimalValue(row.averageContributionAmount)
            : null,
        shouldConsiderPeriod: row.shouldConsiderPeriod,
        overdueContributions: (
          row.specialRetirementGrantPeriodOverdueContribution ?? []
        ).map((oc) =>
          GetSpecialRetirementGrantPeriodOverdueContributionQueryResult.build({
            id: new SpecialRetirementGrantPeriodOverdueContributionId(oc.id),
            overdueDate: oc.overdueDate,
            paymentDate: oc.paymentDate ?? null,
            createdAt: oc.createdAt,
            updatedAt: oc.updatedAt,
          }),
        ),
        underMinimums: (row.specialRetirementGrantPeriodUnderMinimum ?? []).map(
          (um) =>
            GetSpecialRetirementGrantPeriodUnderMinimumQueryResult.build({
              id: new SpecialRetirementGrantPeriodUnderMinimumId(um.id),
              contributionDate: um.contributionDate,
              contributionAmount: new DecimalValue(um.contributionAmount),
              createdAt: um.createdAt,
              updatedAt: um.updatedAt,
            }),
        ),
        pendingExitDates: (
          row.specialRetirementGrantPeriodPendingExitDate ?? []
        ).map((ped) =>
          GetSpecialRetirementGrantPeriodPendingExitDateQueryResult.build({
            id: new SpecialRetirementGrantPeriodPendingExitDateId(ped.id),
            pendingDate: ped.pendingDate,
            pendingAmount: new DecimalValue(ped.pendingAmount),
            createdAt: ped.createdAt,
            updatedAt: ped.updatedAt,
          }),
        ),
        observations: (
          row.specialRetirementGrantPeriodObservation ?? []
        ).map((obs) =>
          GetSpecialRetirementGrantPeriodObservationQueryResult.build({
            id: new SpecialRetirementGrantPeriodObservationId(obs.id),
            observation: obs.observation,
            createdAt: obs.createdAt,
            updatedAt: obs.updatedAt,
          }),
        ),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }),
    );
  }
}
