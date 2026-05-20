import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PovertyDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/command/poverty-declaration-generator.command.repository.gateway';
import { PovertyDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/query/poverty-declaration-generator.query.repository.gateway';
import { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/request/update-poverty-declaration-generator-complete-analysis.request.dto';
import { UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/poverty-declaration/dto/response/update-poverty-declaration-generator-complete-analysis.response.dto';
import { PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/poverty-declaration/error/poverty-declaration-generator-does-not-contain-complete-analysis.error';
import { PovertyDeclarationGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/poverty-declaration/error/poverty-declaration-generator-not-found.error';

@Injectable()
export class UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    UpdatePovertyDeclarationGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(PovertyDeclarationGeneratorQueryRepositoryGateway)
    private readonly povertyDeclarationGeneratorQueryRepositoryGateway: PovertyDeclarationGeneratorQueryRepositoryGateway,
    @Inject(PovertyDeclarationGeneratorCommandRepositoryGateway)
    private readonly povertyDeclarationGeneratorCommandRepositoryGateway: PovertyDeclarationGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    povertyDeclarationGeneratorId: PovertyDeclarationGeneratorId,
    dto: UpdatePovertyDeclarationGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto> {
    const povertyDeclarationGenerator =
      await this.povertyDeclarationGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        povertyDeclarationGeneratorId,
        PovertyDeclarationGeneratorNotFoundError,
      );

    if (
      povertyDeclarationGenerator.povertyDeclarationGeneratorCompleteAnalysis ===
      null
    ) {
      throw new PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError();
    }

    const updatedPovertyDeclarationGenerator =
      new PovertyDeclarationGeneratorEntity({
        ...povertyDeclarationGenerator,
        povertyDeclarationGeneratorCompleteAnalysis:
          dto.povertyDeclarationGeneratorCompleteAnalysis,
      });

    const povertyDeclarationGeneratorTransaction =
      this.povertyDeclarationGeneratorCommandRepositoryGateway.updatePovertyDeclarationGenerator(
        povertyDeclarationGenerator.id,
        updatedPovertyDeclarationGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      povertyDeclarationGeneratorTransaction,
    );
    await transaction.commit();

    return UpdatePovertyDeclarationGeneratorCompleteAnalysisResponseDto.build({
      povertyDeclarationGeneratorCompleteAnalysis:
        dto.povertyDeclarationGeneratorCompleteAnalysis,
    });
  }
}
