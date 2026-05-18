import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodConsiderationActionEnum,
  PeriodConsiderationActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { GeneralUrbanRetirementGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-period-not-found.error';

@Injectable()
export class PeriodConsiderationActionUseCase {
  protected readonly _type = PeriodConsiderationActionUseCase.name;

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
    dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    const period =
      await this.generalUrbanRetirementGrantPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantPeriodIdOrFailWithRelations(
        generalUrbanRetirementGrantPeriodId,
        GeneralUrbanRetirementGrantPeriodNotFoundError,
      );

    const generalUrbanRetirementGrant = new GeneralUrbanRetirementGrantEntity({
      ...period.generalUrbanRetirementGrant,
    });

    if (dto.action === PeriodConsiderationActionEnum.IGNORE) {
      const updatedPeriod = new GeneralUrbanRetirementGrantPeriodEntity({
        ...period,
        deletedAt: new Date(),
        generalUrbanRetirementGrant,
      });
      const updateTransaction =
        this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
          generalUrbanRetirementGrantPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();
      return;
    }

    if (dto.action === PeriodConsiderationActionEnum.CONSIDER) {
      const updatedPeriod = new GeneralUrbanRetirementGrantPeriodEntity({
        ...period,
        isPendency: false,
        reasonPendency: null,
        generalUrbanRetirementGrant,
      });
      const updateTransaction =
        this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
          generalUrbanRetirementGrantPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();
      return;
    }
  }
}
