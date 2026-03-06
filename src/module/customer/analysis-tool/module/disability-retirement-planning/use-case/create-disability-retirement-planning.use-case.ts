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
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DisabilityRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/command/disability-retirement-planning.command.repository.gateway';
import { DisabilityRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/command/disability-retirement-planning-document.command.repository.gateway';
import { DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/command/disability-retirement-planning-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/command/disability-retirement-planning-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';
import { DisabilityRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity';
import { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';
import { DisabilityRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity';
import { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';
import { CreateDisabilityRetirementPlanningRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/create-disability-retirement-planning.request.dto';
import { CreateDisabilityRetirementPlanningResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/create-disability-retirement-planning.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateDisabilityRetirementPlanningUseCase {
  protected readonly _type = CreateDisabilityRetirementPlanningUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningCommandRepositoryGateway: DisabilityRetirementPlanningCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningDocumentCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningDocumentCommandRepositoryGateway: DisabilityRetirementPlanningDocumentCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningInssBenefitCommandRepositoryGateway: DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway,
    @Inject(DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningLegalProceedingCommandRepositoryGateway: DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateDisabilityRetirementPlanningRequestDto,
  ): Promise<CreateDisabilityRetirementPlanningResponseDto> {
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
        dto.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const disabilityRetirementPlanningId = new DisabilityRetirementPlanningId();

    const disabilityRetirementPlanning = new DisabilityRetirementPlanningEntity(
      {
        id: disabilityRetirementPlanningId,
        currentPosition: dto.currentPosition,
        federativeEntity: dto.federativeEntity,
        state: dto.state ?? null,
        municipality: dto.municipality ?? null,
        longTimeDisability: dto.longTimeDisability,
        publicServiceStartDate: dto.publicServiceStartDate,
        careerStartDate: dto.careerStartDate,
        analysisName: dto.analysisName ?? null,
        administrativeProcessAnalysis: dto.administrativeProcessAnalysis ?? null,
      },
    );

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.DISABILITY_RETIREMENT_PLANNING,
      disabilityRetirementPlanning,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const transactionOperations: TransactionType[] = [];

    transactionOperations.push(
      this.disabilityRetirementPlanningCommandRepositoryGateway.createDisabilityRetirementPlanning(
        disabilityRetirementPlanning,
      ),
    );

    if (dto.documents && dto.documents.length > 0) {
      const documentTransactions = await Promise.all(
        dto.documents.map(async (documentDto) => {
          const buffer = documentDto.document.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: documentDto.document.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const documentUrl =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const documentEntity = new DisabilityRetirementPlanningDocumentEntity(
            {
              id: new DisabilityRetirementPlanningDocumentId(),
              disabilityRetirementPlanning: disabilityRetirementPlanning,
              document: documentUrl,
              type:
                documentDto.type ??
                DisabilityRetirementPlanningDocumentTypeEnum.CTC_DOCUMENT,
            },
          );

          return this.disabilityRetirementPlanningDocumentCommandRepositoryGateway.createDisabilityRetirementPlanningDocument(
            documentEntity,
          );
        }),
      );

      transactionOperations.push(...documentTransactions);
    }

    if (dto.inssBenefitNumber && dto.inssBenefitNumber.length > 0) {
      for (const benefitNumber of dto.inssBenefitNumber) {
        const inssBenefit = new DisabilityRetirementPlanningInssBenefitEntity({
          id: new DisabilityRetirementPlanningInssBenefitId(),
          disabilityRetirementPlanning: disabilityRetirementPlanning,
          benefitNumber,
        });

        transactionOperations.push(
          this.disabilityRetirementPlanningInssBenefitCommandRepositoryGateway.createDisabilityRetirementPlanningInssBenefit(
            inssBenefit,
          ),
        );
      }
    }

    if (dto.legalProceedingNumber && dto.legalProceedingNumber.length > 0) {
      for (const legalProceedingNumber of dto.legalProceedingNumber) {
        const legalProceeding =
          new DisabilityRetirementPlanningLegalProceedingEntity({
            id: new DisabilityRetirementPlanningLegalProceedingId(),
            disabilityRetirementPlanning: disabilityRetirementPlanning,
            legalProceedingNumber,
          });

        transactionOperations.push(
          this.disabilityRetirementPlanningLegalProceedingCommandRepositoryGateway.createDisabilityRetirementPlanningLegalProceeding(
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

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return CreateDisabilityRetirementPlanningResponseDto.build({
      disabilityRetirementPlanningId,
    });
  }
}
