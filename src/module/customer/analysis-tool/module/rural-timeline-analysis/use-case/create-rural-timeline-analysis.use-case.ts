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
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/command/rural-timeline-analysis-period.command.repository.gateway';
import { RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/command/rural-timeline-analysis-period-document.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/command/rural-timeline-analysis-period-economic-aspects.command.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/command/rural-timeline-analysis-period-residence.command.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/rural-timeline-analysis-period-family-group-member.entity';
import { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import { CreateRuralTimelineAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis.request.dto';
import { CreateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRuralTimelineAnalysisUseCase {
  protected readonly _type = CreateRuralTimelineAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCommandRepositoryGateway: RuralTimelineAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodCommandRepositoryGateway: RuralTimelineAnalysisPeriodCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway: RuralTimelineAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway: RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodResidenceCommandRepositoryGateway: RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRuralTimelineAnalysisRequestDto,
  ): Promise<CreateRuralTimelineAnalysisResponseDto> {
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

    const ruralTimelineAnalysis = new RuralTimelineAnalysisEntity({
      workRegime: dto.workRegime,
      ruralTimelineCompleteAnalysis: null,
      ruralTimelineSimplifiedAnalysis: null,
      ruralTimelinePeriodDocumentAnalysis: null,
      analysisToolClientId: dto.analysisToolClientId,
    });

    const residences: RuralTimelineAnalysisPeriodResidenceEntity[] = [];

    for (const periodDto of dto.periods) {
      if (periodDto.residence !== undefined) {
        residences.push(
          new RuralTimelineAnalysisPeriodResidenceEntity({
            city: periodDto.residence.city,
            stateCode: periodDto.residence.stateCode,
            distanceToPropertyKm: periodDto.residence.distanceToPropertyKm,
          }),
        );
      }
    }

    const periods: RuralTimelineAnalysisPeriodEntity[] = dto.periods.map(
      (periodDto, index) => {
        const residenceId =
          periodDto.residence !== undefined
            ? (residences.find((_, i) => i === index)?.id ?? null)
            : null;

        return new RuralTimelineAnalysisPeriodEntity({
          startDate: periodDto.startDate ?? null,
          endDate: periodDto.endDate ?? null,
          workerType: periodDto.workerType ?? null,
          workRegimeType: periodDto.workRegimeType ?? null,
          productionDestination: periodDto.productionDestination ?? null,
          ruralTimelineId: ruralTimelineAnalysis.id,
          ruralTimelinePeriodPropertyId: null,
          ruralTimelinePeriodResidenceId: residenceId,
        });
      },
    );

    const documents: RuralTimelineAnalysisPeriodDocumentEntity[] = [];

    for (const [index, periodDto] of dto.periods.entries()) {
      if (periodDto.documents !== undefined) {
        const period = periods[index];

        if (period === undefined) {
          continue;
        }

        for (const documentDto of periodDto.documents) {
          const fileBuffer = documentDto.document.base64.decodeToBuffer();
          const fileModel = FileModel.build({
            buffer: fileBuffer,
            originalName: documentDto.document.originalFileName,
            size: fileBuffer.length,
            encoding: 'base64',
          });

          const fileName =
            await this.fileProcessorGateway.uploadFile(fileModel);

          documents.push(
            new RuralTimelineAnalysisPeriodDocumentEntity({
              documentYear: documentDto.documentYear ?? null,
              documentHolderType: documentDto.documentHolderType ?? null,
              selfOwned: documentDto.selfOwned ?? null,
              probatoryPurpose: documentDto.probatoryPurpose ?? null,
              document: fileName,
              type: documentDto.type,
              ruralTimelinePeriodId: period.id,
            }),
          );
        }
      }
    }

    const economicAspects: RuralTimelineAnalysisPeriodEconomicAspectsEntity[] =
      [];

    for (const [index, periodDto] of dto.periods.entries()) {
      if (periodDto.economicAspects !== undefined) {
        const period = periods[index];

        if (period === undefined) {
          continue;
        }

        for (const economicAspectDto of periodDto.economicAspects) {
          economicAspects.push(
            new RuralTimelineAnalysisPeriodEconomicAspectsEntity({
              type: economicAspectDto.type,
              content: economicAspectDto.content ?? null,
              ruralTimelinePeriodId: period.id,
            }),
          );
        }
      }
    }

    const familyGroupMembers: RuralTimelineAnalysisPeriodFamilyGroupMemberEntity[] =
      [];

    for (const [index, periodDto] of dto.periods.entries()) {
      if (periodDto.familyGroupMembers !== undefined) {
        const period = periods[index];

        if (period === undefined) {
          continue;
        }

        for (const memberDto of periodDto.familyGroupMembers) {
          let cnisFileName: string | null = null;

          if (memberDto.cnisDocument !== undefined) {
            const fileBuffer = memberDto.cnisDocument.base64.decodeToBuffer();
            const fileModel = FileModel.build({
              buffer: fileBuffer,
              originalName: memberDto.cnisDocument.originalFileName,
              size: fileBuffer.length,
              encoding: 'base64',
            });

            cnisFileName =
              await this.fileProcessorGateway.uploadFile(fileModel);
          }

          familyGroupMembers.push(
            new RuralTimelineAnalysisPeriodFamilyGroupMemberEntity({
              name: memberDto.name,
              federalDocument: memberDto.federalDocument,
              kinship: memberDto.kinship,
              receivesRuralBenefit: memberDto.receivesRuralBenefit,
              benefitNumber: memberDto.benefitNumber ?? null,
              cnisDocument: cnisFileName,
              ruralTimelinePeriodId: period.id,
            }),
          );
        }
      }
    }

    const countRecords: number =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS,
      ruralTimelineAnalysis,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      ruralTimelineAnalysis,
      periods,
      documents,
      residences,
      economicAspects,
      familyGroupMembers,
      analysisToolRecord,
    );

    return CreateRuralTimelineAnalysisResponseDto.build({
      ruralTimelineAnalysisId: ruralTimelineAnalysis.id,
    });
  }

  private async createOnDatabase(
    ruralTimelineAnalysis: RuralTimelineAnalysisEntity,
    periods: RuralTimelineAnalysisPeriodEntity[],
    documents: RuralTimelineAnalysisPeriodDocumentEntity[],
    residences: RuralTimelineAnalysisPeriodResidenceEntity[],
    economicAspects: RuralTimelineAnalysisPeriodEconomicAspectsEntity[],
    familyGroupMembers: RuralTimelineAnalysisPeriodFamilyGroupMemberEntity[],
    analysisToolRecord: AnalysisToolRecordEntity,
  ): Promise<void> {
    const ruralTimelineAnalysisTransaction =
      this.ruralTimelineAnalysisCommandRepositoryGateway.createRuralTimeline(
        ruralTimelineAnalysis,
      );

    const periodTransactions = periods.map((period) => {
      return this.ruralTimelineAnalysisPeriodCommandRepositoryGateway.createRuralTimelineAnalysisPeriod(
        period,
      );
    });

    const documentTransactions = documents.map((document) => {
      return this.ruralTimelineAnalysisPeriodDocumentCommandRepositoryGateway.createRuralTimelineAnalysisPeriodDocument(
        document,
      );
    });

    const residenceTransactions = residences.map((residence) => {
      return this.ruralTimelineAnalysisPeriodResidenceCommandRepositoryGateway.createRuralTimelineAnalysisPeriodResidence(
        residence,
      );
    });

    const economicAspectsTransactions = economicAspects.map(
      (economicAspect) => {
        return this.ruralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway.createRuralTimelineAnalysisPeriodEconomicAspects(
          economicAspect,
        );
      },
    );

    const familyGroupMemberTransactions = familyGroupMembers.map((member) => {
      return this.ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway.createRuralTimelineAnalysisPeriodFamilyGroupMember(
        member,
      );
    });

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ruralTimelineAnalysisTransaction,
      ...periodTransactions,
      ...documentTransactions,
      ...residenceTransactions,
      ...economicAspectsTransactions,
      ...familyGroupMemberTransactions,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
