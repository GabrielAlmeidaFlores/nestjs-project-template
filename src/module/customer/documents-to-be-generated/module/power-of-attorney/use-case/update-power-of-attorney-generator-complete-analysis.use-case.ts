import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PowerOfAttorneyGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/command/power-of-attorney-generator.command.repository.gateway';
import { PowerOfAttorneyGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/query/power-of-attorney-generator.query.repository.gateway';
import { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/request/update-power-of-attorney-generator-complete-analysis.request.dto';
import { UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/power-of-attorney/dto/response/update-power-of-attorney-generator-complete-analysis.response.dto';
import { PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/power-of-attorney/error/power-of-attorney-generator-does-not-contain-complete-analysis.error';
import { PowerOfAttorneyGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/power-of-attorney/error/power-of-attorney-generator-not-found.error';

@Injectable()
export class UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase {
  protected readonly _type = UpdatePowerOfAttorneyGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(PowerOfAttorneyGeneratorQueryRepositoryGateway)
    private readonly powerOfAttorneyGeneratorQueryRepositoryGateway: PowerOfAttorneyGeneratorQueryRepositoryGateway,
    @Inject(PowerOfAttorneyGeneratorCommandRepositoryGateway)
    private readonly powerOfAttorneyGeneratorCommandRepositoryGateway: PowerOfAttorneyGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    powerOfAttorneyGeneratorId: PowerOfAttorneyGeneratorId,
    dto: UpdatePowerOfAttorneyGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto> {
    const powerOfAttorneyGenerator =
      await this.powerOfAttorneyGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        powerOfAttorneyGeneratorId,
        PowerOfAttorneyGeneratorNotFoundError,
      );

    if (powerOfAttorneyGenerator.powerOfAttorneyGeneratorCompleteAnalysis === null) {
      throw new PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError();
    }

    const updatedPowerOfAttorneyGenerator = new PowerOfAttorneyGeneratorEntity({
      ...powerOfAttorneyGenerator,
      powerOfAttorneyGeneratorCompleteAnalysis: dto.powerOfAttorneyGeneratorCompleteAnalysis,
    });

    const powerOfAttorneyGeneratorTransaction =
      this.powerOfAttorneyGeneratorCommandRepositoryGateway.updatePowerOfAttorneyGenerator(
        powerOfAttorneyGenerator.id,
        updatedPowerOfAttorneyGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      powerOfAttorneyGeneratorTransaction,
    );
    await transaction.commit();

    return UpdatePowerOfAttorneyGeneratorCompleteAnalysisResponseDto.build({
      powerOfAttorneyGeneratorCompleteAnalysis: dto.powerOfAttorneyGeneratorCompleteAnalysis,
    });
  }
}
