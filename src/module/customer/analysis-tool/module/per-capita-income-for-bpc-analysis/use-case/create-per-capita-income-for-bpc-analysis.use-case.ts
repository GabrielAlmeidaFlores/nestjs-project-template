import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
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
import { PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/command/per-capita-income-for-bpc-analysis.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-benefit/command/per-capita-income-for-bpc-analysis-benefit.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-document/command/per-capita-income-for-bpc-analysis-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-legal-proceeding/command/per-capita-income-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/per-capita-income-for-bpc-analysis.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/enum/per-capita-income-for-bpc-analysis-document-type.enum';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { CreatePerCapitaIncomeForBpcAnalysisRequestDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/request/create-per-capita-income-for-bpc-analysis.request.dto';
import { CreatePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/create-per-capita-income-for-bpc-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePerCapitaIncomeForBpcAnalysisUseCase {
  protected readonly _type = CreatePerCapitaIncomeForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway,
    @Inject(
      PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway,
    )
    private readonly perCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway,
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
    dto: CreatePerCapitaIncomeForBpcAnalysisRequestDto,
  ): Promise<CreatePerCapitaIncomeForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisDocumentFile =
      dto.cnisDocument !== undefined
        ? await this.fileProcessorGateway.uploadFile(dto.cnisDocument)
        : undefined;

    const cadUnicoDocumentFile =
      dto.cadUnicoDocument !== undefined
        ? await this.fileProcessorGateway.uploadFile(dto.cadUnicoDocument)
        : undefined;

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

    const perCapitaIncomeForBpcAnalysis =
      new PerCapitaIncomeForBpcAnalysisEntity({
        createdBy: organizationMember.id,
        updatedBy: organizationMember.id,
      });

    const documents: PerCapitaIncomeForBpcAnalysisDocumentEntity[] = [];

    if (cnisDocumentFile !== undefined) {
      documents.push(
        new PerCapitaIncomeForBpcAnalysisDocumentEntity({
          document: cnisDocumentFile,
          type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum.CNIS,
          perCapitaIncomeForBpcAnalysis,
        }),
      );
    }

    if (cadUnicoDocumentFile !== undefined) {
      documents.push(
        new PerCapitaIncomeForBpcAnalysisDocumentEntity({
          document: cadUnicoDocumentFile,
          type: PerCapitaIncomeForBpcAnalysisDocumentTypeEnum.CAD_UNICO,
          perCapitaIncomeForBpcAnalysis,
        }),
      );
    }

    const perCapitaIncomeForBpcAnalysisBenefit =
      dto.json.inssBenefitNumber !== undefined
        ? dto.json.inssBenefitNumber.map((value) => {
            return new PerCapitaIncomeForBpcAnalysisBenefitEntity({
              inssBenefitNumber: value,
              perCapitaIncomeForBpcAnalysis,
            });
          })
        : [];

    const perCapitaIncomeForBpcAnalysisLegalProceeding =
      dto.json.legalProceedingNumber !== undefined
        ? dto.json.legalProceedingNumber.map((value) => {
            return new PerCapitaIncomeForBpcAnalysisLegalProceedingEntity({
              legalProceedingNumber: value,
              perCapitaIncomeForBpcAnalysis,
            });
          })
        : [];

    const countRecords =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.PER_CAPITA_INCOME_FOR_BPC_ANALYSIS,
      perCapitaIncomeForBpcAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const createPerCapitaIncomeForBpcAnalysisTransaction =
      this.perCapitaIncomeForBpcAnalysisCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysis(
        perCapitaIncomeForBpcAnalysis,
      );

    const createDocumentsTransaction =
      this.perCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway.createManyPerCapitaIncomeForBpcAnalysisDocument(
        documents,
      );

    const createBenefitTransaction = perCapitaIncomeForBpcAnalysisBenefit.map(
      (value) =>
        this.perCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisBenefit(
          value,
        ),
    );

    const createLegalProceedingTransaction =
      perCapitaIncomeForBpcAnalysisLegalProceeding.map((value) =>
        this.perCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway.createPerCapitaIncomeForBpcAnalysisLegalProceeding(
          value,
        ),
      );

    const createAnalysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createPerCapitaIncomeForBpcAnalysisTransaction,
      ...createDocumentsTransaction,
      ...createBenefitTransaction,
      ...createLegalProceedingTransaction,
      createAnalysisToolRecordTransaction,
    ]);

    await transaction.commit();

    return CreatePerCapitaIncomeForBpcAnalysisResponseDto.build({
      perCapitaIncomeForBpcAnalysisId: perCapitaIncomeForBpcAnalysis.id,
    });
  }
}
