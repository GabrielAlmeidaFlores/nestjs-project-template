import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import {
  CreateMultipleGeneralUrbanRetirementGrantPeriodsRequestDto,
  DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-multiple-general-urban-retirement-grant-periods.request.dto';
import { CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-multiple-general-urban-retirement-grant-periods.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';

@Injectable()
export class CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase {
  protected readonly _type =
    CreateMultipleGeneralUrbanRetirementGrantPeriodsUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateMultipleGeneralUrbanRetirementGrantPeriodsRequestDto,
  ): Promise<CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto> {
    const generalUrbanRetirementGrant =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFail(
        dto.generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    const generalUrbanRetirementGrantEntity =
      new GeneralUrbanRetirementGrantEntity({
        ...generalUrbanRetirementGrant,
      });

    const periodEntities: GeneralUrbanRetirementGrantPeriodEntity[] =
      dto.periods.map(
        (p: DataGeneralUrbanRetirementGrantPeriodBulkItemRequestDto) => {
          return new GeneralUrbanRetirementGrantPeriodEntity({
            periodName: p.periodName,
            periodStart: p.periodStart,
            periodEnd: p.periodEnd ?? null,
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            contributionAverage: new DecimalValue(p.contributionAverage),
            typeOfContribution: p.typeOfContribution,
            generalUrbanRetirementGrant: generalUrbanRetirementGrantEntity,
            status: p.status,
          });
        },
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...periodEntities.map((period) =>
        this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.createGeneralUrbanRetirementGrantPeriod(
          period,
        ),
      ),
    ]);

    await transactions.commit();

    return CreateMultipleGeneralUrbanRetirementGrantPeriodsResponseDto.build({
      generalUrbanRetirementGrantPeriodIds: periodEntities.map((p) => p.id),
    });
  }
}
