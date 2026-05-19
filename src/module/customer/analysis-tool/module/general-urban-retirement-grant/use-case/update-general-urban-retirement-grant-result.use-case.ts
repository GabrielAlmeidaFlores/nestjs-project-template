import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-result/command/general-urban-retirement-grant-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';
import { UpdateGeneralUrbanRetirementGrantResultRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/update-general-urban-retirement-grant-result.request.dto';
import { UpdateGeneralUrbanRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/update-general-urban-retirement-grant-result.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';
import { GeneralUrbanRetirementGrantResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-result-not-found.error';

@Injectable()
export class UpdateGeneralUrbanRetirementGrantResultUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementGrantResultUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantResultCommandRepositoryGateway: GeneralUrbanRetirementGrantResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    dto: UpdateGeneralUrbanRetirementGrantResultRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementGrantResultResponseDto> {
    const generalUrbanRetirementGrant =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
        generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    if (!generalUrbanRetirementGrant.generalUrbanRetirementGrantResult) {
      throw new GeneralUrbanRetirementGrantResultNotFoundError();
    }

    const updatedResult = new GeneralUrbanRetirementGrantResultEntity({
      ...generalUrbanRetirementGrant.generalUrbanRetirementGrantResult,
      generalUrbanRetirementGrantCompleteAnalysis:
        dto.generalUrbanRetirementGrantCompleteAnalysis,
    });

    const updateTransaction =
      this.generalUrbanRetirementGrantResultCommandRepositoryGateway.updateGeneralUrbanRetirementGrantResult(
        generalUrbanRetirementGrant.generalUrbanRetirementGrantResult.id,
        updatedResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateGeneralUrbanRetirementGrantResultResponseDto.build({
      generalUrbanRetirementGrantId,
    });
  }
}
