import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import {
  CreateMultipleRetirementPlanningRgpsPeriodRequestDto,
  DataRetirementPlanningRgpsPeriodBulkItemRequestDto,
} from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-multiple-retirement-planning-rgps-period.request.dto';
import { CreateMultipleRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-multiple-retirement-planning-rgps-period.response.dto';

@Injectable()
export class CreateMultipleRetirementPlanningRgpsPeriodsUseCase {
  protected readonly _type =
    CreateMultipleRetirementPlanningRgpsPeriodsUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateMultipleRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<CreateMultipleRetirementPlanningRgpsPeriodResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFail(
        dto.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgps,
    });

    const periodEntities: RetirementPlanningRgpsPeriodEntity[] =
      dto.periods.map(
        (p: DataRetirementPlanningRgpsPeriodBulkItemRequestDto) => {
          return new RetirementPlanningRgpsPeriodEntity({
            periodName: p.periodName,
            periodStart: p.periodStart,
            periodEnd: p.periodEnd ?? null,
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            contributionAverage: new DecimalValue(p.contributionAverage),
            typeOfContribution: p.typeOfContribution,
            retirementPlanningRgps: retirementPlanningRgpsEntity,
            status: p.status,
          });
        },
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...periodEntities.map((period) =>
        this.retirementPlanningRgpsPeriodCommandRepositoryGateway.createRetirementPlanningRgpsPeriod(
          period,
        ),
      ),
    ]);

    await transactions.commit();

    return CreateMultipleRetirementPlanningRgpsPeriodResponseDto.build({
      retirementPlanningRgpsPeriodIds: periodEntities.map((p) => p.id),
    });
  }
}
