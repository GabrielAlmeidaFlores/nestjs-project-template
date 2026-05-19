import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FeeContractGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/command/fee-contract-generator.command.repository.gateway';
import { FeeContractGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/query/fee-contract-generator.query.repository.gateway';
import { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import { UpdateFeeContractGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/request/update-fee-contract-generator-complete-analysis.request.dto';
import { UpdateFeeContractGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/fee-contract/dto/response/update-fee-contract-generator-complete-analysis.response.dto';
import { FeeContractGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/fee-contract/error/fee-contract-generator-does-not-contain-complete-analysis.error';
import { FeeContractGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/fee-contract/error/fee-contract-generator-not-found.error';

@Injectable()
export class UpdateFeeContractGeneratorCompleteAnalysisUseCase {
  protected readonly _type = UpdateFeeContractGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(FeeContractGeneratorQueryRepositoryGateway)
    private readonly feeContractGeneratorQueryRepositoryGateway: FeeContractGeneratorQueryRepositoryGateway,
    @Inject(FeeContractGeneratorCommandRepositoryGateway)
    private readonly feeContractGeneratorCommandRepositoryGateway: FeeContractGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    feeContractGeneratorId: FeeContractGeneratorId,
    dto: UpdateFeeContractGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateFeeContractGeneratorCompleteAnalysisResponseDto> {
    const feeContractGenerator =
      await this.feeContractGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        feeContractGeneratorId,
        FeeContractGeneratorNotFoundError,
      );

    if (feeContractGenerator.feeContractGeneratorCompleteAnalysis === null) {
      throw new FeeContractGeneratorDoesNotContainCompleteAnalysisError();
    }

    const updatedFeeContractGenerator = new FeeContractGeneratorEntity({
      ...feeContractGenerator,
      feeContractGeneratorCompleteAnalysis: dto.feeContractGeneratorCompleteAnalysis,
    });

    const feeContractGeneratorTransaction =
      this.feeContractGeneratorCommandRepositoryGateway.updateFeeContractGenerator(
        feeContractGenerator.id,
        updatedFeeContractGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      feeContractGeneratorTransaction,
    );
    await transaction.commit();

    return UpdateFeeContractGeneratorCompleteAnalysisResponseDto.build({
      feeContractGeneratorCompleteAnalysis: dto.feeContractGeneratorCompleteAnalysis,
    });
  }
}
