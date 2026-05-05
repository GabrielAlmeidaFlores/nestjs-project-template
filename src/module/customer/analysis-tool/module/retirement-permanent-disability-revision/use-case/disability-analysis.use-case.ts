import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis/command/retirement-permanent-disability-revision-disability-analysis.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-associated-cid/command/retirement-permanent-disability-revision-disability-analysis-associated-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-benefit/command/retirement-permanent-disability-revision-disability-analysis-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/command/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-document/command/retirement-permanent-disability-revision-disability-analysis-document.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/retirement-permanent-disability-revision-disability-analysis.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/retirement-permanent-disability-revision-disability-analysis-associated-cid.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/retirement-permanent-disability-revision-disability-analysis-benefit.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/retirement-permanent-disability-revision-disability-analysis-document.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/enum/retirement-permanent-disability-revision-disability-analysis-document-type.enum';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/retirement-permanent-disability-revision-disability-analysis.request.dto';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/retirement-permanent-disability-revision-disability-analysis.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

import { PreviousBenefitRequestDto } from '../dto/request/previous-benefit.request.dto';

@Injectable()
export class DisabilityAnalysisUseCase {
  protected readonly _type = DisabilityAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway,
    )
    private readonly disabilityAnalysisCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway,
    )
    private readonly disabilityAnalysisAssociatedCidCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway,
    )
    private readonly disabilityAnalysisBenefitCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway,
    )
    private readonly disabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway,
    )
    private readonly disabilityAnalysisDocumentCommandRepositoryGateway: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    dto: RetirementPermanentDisabilityRevisionDisabilityAnalysisRequestDto,
  ): Promise<RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
      retirementPermanentDisabilityRevisionId,
      RetirementPermanentDisabilityRevisionNotFoundError,
    );

    const [medicalDocumentFileNames, previousMedicalReportFileNames, benefitDeclarationFileNames] =
      await Promise.all([
        Promise.all((dto.medicalDocuments ?? []).map((f) => this.uploadFile(f))),
        Promise.all((dto.previousMedicalReports ?? []).map((f) => this.uploadFile(f))),
        Promise.all((dto.benefitDeclarations ?? []).map((f) => this.uploadFile(f))),
      ]);

    const disabilityAnalysisEntity =
      new RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity({
        retirementPermanentDisabilityRevisionId,
        ...(dto.estimatedIncapacityStartDate != null && {
          estimatedIncapacityStartDate: new Date(dto.estimatedIncapacityStartDate),
        }),
        ...(dto.medicalDescription != null && { medicalDescription: dto.medicalDescription }),
        ...(dto.isAccidentRelated != null && { isAccidentRelated: dto.isAccidentRelated }),
        ...(dto.accidentDescription != null && { accidentDescription: dto.accidentDescription }),
        ...(dto.isSevereDisease != null && { isSevereDisease: dto.isSevereDisease }),
        ...(dto.severeDiseaseType != null && { severeDiseaseType: dto.severeDiseaseType }),
        ...(dto.severeDiseaseName != null && { severeDiseaseName: dto.severeDiseaseName }),
        ...(dto.diseaseStartDate != null && { diseaseStartDate: new Date(dto.diseaseStartDate) }),
        ...(dto.needsPermanentAssistance != null && {
          needsPermanentAssistance: dto.needsPermanentAssistance,
        }),
      });

    const transactions: TransactionType[] = [
      this.disabilityAnalysisCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysis(
        disabilityAnalysisEntity,
      ),
    ];

    for (const cid of dto.associatedCids ?? []) {
      transactions.push(
        this.disabilityAnalysisAssociatedCidCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCid(
          new RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity({
            retirementPermanentDisabilityRevisionDisabilityAnalysisId: disabilityAnalysisEntity.id,
            cid,
          }),
        ),
      );
    }

    for (const benefit of dto.benefits ?? []) {
      this.buildBenefitTransactions(
        disabilityAnalysisEntity.id,
        benefit,
        transactions,
      );
    }

    for (const fileName of medicalDocumentFileNames) {
      transactions.push(
        this.disabilityAnalysisDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisDocument(
          new RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity({
            retirementPermanentDisabilityRevisionDisabilityAnalysisId: disabilityAnalysisEntity.id,
            fileName,
            type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum.MEDICAL_DOCUMENT,
          }),
        ),
      );
    }

    for (const fileName of previousMedicalReportFileNames) {
      transactions.push(
        this.disabilityAnalysisDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisDocument(
          new RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity({
            retirementPermanentDisabilityRevisionDisabilityAnalysisId: disabilityAnalysisEntity.id,
            fileName,
            type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum.PREVIOUS_MEDICAL_REPORT,
          }),
        ),
      );
    }

    for (const fileName of benefitDeclarationFileNames) {
      transactions.push(
        this.disabilityAnalysisDocumentCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisDocument(
          new RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity({
            retirementPermanentDisabilityRevisionDisabilityAnalysisId: disabilityAnalysisEntity.id,
            fileName,
            type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum.BENEFIT_DECLARATION,
          }),
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return RetirementPermanentDisabilityRevisionDisabilityAnalysisResponseDto.build({
      retirementPermanentDisabilityRevisionDisabilityAnalysisId:
        disabilityAnalysisEntity.id,
    });
  }

  private buildBenefitTransactions(
    disabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId,
    benefit: PreviousBenefitRequestDto,
    transactions: TransactionType[],
  ): void {
    const benefitEntity =
      new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity({
        retirementPermanentDisabilityRevisionDisabilityAnalysisId: disabilityAnalysisId,
        hasPreviousBenefit: benefit.hasPreviousBenefit,
        ...(benefit.benefitNumber != null && { benefitNumber: benefit.benefitNumber }),
        ...(benefit.benefitStartDate != null && {
          benefitStartDate: new Date(benefit.benefitStartDate),
        }),
        ...(benefit.benefitEndDate != null && {
          benefitEndDate: new Date(benefit.benefitEndDate),
        }),
      });

    transactions.push(
      this.disabilityAnalysisBenefitCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefit(
        benefitEntity,
      ),
    );

    for (const cid of benefit.associatedCids ?? []) {
      transactions.push(
        this.disabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid(
          new RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity({
            retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId: benefitEntity.id,
            cid,
          }),
        ),
      );
    }
  }

  private async uploadFile(file: Base64FileRequestDto): Promise<string> {
    const buffer = file.base64.decodeToBuffer();

    return this.fileProcessorGateway.uploadFile(
      FileModel.build({
        buffer,
        originalName: file.originalFileName,
        size: buffer.length,
        encoding: '7bit',
      }),
    );
  }
}
