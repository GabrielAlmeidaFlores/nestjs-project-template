import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialRetirementGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/command/special-retirement-grant.command.repository.gateway';
import { GetSpecialRetirementGrantBenefitQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-benefit.query.result';
import { GetSpecialRetirementGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-document.query.result';
import { GetSpecialRetirementGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-legal-proceeding.query.result';
import { SpecialRetirementGrantBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-benefit/command/special-retirement-grant-benefit.command.repository.gateway';
import { SpecialRetirementGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-document/command/special-retirement-grant-document.command.repository.gateway';
import { SpecialRetirementGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-legal-proceeding/command/special-retirement-grant-legal-proceeding.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';
import { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';
import { UpdateSpecialRetirementGrantRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/update-special-retirement-grant.request.dto';
import { UpdateSpecialRetirementGrantResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/update-special-retirement-grant.response.dto';
import { SpecialRetirementGrantAtLeastOnePppRequiredError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-at-least-one-ppp-required.error';
import { SpecialRetirementGrantCnisRequiredError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-cnis-required.error';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateSpecialRetirementGrantUseCase {
  protected readonly _type = UpdateSpecialRetirementGrantUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantCommandRepositoryGateway)
    private readonly specialRetirementGrantCommandRepositoryGateway: SpecialRetirementGrantCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantDocumentCommandRepositoryGateway)
    private readonly specialRetirementGrantDocumentCommandRepositoryGateway: SpecialRetirementGrantDocumentCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantBenefitCommandRepositoryGateway)
    private readonly specialRetirementGrantBenefitCommandRepositoryGateway: SpecialRetirementGrantBenefitCommandRepositoryGateway,
    @Inject(SpecialRetirementGrantLegalProceedingCommandRepositoryGateway)
    private readonly specialRetirementGrantLegalProceedingCommandRepositoryGateway: SpecialRetirementGrantLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    dto: UpdateSpecialRetirementGrantRequestDto,
  ): Promise<UpdateSpecialRetirementGrantResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    const specialRetirementGrantQueryResult =
      analysisToolRecordQueryResult.specialRetirementGrant;
    if (specialRetirementGrantQueryResult === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const hasExistingPpp =
      specialRetirementGrantQueryResult.specialRetirementGrantDocument.some(
        (doc) => doc.type === SpecialRetirementGrantDocumentTypeEnum.PPP,
      );

    if (dto.documents !== undefined) {
      const hasPpp = dto.documents.some(
        (doc) => doc.type === SpecialRetirementGrantDocumentTypeEnum.PPP,
      );
      if (!hasPpp) {
        throw new SpecialRetirementGrantAtLeastOnePppRequiredError();
      }
    } else if (!hasExistingPpp) {
      throw new SpecialRetirementGrantAtLeastOnePppRequiredError();
    }

    const cnisKey =
      dto.cnisDocument !== undefined
        ? await this.uploadCnis(dto.cnisDocument)
        : specialRetirementGrantQueryResult.cnisDocument;

    if (!cnisKey) {
      throw new SpecialRetirementGrantCnisRequiredError();
    }

    const specialRetirementGrant = new SpecialRetirementGrantEntity({
      ...specialRetirementGrantQueryResult,
      name: dto.name ?? specialRetirementGrantQueryResult.name,
      specialActivity:
        dto.specialActivity ??
        specialRetirementGrantQueryResult.specialActivity,
      cnisDocument: cnisKey,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolRecordQueryResult.analysisToolClient,
      createdBy: analysisToolRecordQueryResult.analysisToolClient.createdBy.id,
      updatedBy: analysisToolRecordQueryResult.analysisToolClient.updatedBy.id,
    });

    const analysisToolRecord = new AnalysisToolRecordEntity({
      id: analysisToolRecordQueryResult.id,
      code: analysisToolRecordQueryResult.code,
      type: analysisToolRecordQueryResult.type,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      deletedAt: analysisToolRecordQueryResult.deletedAt,
      analysisToolClient,
      specialRetirementGrant,
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      administrativeProcedureInssAnalysis: null,
      judicialCaseAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      teacherRetirementPlanning: null,
      disabilityRetirementPlanning: null,
      generalUrbanRetirementGrant: null,
      generalUrbanRetirementAnalysis: null,
      specialCategoryRetirementAnalysis: null,
    });

    const transactions: TransactionType[] = [];

    if (dto.documents !== undefined) {
      const docTransactions = await this.updateDocumentsOnDatabase(
        specialRetirementGrant,
        specialRetirementGrantQueryResult.specialRetirementGrantDocument,
        dto.documents,
      );
      transactions.push(...docTransactions);
    }

    if (dto.inssBenefitNumber !== undefined) {
      const benefitTransactions = this.updateBenefitsOnDatabase(
        specialRetirementGrant,
        specialRetirementGrantQueryResult.specialRetirementGrantBenefit,
        dto.inssBenefitNumber,
      );
      transactions.push(...benefitTransactions);
    }

    if (dto.legalProceedingNumber !== undefined) {
      const legalProceedingTransactions = this.updateLegalProceedingsOnDatabase(
        specialRetirementGrant,
        specialRetirementGrantQueryResult.specialRetirementGrantLegalProceeding,
        dto.legalProceedingNumber,
      );
      transactions.push(...legalProceedingTransactions);
    }

    const updateSpecialRetirementGrantTransaction =
      this.specialRetirementGrantCommandRepositoryGateway.updateSpecialRetirementGrant(
        specialRetirementGrant.id,
        specialRetirementGrant,
      );
    const updateAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.updateAnalysisToolRecord(
        analysisToolRecord.id,
        analysisToolRecord,
      );

    transactions.push(
      updateSpecialRetirementGrantTransaction,
      updateAnalysisToolRecordTransaction,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);
    await transaction.commit();

    return UpdateSpecialRetirementGrantResponseDto.build({
      specialRetirementGrantId: specialRetirementGrant.id,
    });
  }

  private async uploadCnis(cnisDocument: {
    base64: { decodeToBuffer(): Buffer };
    originalFileName: string;
  }): Promise<string> {
    const buffer = cnisDocument.base64.decodeToBuffer();
    const fileModel = FileModel.build({
      buffer,
      originalName: cnisDocument.originalFileName,
      size: buffer.length,
      encoding: 'base64',
    });
    return await this.fileProcessorGateway.uploadFile(fileModel);
  }

  private async updateDocumentsOnDatabase(
    specialRetirementGrant: SpecialRetirementGrantEntity,
    existingDocuments: GetSpecialRetirementGrantDocumentQueryResult[],
    newDocumentDtos: UpdateSpecialRetirementGrantRequestDto['documents'],
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    for (const existingDoc of existingDocuments) {
      transactions.push(
        this.specialRetirementGrantDocumentCommandRepositoryGateway.deleteSpecialRetirementGrantDocument(
          new SpecialRetirementGrantDocumentId(existingDoc.id.toString()),
        ),
      );
    }

    if (newDocumentDtos !== undefined) {
      for (const docDto of newDocumentDtos) {
        const buffer = docDto.document.base64.decodeToBuffer();
        const fileModel = FileModel.build({
          buffer,
          originalName: docDto.document.originalFileName,
          size: buffer.length,
          encoding: 'base64',
        });
        const documentKey =
          await this.fileProcessorGateway.uploadFile(fileModel);
        const newDocument = new SpecialRetirementGrantDocumentEntity({
          document: documentKey,
          type: docDto.type,
          specialRetirementGrant,
        });
        transactions.push(
          this.specialRetirementGrantDocumentCommandRepositoryGateway.createSpecialRetirementGrantDocument(
            newDocument,
          ),
        );
      }
    }

    return transactions;
  }

  private updateBenefitsOnDatabase(
    specialRetirementGrant: SpecialRetirementGrantEntity,
    existingBenefits: GetSpecialRetirementGrantBenefitQueryResult[],
    newBenefitNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    for (const existingBenefit of existingBenefits) {
      transactions.push(
        this.specialRetirementGrantBenefitCommandRepositoryGateway.deleteSpecialRetirementGrantBenefit(
          new SpecialRetirementGrantBenefitId(existingBenefit.id.toString()),
        ),
      );
    }

    for (const benefitNumber of newBenefitNumbers) {
      const newBenefit = new SpecialRetirementGrantBenefitEntity({
        inssBenefitNumber: benefitNumber,
        specialRetirementGrant,
      });
      transactions.push(
        this.specialRetirementGrantBenefitCommandRepositoryGateway.createSpecialRetirementGrantBenefit(
          newBenefit,
        ),
      );
    }

    return transactions;
  }

  private updateLegalProceedingsOnDatabase(
    specialRetirementGrant: SpecialRetirementGrantEntity,
    existingProceedings: GetSpecialRetirementGrantLegalProceedingQueryResult[],
    newProceedingNumbers: string[],
  ): TransactionType[] {
    const transactions: TransactionType[] = [];

    for (const existingProceeding of existingProceedings) {
      transactions.push(
        this.specialRetirementGrantLegalProceedingCommandRepositoryGateway.deleteSpecialRetirementGrantLegalProceeding(
          new SpecialRetirementGrantLegalProceedingId(
            existingProceeding.id.toString(),
          ),
        ),
      );
    }

    for (const proceedingNumber of newProceedingNumbers) {
      const newProceeding = new SpecialRetirementGrantLegalProceedingEntity({
        legalProceedingNumber: proceedingNumber,
        specialRetirementGrant,
      });
      transactions.push(
        this.specialRetirementGrantLegalProceedingCommandRepositoryGateway.createSpecialRetirementGrantLegalProceeding(
          newProceeding,
        ),
      );
    }

    return transactions;
  }
}
