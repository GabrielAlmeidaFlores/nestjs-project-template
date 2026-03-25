import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MedicalQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator/command/medical-question-generator.command.repository.gateway';
import { MedicalQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-document/command/medical-question-generator-document.command.repository.gateway';
import { MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-inss-benefit/command/medical-question-generator-inss-benefit.command.repository.gateway';
import { MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/medical-question-generator/domain/repository/medical-question-generator-legal-proceeding/command/medical-question-generator-legal-proceeding.command.repository.gateway';
import { MedicalQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/medical-question-generator.entity';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { MedicalQuestionGeneratorDocumentTypeEnum } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/enum/medical-question-generator-document-type.enum';
import { MedicalQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/medical-question-generator-document.entity';
import { MedicalQuestionGeneratorDocumentId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-document/value-object/medical-question-generator-document-id/medical-question-generator-document-id.value-object';
import { MedicalQuestionGeneratorInssBenefitEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/medical-question-generator-inss-benefit.entity';
import { MedicalQuestionGeneratorInssBenefitId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-inss-benefit/value-object/medical-question-generator-inss-benefit-id/medical-question-generator-inss-benefit-id.value-object';
import { MedicalQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/medical-question-generator-legal-proceeding.entity';
import { MedicalQuestionGeneratorLegalProceedingId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-legal-proceeding/value-object/medical-question-generator-legal-proceeding-id/medical-question-generator-legal-proceeding-id.value-object';
import { CreateMedicalQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/request/create-medical-question-generator.request.dto';
import { CreateMedicalQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/medical-question-generator/dto/response/create-medical-question-generator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateMedicalQuestionGeneratorUseCase {
  protected readonly _type = CreateMedicalQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorCommandRepositoryGateway: MedicalQuestionGeneratorCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(MedicalQuestionGeneratorDocumentCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorDocumentCommandRepositoryGateway: MedicalQuestionGeneratorDocumentCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorInssBenefitCommandRepositoryGateway: MedicalQuestionGeneratorInssBenefitCommandRepositoryGateway,
    @Inject(MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway: MedicalQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateMedicalQuestionGeneratorRequestDto,
  ): Promise<CreateMedicalQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const medicalQuestionGeneratorId = new MedicalQuestionGeneratorId();

    const medicalQuestionGenerator = new MedicalQuestionGeneratorEntity({
      id: medicalQuestionGeneratorId,
      disabilityDate: dto.json.disabilityDate ?? null,
    });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR,
      medicalQuestionGenerator,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactionOperations: TransactionType[] = [];

    transactionOperations.push(
      this.medicalQuestionGeneratorCommandRepositoryGateway.createMedicalQuestionGenerator(
        medicalQuestionGenerator,
      ),
    );

    if (dto.cnisDocument !== undefined && dto.cnisDocument.length > 0) {
      for (const cnisDoc of dto.cnisDocument) {
        const documentId = new MedicalQuestionGeneratorDocumentId();

        const documentUrl = await this.fileProcessorGateway.uploadFile(cnisDoc);

        const document = new MedicalQuestionGeneratorDocumentEntity({
          id: documentId,
          type: MedicalQuestionGeneratorDocumentTypeEnum.CNIS,
          document: documentUrl,
          medicalQuestionGenerator,
        });

        transactionOperations.push(
          this.medicalQuestionGeneratorDocumentCommandRepositoryGateway.createMedicalQuestionGeneratorDocument(
            document,
          ),
        );
      }
    }

    if (dto.medicalDocument !== undefined && dto.medicalDocument.length > 0) {
      for (const medicalDoc of dto.medicalDocument) {
        const documentId = new MedicalQuestionGeneratorDocumentId();

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(medicalDoc);

        const document = new MedicalQuestionGeneratorDocumentEntity({
          id: documentId,
          type: MedicalQuestionGeneratorDocumentTypeEnum.MEDICAL,
          document: documentUrl,
          medicalQuestionGenerator,
        });

        transactionOperations.push(
          this.medicalQuestionGeneratorDocumentCommandRepositoryGateway.createMedicalQuestionGeneratorDocument(
            document,
          ),
        );
      }
    }

    if (dto.json.inssBenefitNumber && dto.json.inssBenefitNumber.length > 0) {
      for (const inssBenefitNumber of dto.json.inssBenefitNumber) {
        const inssBenefitId = new MedicalQuestionGeneratorInssBenefitId();

        const inssBenefit = new MedicalQuestionGeneratorInssBenefitEntity({
          id: inssBenefitId,
          inssBenefitNumber,
          medicalQuestionGenerator,
        });

        transactionOperations.push(
          this.medicalQuestionGeneratorInssBenefitCommandRepositoryGateway.createMedicalQuestionGeneratorInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (
      dto.json.legalProceedingNumber &&
      dto.json.legalProceedingNumber.length > 0
    ) {
      for (const legalProceedingNumber of dto.json.legalProceedingNumber) {
        const legalProceedingId =
          new MedicalQuestionGeneratorLegalProceedingId();

        const legalProceeding =
          new MedicalQuestionGeneratorLegalProceedingEntity({
            id: legalProceedingId,
            legalProceedingNumber,
            medicalQuestionGenerator,
          });

        transactionOperations.push(
          this.medicalQuestionGeneratorLegalProceedingCommandRepositoryGateway.createMedicalQuestionGeneratorLegalProceeding(
            legalProceeding,
          ),
        );
      }
    }

    transactionOperations.push(
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.CREATED,
        analysisType: AnalysisToolRecordTypeEnum.MEDICAL_QUESTION_GENERATOR,
        organizationMemberId: analysisToolRecord.createdBy,
        analysisToolClientId: analysisToolRecord.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecord.id,
        transactions: transactionOperations,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return CreateMedicalQuestionGeneratorResponseDto.build({
      medicalQuestionGeneratorId,
    });
  }
}
