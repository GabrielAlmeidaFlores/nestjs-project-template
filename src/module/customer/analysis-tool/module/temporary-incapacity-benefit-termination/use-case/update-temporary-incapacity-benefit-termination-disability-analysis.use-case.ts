import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis/command/temporary-incapacity-benefit-termination-disability-analysis.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis-cid/command/temporary-incapacity-benefit-termination-disability-analysis-cid.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-disability-analysis-document/command/temporary-incapacity-benefit-termination-disability-analysis-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/temporary-incapacity-benefit-termination-disability-analysis.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/value-object/temporary-incapacity-benefit-termination-disability-analysis-cid-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/value-object/temporary-incapacity-benefit-termination-disability-analysis-document-id.value-object';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination-disability-analysis.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination-disability-analysis.response.dto';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-disability-analysis-not-found.error';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    if (queryResult.disabilityAnalysis.length === 0) {
      throw new TemporaryIncapacityBenefitTerminationDisabilityAnalysisNotFoundError();
    }

    const disabilityAnalysisId =
      new TemporaryIncapacityBenefitTerminationDisabilityAnalysisId();

    const disabilityAnalysis =
      new TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntity({
        id: disabilityAnalysisId,
        estimatedDisabilityStartDate: dto.estimatedDisabilityStartDate,
        shortDisabilityDescription: dto.shortDisabilityDescription ?? null,
        disabilityFromAccident: dto.disabilityFromAccident,
        disablingConditionDescription:
          dto.disablingConditionDescription ?? null,
        disabilityFromSevereDisease: dto.disabilityFromSevereDisease,
        severeDisease: dto.severeDisease ?? null,
        diseaseCustomName: dto.diseaseCustomName ?? null,
        diseaseStartDate: dto.diseaseStartDate ?? null,
        needsConstantAssistanceFromAnotherPerson:
          dto.needsConstantAssistanceFromAnotherPerson,
        previousDisabilityBenefit: dto.previousDisabilityBenefit,
        previousBenefitNumber: dto.previousBenefitNumber ?? null,
        temporaryIncapacityBenefitTerminationId,
      });

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      ),
      this.temporaryIncapacityBenefitTerminationDisabilityAnalysisCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationDisabilityAnalysis(
        disabilityAnalysis,
      ),
    ];

    if (dto.cidTenIds && dto.cidTenIds.length > 0) {
      const cidTransactions = dto.cidTenIds.map((cidTenId) =>
        this.temporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationDisabilityAnalysisCid(
          new TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity({
            id: new TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId(),
            cidTenId,
            temporaryIncapacityBenefitTerminationDisabilityAnalysisId:
              disabilityAnalysisId,
          }),
        ),
      );

      transactions.push(...cidTransactions);
    }

    if (dto.documents && dto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        dto.documents.map(async (documentDto) => {
          const buffer = documentDto.file.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.file.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const fileName =
            await this.fileProcessorGateway.uploadFile(fileModel);

          return this.temporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocument(
            new TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity(
              {
                id: new TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryIncapacityBenefitTerminationDisabilityAnalysisId:
                  disabilityAnalysisId,
              },
            ),
          );
        }),
      );

      transactions.push(...documentTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryIncapacityBenefitTerminationDisabilityAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
      },
    );
  }
}
