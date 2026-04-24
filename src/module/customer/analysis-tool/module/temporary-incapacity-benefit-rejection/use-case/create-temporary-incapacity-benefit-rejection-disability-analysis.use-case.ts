import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis/command/temporary-incapacity-benefit-rejection-disability-analysis.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis-cid/command/temporary-incapacity-benefit-rejection-disability-analysis-cid.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-disability-analysis-document/command/temporary-incapacity-benefit-rejection-disability-analysis-document.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/value-object/temporary-incapacity-benefit-rejection-disability-analysis-cid-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/value-object/temporary-incapacity-benefit-rejection-disability-analysis-document-id.value-object';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection-disability-analysis.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-disability-analysis.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
      temporaryIncapacityBenefitRejectionId,
      TemporaryIncapacityBenefitRejectionNotFoundError,
    );

    const disabilityAnalysisId =
      new TemporaryIncapacityBenefitRejectionDisabilityAnalysisId();

    const disabilityAnalysis =
      new TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity({
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
        temporaryIncapacityBenefitRejectionId,
      });

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitRejectionId(
        temporaryIncapacityBenefitRejectionId,
      ),
      this.temporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionDisabilityAnalysis(
        disabilityAnalysis,
      ),
    ];

    if (dto.cidTenIds && dto.cidTenIds.length > 0) {
      const cidTransactions = dto.cidTenIds.map((cidTenId) =>
        this.temporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionDisabilityAnalysisCid(
          new TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity({
            id: new TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId(),
            cidTenId,
            temporaryIncapacityBenefitRejectionDisabilityAnalysisId:
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

          return this.temporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocument(
            new TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity(
              {
                id: new TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId(),
                fileName,
                type: documentDto.type,
                temporaryIncapacityBenefitRejectionDisabilityAnalysisId:
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

    return CreateTemporaryIncapacityBenefitRejectionDisabilityAnalysisResponseDto.build(
      {
        temporaryIncapacityBenefitRejectionId,
      },
    );
  }
}
