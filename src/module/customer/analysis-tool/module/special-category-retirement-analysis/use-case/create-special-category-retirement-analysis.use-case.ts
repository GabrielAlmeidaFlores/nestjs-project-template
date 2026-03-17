import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
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
import { SpecialCategoryRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/command/special-category-retirement-analysis.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/command/special-category-retirement-analysis-result.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/special-category-retirement-analysis.entity';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity';
import { SpecialCategoryRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity';
import { SpecialCategoryRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/special-category-retirement-analysis-work-period.entity';
import { CreateSpecialCategoryRetirementAnalysisRemunerationInlineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration-inline.request.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodInlineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period-inline.request.dto';
import { CreateSpecialCategoryRetirementAnalysisRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis.request.dto';
import { CreateSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateSpecialCategoryRetirementAnalysisUseCase {
  protected readonly _type =
    CreateSpecialCategoryRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisCommandRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisCommandRepositoryGateway: SpecialCategoryRetirementAnalysisCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisResultCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly workPeriodCommandRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    )
    private readonly remunerationCommandRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    )
    private readonly periodDocumentCommandRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateSpecialCategoryRetirementAnalysisRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisResponseDto> {
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

    const specialCategoryRetirementAnalysis =
      new SpecialCategoryRetirementAnalysisEntity({
        analysisToolClientId: dto.analysisToolClientId,
        analysisCustomName: dto.analysisCustomName ?? null,
        retirementAnalysisObjectiveType:
          dto.retirementAnalysisObjectiveType ?? null,
        publicServiceFederativeEntityName:
          dto.publicServiceFederativeEntityName ?? null,
        publicServiceStateAbbreviation:
          dto.publicServiceStateAbbreviation ?? null,
        hasConfirmedExposureToHarmfulAgents:
          dto.hasConfirmedExposureToHarmfulAgents ?? false,
      });

    const maxCode =
      await this.analysisToolRecordQueryRepositoryGateway.findMaxCodeByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(maxCode + 1),
      type: AnalysisToolRecordTypeEnum.SPECIAL_CATEGORY_RETIREMENT,
      status: AnalysisStatusEnum.IN_PROGRESS,
      analysisToolClient,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
      cnisFastAnalysis: null,
      retirementPlanningRpps: null,
      retirementPlanningRgps: null,
      specialActivity: null,
      judicialCaseAnalysis: null,
      administrativeProcedureInssAnalysis: null,
      medicalQuestionGenerator: null,
      medicalAndSocialReportObjectionGeneratorAnalysis: null,
      speechGenerator: null,
      disabilityAssessmentForBpcAnalysis: null,
      audienceQuestionGenerator: null,
      perCapitaIncomeForBpcAnalysis: null,
      ruralTimelineAnalysis: null,
      insuranceQualityAnalysis: null,
      specialCategoryRetirementAnalysis,
    });

    const transactionItems: TransactionType[] = [
      this.specialCategoryRetirementAnalysisCommandRepositoryGateway.createSpecialCategoryRetirementAnalysis(
        specialCategoryRetirementAnalysis,
      ),
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      ),
    ];

    if (dto.administrativeProcedureAnalysis !== undefined) {
      const htmlAnalysis = await this.markdownConverterGateway.convertToHtml(
        dto.administrativeProcedureAnalysis,
      );

      const resultEntity = new SpecialCategoryRetirementAnalysisResultEntity({
        specialCategoryRetirementAnalysisId:
          specialCategoryRetirementAnalysis.id,
        administrativeProcedureAnalysis: htmlAnalysis,
        simplifiedAnalysisSummaryText: null,
        fullAnalysisConclusionText: null,
      });

      transactionItems.push(
        this.specialCategoryRetirementAnalysisResultCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisResult(
          resultEntity,
        ),
      );
    }

    if (dto.workPeriods !== undefined) {
      const workPeriodTransactions = await this.buildWorkPeriodTransactions(
        dto.workPeriods,
        specialCategoryRetirementAnalysis.id,
      );

      transactionItems.push(...workPeriodTransactions);
    }

    if (dto.remunerations !== undefined) {
      const remunerationTransactions = this.buildRemunerationTransactions(
        dto.remunerations,
        specialCategoryRetirementAnalysis.id,
      );

      transactionItems.push(...remunerationTransactions);
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactionItems);

    await transaction.commit();

    return CreateSpecialCategoryRetirementAnalysisResponseDto.build({
      specialCategoryRetirementAnalysisId: specialCategoryRetirementAnalysis.id,
    });
  }

  private async buildWorkPeriodTransactions(
    workPeriodsDto: CreateSpecialCategoryRetirementAnalysisWorkPeriodInlineRequestDto[],
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<TransactionType[]> {
    const transactions: TransactionType[] = [];

    for (const wpDto of workPeriodsDto) {
      const workPeriod = new SpecialCategoryRetirementAnalysisWorkPeriodEntity({
        specialCategoryRetirementAnalysisId: analysisId,
        publicServiceAdmissionDate: wpDto.publicServiceAdmissionDate ?? null,
        publicServiceCareerStartDate:
          wpDto.publicServiceCareerStartDate ?? null,
        workPeriodStartDate: wpDto.workPeriodStartDate,
        workPeriodEndDate: wpDto.workPeriodEndDate,
        jobPositionTitle: wpDto.jobPositionTitle ?? null,
        careerPathName: wpDto.careerPathName ?? null,
        publicServiceTypeCategory: wpDto.publicServiceTypeCategory ?? null,
        specialTimeRegistrationType: wpDto.specialTimeRegistrationType,
        effectiveSpecialWorkStartDate:
          wpDto.effectiveSpecialWorkStartDate ?? null,
        effectiveSpecialWorkEndDate: wpDto.effectiveSpecialWorkEndDate ?? null,
      });

      transactions.push(
        this.workPeriodCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisWorkPeriod(
          workPeriod,
        ),
      );

      if (wpDto.periodDocuments !== undefined) {
        for (const docDto of wpDto.periodDocuments) {
          const buffer = docDto.document.base64.decodeToBuffer();

          const fileModel = FileModel.build({
            buffer,
            originalName: docDto.document.originalFileName,
            size: buffer.length,
            encoding: '7bit',
          });

          const storedFileExternalName =
            await this.fileProcessorGateway.uploadFile(fileModel);

          const periodDocument =
            new SpecialCategoryRetirementAnalysisPeriodDocumentEntity({
              specialCategoryRetirementAnalysisWorkPeriodId: workPeriod.id,
              storedFileExternalName,
              originalFileUploadName: docDto.document.originalFileName,
              retirementDocumentTypeCategory:
                docDto.retirementDocumentTypeCategory,
            });

          transactions.push(
            this.periodDocumentCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisPeriodDocument(
              periodDocument,
            ),
          );
        }
      }
    }

    return transactions;
  }

  private buildRemunerationTransactions(
    remunerationsDto: CreateSpecialCategoryRetirementAnalysisRemunerationInlineRequestDto[],
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): TransactionType[] {
    return remunerationsDto.map((remDto) => {
      const remuneration =
        new SpecialCategoryRetirementAnalysisRemunerationEntity({
          specialCategoryRetirementAnalysisId: analysisId,
          remunerationReferenceMonthYear: remDto.remunerationReferenceMonthYear,
          remunerationGrossAmount: remDto.remunerationGrossAmount ?? null,
        });

      return this.remunerationCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisRemuneration(
        remuneration,
      );
    });
  }
}
