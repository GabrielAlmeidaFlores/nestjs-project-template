import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis/command/permanent-incapacity-benefit-terminated-disability-analysis.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis-cid/command/permanent-incapacity-benefit-terminated-disability-analysis-cid.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis-document/command/permanent-incapacity-benefit-terminated-disability-analysis-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/permanent-incapacity-benefit-terminated-disability-analysis.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/permanent-incapacity-benefit-terminated-disability-analysis-cid.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/value-object/permanent-incapacity-benefit-terminated-disability-analysis-cid-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/permanent-incapacity-benefit-terminated-disability-analysis-document.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/value-object/permanent-incapacity-benefit-terminated-disability-analysis-document-id.value-object';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-disability-analysis.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-disability-analysis.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
      permanentIncapacityBenefitTerminatedId,
      PermanentIncapacityBenefitTerminatedNotFoundError,
    );

    const disabilityAnalysisId =
      new PermanentIncapacityBenefitTerminatedDisabilityAnalysisId();

    const disabilityAnalysis =
      new PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity({
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
        permanentIncapacityBenefitTerminatedId,
      });

    const transactions: TransactionType[] = [
      this.permanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway.deleteAllByPermanentIncapacityBenefitTerminatedId(
        permanentIncapacityBenefitTerminatedId,
      ),
      this.permanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedDisabilityAnalysis(
        disabilityAnalysis,
      ),
    ];

    if (dto.cidTenIds && dto.cidTenIds.length > 0) {
      const cidTransactions = dto.cidTenIds.map((cidTenId) =>
        this.permanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedDisabilityAnalysisCid(
          new PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity({
            id: new PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId(),
            cidTenId,
            permanentIncapacityBenefitTerminatedDisabilityAnalysisId:
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

          return this.permanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocument(
            new PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity(
              {
                id: new PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId(),
                fileName,
                type: documentDto.type,
                permanentIncapacityBenefitTerminatedDisabilityAnalysisId:
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

    return CreatePermanentIncapacityBenefitTerminatedDisabilityAnalysisResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
      },
    );
  }
}
