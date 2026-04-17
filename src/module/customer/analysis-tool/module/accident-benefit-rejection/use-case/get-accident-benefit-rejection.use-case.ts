import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';
import {
  GetAccidentBenefitRejectionAnalysisToolClientResponseDto,
  GetAccidentBenefitRejectionCnisDocumentResponseDto,
  GetAccidentBenefitRejectionDocumentInResponseDto,
  GetAccidentBenefitRejectionEventDocumentInResponseDto,
  GetAccidentBenefitRejectionEventInResponseDto,
  GetAccidentBenefitRejectionResponseDto,
  GetAccidentBenefitRejectionResultResponseDto,
  GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto,
  GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto,
  GetAccidentBenefitRejectionWorkPeriodInResponseDto,
} from '@module/customer/analysis-tool/module/accident-benefit-rejection/dto/response/get-accident-benefit-rejection.response.dto';
import { AccidentBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-not-found.error';
import { AccidentBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/generic/accident-benefit-rejection-first-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { AccidentBenefitRejectionDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/accident-benefit-rejection-document.entity';
import type { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';
import type { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';
import type { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import type { AccidentBenefitRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/accident-benefit-rejection-work-period.entity';
import type { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import type { AccidentBenefitRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/interface/accident-benefit-rejection-first-analysis.interface';
import type { AccidentBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/interface/accident-benefit-rejection-result.interface';

@Injectable()
export class GetAccidentBenefitRejectionUseCase {
  protected readonly _type = GetAccidentBenefitRejectionUseCase.name;

  public constructor(
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionQueryRepositoryGateway)
    private readonly accidentBenefitRejectionQueryRepositoryGateway: AccidentBenefitRejectionQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
  ): Promise<GetAccidentBenefitRejectionResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        accidentBenefitRejectionId,
        AccidentBenefitRejectionNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        accidentBenefitRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AccidentBenefitRejectionNotFoundError,
      ),
    ]);

    const cnisDoc =
      (result.accidentBenefitRejectionDocument ?? []).find(
        (d: AccidentBenefitRejectionDocumentEntity) =>
          d.type === AccidentBenefitRejectionDocumentTypeEnum.CNIS,
      ) ?? null;

    const cnisDocument =
      cnisDoc !== null && cnisDoc.document !== null
        ? await this.buildCnisDocumentResponse(cnisDoc.document)
        : null;

    const firstAnalysis =
      result.accidentBenefitRejectionResult !== null &&
      result.accidentBenefitRejectionResult.firstAnalysis !== null
        ? this.parseStoredFirstAnalysis(
            result.accidentBenefitRejectionResult.firstAnalysis,
          )
        : null;

    const completeAnalysis =
      result.accidentBenefitRejectionResult !== null &&
      result.accidentBenefitRejectionResult.completeAnalysis !== null
        ? this.parseStoredCompleteAnalysis(
            result.accidentBenefitRejectionResult.completeAnalysis,
          )
        : null;

    const events = (result.accidentBenefitRejectionEvent ?? []).map(
      (event: AccidentBenefitRejectionEventEntity) => {
        const eventDocuments = (
          result.accidentBenefitRejectionEventDocument ?? []
        ).filter(
          (doc: AccidentBenefitRejectionEventDocumentEntity) =>
            doc.accidentBenefitRejectionEventId !== null &&
            doc.accidentBenefitRejectionEventId.toString() ===
              event.id.toString() &&
            doc.document !== null &&
            doc.type !== null,
        );

        return GetAccidentBenefitRejectionEventInResponseDto.build({
          ...(event.accidentDate !== null && {
            accidentDate: event.accidentDate,
          }),
          ...(event.accidentDescription !== null && {
            accidentDescription: event.accidentDescription,
          }),
          ...(event.cidTenId !== null && { cidTenId: event.cidTenId }),
          ...(eventDocuments.length > 0 && {
            eventDocuments: eventDocuments.map(
              (doc: AccidentBenefitRejectionEventDocumentEntity) =>
                GetAccidentBenefitRejectionEventDocumentInResponseDto.build({
                  fileName: doc.document as string,
                  type: doc.type as NonNullable<typeof doc.type>,
                }),
            ),
          }),
        });
      },
    );

    const workPeriods = (result.accidentBenefitRejectionWorkPeriod ?? []).map(
      (wp: AccidentBenefitRejectionWorkPeriodEntity) => {
        const wpDocuments = (
          result.accidentBenefitRejectionWorkPeriodDocument ?? []
        ).filter(
          (doc: AccidentBenefitRejectionWorkPeriodDocumentEntity) =>
            doc.accidentBenefitRejectionWorkPeriodId !== null &&
            doc.accidentBenefitRejectionWorkPeriodId.toString() ===
              wp.id.toString() &&
            doc.document !== null &&
            doc.type !== null,
        );

        const earningsHistory = (
          result.accidentBenefitRejectionWorkPeriodEarningsHistory ?? []
        ).filter(
          (eh: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity) =>
            eh.accidentBenefitRejectionWorkPeriodId !== null &&
            eh.accidentBenefitRejectionWorkPeriodId.toString() ===
              wp.id.toString(),
        );

        const parsedGracePeriod =
          wp.gracePeriod !== null ? Number(wp.gracePeriod) : null;

        const parsedCategory =
          wp.category !== null &&
          Object.values(AccidentBenefitRejectionCategoryEnum).includes(
            wp.category as AccidentBenefitRejectionCategoryEnum,
          )
            ? (wp.category as AccidentBenefitRejectionCategoryEnum)
            : null;

        return GetAccidentBenefitRejectionWorkPeriodInResponseDto.build({
          ...(wp.bondOrigin !== null && { bondOrigin: wp.bondOrigin }),
          ...(wp.startDate !== null && { startDate: wp.startDate }),
          ...(wp.endDate !== null && { endDate: wp.endDate }),
          ...(parsedCategory !== null && { category: parsedCategory }),
          ...(wp.competenceBelowTheMinimum !== null && {
            competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
          }),
          ...(wp.pendencyReason !== null && {
            pendencyReason: wp.pendencyReason,
          }),
          ...(wp.periodConsideration !== null && {
            periodConsideration: wp.periodConsideration,
          }),
          ...(wp.contributionAverage !== null && {
            contributionAverage: new DecimalValue(wp.contributionAverage),
          }),
          ...(wp.status !== null && { status: wp.status === 'true' }),
          ...(parsedGracePeriod !== null &&
            !Number.isNaN(parsedGracePeriod) && {
              gracePeriod: parsedGracePeriod,
            }),
          ...(wp.jobType !== null && { jobType: wp.jobType }),
          ...(wp.activityDescription !== null && {
            activityDescription: wp.activityDescription,
          }),
          ...(wpDocuments.length > 0 && {
            documents: wpDocuments.map(
              (doc: AccidentBenefitRejectionWorkPeriodDocumentEntity) =>
                GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto.build(
                  {
                    fileName: doc.document as string,
                    type: doc.type as NonNullable<typeof doc.type>,
                  },
                ),
            ),
          }),
          ...(earningsHistory.length > 0 && {
            earningsHistory: earningsHistory.map(
              (eh: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity) =>
                GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto.build(
                  {
                    ...(eh.competence !== null && {
                      competence: eh.competence,
                    }),
                    ...(eh.remuneration !== null && {
                      remuneration: eh.remuneration,
                    }),
                    ...(eh.indicators !== null && {
                      indicators: eh.indicators,
                    }),
                    ...(eh.paymentDate !== null && {
                      paymentDate: eh.paymentDate,
                    }),
                    ...(eh.contribution !== null && {
                      contribution: eh.contribution,
                    }),
                    ...(eh.contributionSalary !== null && {
                      contributionSalary: eh.contributionSalary,
                    }),
                    ...(eh.competenceBelowTheMinimum !== null && {
                      competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                    }),
                  },
                ),
            ),
          }),
        });
      },
    );

    const documents = (result.accidentBenefitRejectionDocument ?? []).map(
      (doc: AccidentBenefitRejectionDocumentEntity) =>
        doc.document !== null && doc.type !== null
          ? GetAccidentBenefitRejectionDocumentInResponseDto.build({
              fileName: doc.document,
              type: doc.type,
            })
          : null,
    );

    const inssBenefits = (result.accidentBenefitRejectionInssBenefit ?? [])
      .map((ib: AccidentBenefitRejectionInssBenefitEntity) => ib.inssBenefit)
      .filter((inssBenefit): inssBenefit is string => inssBenefit !== null);

    const validDocuments = documents.filter(
      (
        document,
      ): document is GetAccidentBenefitRejectionDocumentInResponseDto =>
        document !== null,
    );

    const resultDto =
      result.accidentBenefitRejectionResult !== null
        ? GetAccidentBenefitRejectionResultResponseDto.build({
            ...(firstAnalysis !== null && {
              accidentBenefitRejectionFirstAnalysis: firstAnalysis,
            }),
            ...(result.accidentBenefitRejectionResult.secondAnalysis !==
              null && {
              accidentBenefitRejectionSecondAnalysis:
                result.accidentBenefitRejectionResult.secondAnalysis,
            }),
            ...(completeAnalysis !== null && {
              accidentBenefitRejectionCompleteAnalysis: completeAnalysis,
            }),
            ...(result.accidentBenefitRejectionResult.simplifiedAnalysis !==
              null && {
              accidentBenefitRejectionSimplifiedAnalysis:
                result.accidentBenefitRejectionResult.simplifiedAnalysis,
            }),
            ...(result.accidentBenefitRejectionResult
              .completeAnalysisDownload !== null && {
              accidentBenefitRejectionCompleteAnalysisDownload:
                result.accidentBenefitRejectionResult.completeAnalysisDownload,
            }),
          })
        : null;

    const clientEntity = analysisToolRecord.analysisToolClient;
    const clientDto =
      GetAccidentBenefitRejectionAnalysisToolClientResponseDto.build({
        analysisToolClientId: clientEntity.id,
        ...(clientEntity.name !== null && { name: clientEntity.name }),
        ...(clientEntity.federalDocument !== null && {
          federalDocument: clientEntity.federalDocument,
        }),
        ...(clientEntity.email !== null && { email: clientEntity.email }),
        ...(clientEntity.corporateEmail !== null && {
          corporateEmail: clientEntity.corporateEmail,
        }),
        ...(clientEntity.phoneNumber !== null && {
          phoneNumber: clientEntity.phoneNumber,
        }),
        ...(clientEntity.birthDate !== null && {
          birthDate: clientEntity.birthDate,
        }),
        ...(clientEntity.gender !== null && {
          gender: clientEntity.gender,
        }),
        ...(clientEntity.clientType !== null && {
          clientType: clientEntity.clientType,
        }),
      });

    return GetAccidentBenefitRejectionResponseDto.build({
      accidentBenefitRejectionId: result.accidentBenefitRejectionId,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.requirementStartDate !== null && {
        requirementStartDate: result.requirementStartDate,
      }),
      ...(result.rejectionDate !== null && {
        rejectionDate: result.rejectionDate,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.mainAccidentBenefitRejectionReason !== null && {
        mainAccidentBenefitRejectionReason:
          result.mainAccidentBenefitRejectionReason,
      }),
      ...(result.otherAccidentBenefitRejectionReason !== null && {
        otherAccidentBenefitRejectionReason:
          result.otherAccidentBenefitRejectionReason,
      }),
      ...(result.hasPreviousGrantRelated !== null && {
        hasPreviousGrantRelated: result.hasPreviousGrantRelated,
      }),
      ...(result.previousGrantBenefitNumber !== null && {
        previousGrantBenefitNumber: result.previousGrantBenefitNumber,
      }),
      ...(result.previousGrantStartDate !== null && {
        previousGrantStartDate: result.previousGrantStartDate,
      }),
      ...(result.previousGrantTerminationDate !== null && {
        previousGrantTerminationDate: result.previousGrantTerminationDate,
      }),
      ...(result.requestToExtendTemporaryDisabilityBenefit !== null && {
        requestToExtendTemporaryDisabilityBenefit:
          result.requestToExtendTemporaryDisabilityBenefit,
      }),
      ...(inssBenefits.length > 0 && { inssBenefits }),
      ...(validDocuments.length > 0 && { documents: validDocuments }),
      ...(events.length > 0 && { events }),
      ...(workPeriods.length > 0 && { workPeriods }),
      ...(resultDto !== null && { result: resultDto }),
      client: clientDto,
      ...(cnisDocument !== null && { cnisDocument }),
    });
  }

  private async buildCnisDocumentResponse(
    fileName: string,
  ): Promise<GetAccidentBenefitRejectionCnisDocumentResponseDto> {
    const [buffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(fileName),
      this.fileProcessorGateway.getOriginalFileName(fileName),
    ]);

    return GetAccidentBenefitRejectionCnisDocumentResponseDto.build({
      document: new Base64(buffer.toString('base64')),
      originalFileName,
    });
  }

  private parseStoredFirstAnalysis(
    json: string,
  ): AccidentBenefitRejectionFirstAnalysisModel {
    const parsed = JSON.parse(
      json,
    ) as AccidentBenefitRejectionFirstAnalysisInterface;

    return AccidentBenefitRejectionFirstAnalysisModel.build({
      insuredStatusMantained: parsed.insuredStatusMantained,
      insuredStatusAnalysisConclusion: parsed.insuredStatusAnalysisConclusion,
      presenceOfPermanentSequelae: parsed.presenceOfPermanentSequelae,
      compatibilityOfTheSequelaeWithAccident:
        parsed.compatibilityOfTheSequelaeWithAccident,
      sequelaeAnalysisConclusion: parsed.sequelaeAnalysisConclusion,
    });
  }

  private parseStoredCompleteAnalysis(
    json: string,
  ): AccidentBenefitRejectionResultInterface {
    return JSON.parse(json) as AccidentBenefitRejectionResultInterface;
  }
}
