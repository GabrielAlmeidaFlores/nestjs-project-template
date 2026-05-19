import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { UpdateGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/update-general-urban-retirement-grant-period.request.dto';
import { UpdateGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/update-general-urban-retirement-grant-period.response.dto';
import { GeneralUrbanRetirementGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-period-not-found.error';

@Injectable()
export class UpdateGeneralUrbanRetirementGrantPeriodUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodQueryRepositoryGateway: GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
    dto: UpdateGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementGrantPeriodResponseDto> {
    const period =
      await this.generalUrbanRetirementGrantPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantPeriodIdOrFailWithRelations(
        generalUrbanRetirementGrantPeriodId,
        GeneralUrbanRetirementGrantPeriodNotFoundError,
      );

    const generalUrbanRetirementGrant = new GeneralUrbanRetirementGrantEntity({
      ...period.generalUrbanRetirementGrant,
    });

    const periodEntity = new GeneralUrbanRetirementGrantPeriodEntity({
      ...period,
      category: dto.category ?? period.category,
      periodName: dto.periodName ?? period.periodName,
      generalUrbanRetirementGrant,
    });

    const updateTransaction =
      this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
        generalUrbanRetirementGrantPeriodId,
        periodEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateGeneralUrbanRetirementGrantPeriodResponseDto.build({
      generalUrbanRetirementGrantPeriodId,
    });
  }
}
