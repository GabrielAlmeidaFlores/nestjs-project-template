import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { DeathBenefitQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/death-benefit.query.repository.gateway';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitNotFoundError } from '@module/customer/analysis-tool/module/death-benefit/error/death-benefit-not-found.error';
import {
  GetDeathBenefitResponseDto,
  GetDeathBenefitCnisDocumentResponseDto,
  GetDeathBenefitInssBenefitResponseDto,
  GetDeathBenefitLegalProceedingResponseDto,
  GetDeathBenefitResultResponseDto,
  GetDeathBenefitLegalRepresentativeResponseDto,
  GetDeathBenefitBenefitInstitorResponseDto,
  GetDeathBenefitDependentResponseDto,
  GetDeathBenefitDependentDocumentResponseDto,
  GetDeathBenefitPeriodResponseDto,
  GetDeathBenefitPeriodEarningsHistoryResponseDto,
} from '@module/customer/analysis-tool/module/death-benefit/dto/response/get-death-benefit.response.dto';

@Injectable()
export class GetDeathBenefitUseCase {
  protected readonly _type = GetDeathBenefitUseCase.name;

  public constructor(
    @Inject(DeathBenefitQueryRepositoryGateway)
    private readonly deathBenefitQueryRepositoryGateway: DeathBenefitQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    deathBenefitId: DeathBenefitId,
  ): Promise<GetDeathBenefitResponseDto> {
    const result =
      await this.deathBenefitQueryRepositoryGateway.findOneByDeathBenefitIdOrFailWithRelations(
        deathBenefitId,
        DeathBenefitNotFoundError,
      );

    const cnisDocumentEntity = result.deathBenefitDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    return GetDeathBenefitResponseDto.build({
      id: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.deathBenefitResult !== null && {
        deathBenefitResult: GetDeathBenefitResultResponseDto.build({
          ...(result.deathBenefitResult.deathBenefitFirstAnalysis !== null && {
            deathBenefitFirstAnalysis:
              result.deathBenefitResult.deathBenefitFirstAnalysis,
          }),
          ...(result.deathBenefitResult.deathBenefitCompleteAnalysis !==
            null && {
            deathBenefitCompleteAnalysis:
              result.deathBenefitResult.deathBenefitCompleteAnalysis,
          }),
          ...(result.deathBenefitResult.deathBenefitSimplifiedAnalysis !==
            null && {
            deathBenefitSimplifiedAnalysis:
              result.deathBenefitResult.deathBenefitSimplifiedAnalysis,
          }),
          ...(result.deathBenefitResult.deathBenefitCompleteAnalysisDownload !==
            null && {
            deathBenefitCompleteAnalysisDownload:
              result.deathBenefitResult.deathBenefitCompleteAnalysisDownload,
          }),
        }),
      }),
      ...(result.deathBenefitInssBenefit !== null && {
        deathBenefitInssBenefit: result.deathBenefitInssBenefit.map((b) =>
          GetDeathBenefitInssBenefitResponseDto.build({
            inssBenefit: b.inssBenefit,
          }),
        ),
      }),
      ...(result.deathBenefitLegalProceeding !== null && {
        deathBenefitLegalProceeding: result.deathBenefitLegalProceeding.map(
          (p) =>
            GetDeathBenefitLegalProceedingResponseDto.build({
              legalProceedingNumber: p.legalProceedingNumber,
            }),
        ),
      }),
      ...(result.deathBenefitLegalRepresentative !== null && {
        deathBenefitLegalRepresentative:
          GetDeathBenefitLegalRepresentativeResponseDto.build({
            ...(result.deathBenefitLegalRepresentative.name !== null && {
              name: result.deathBenefitLegalRepresentative.name,
            }),
            ...(result.deathBenefitLegalRepresentative.cpf !== null && {
              cpf: result.deathBenefitLegalRepresentative.cpf,
            }),
            ...(result.deathBenefitLegalRepresentative.birthDate !== null && {
              birthDate: result.deathBenefitLegalRepresentative.birthDate,
            }),
            ...(result.deathBenefitLegalRepresentative
              .legalRepresentativeRelationship !== null && {
              legalRepresentativeRelationship:
                result.deathBenefitLegalRepresentative
                  .legalRepresentativeRelationship,
            }),
            ...(result.deathBenefitLegalRepresentative
              .isMinorUnderGuardianship !== null && {
              isMinorUnderGuardianship:
                result.deathBenefitLegalRepresentative.isMinorUnderGuardianship,
            }),
          }),
      }),
      ...(result.deathBenefitBenefitInstitutor !== null && {
        deathBenefitBenefitInstitutor:
          GetDeathBenefitBenefitInstitorResponseDto.build({
            ...(result.deathBenefitBenefitInstitutor.name !== null && {
              name: result.deathBenefitBenefitInstitutor.name,
            }),
            ...(result.deathBenefitBenefitInstitutor.cpf !== null && {
              cpf: result.deathBenefitBenefitInstitutor.cpf,
            }),
            ...(result.deathBenefitBenefitInstitutor.birthDate !== null && {
              birthDate: result.deathBenefitBenefitInstitutor.birthDate,
            }),
            ...(result.deathBenefitBenefitInstitutor.sex !== null && {
              sex: result.deathBenefitBenefitInstitutor.sex,
            }),
            ...(result.deathBenefitBenefitInstitutor.deathDate !== null && {
              deathDate: result.deathBenefitBenefitInstitutor.deathDate,
            }),
            ...(result.deathBenefitBenefitInstitutor.wasRetired !== null && {
              wasRetired: result.deathBenefitBenefitInstitutor.wasRetired,
            }),
            ...(result.deathBenefitBenefitInstitutor.retirementBenefitNumber !==
              null && {
              retirementBenefitNumber:
                result.deathBenefitBenefitInstitutor.retirementBenefitNumber,
            }),
          }),
      }),
      ...(result.deathBenefitDependent !== null && {
        deathBenefitDependent: await Promise.all(
          result.deathBenefitDependent.map((dep) =>
            this.buildDependentResponse(dep.id.toString(), result),
          ),
        ),
      }),
      ...(result.deathBenefitPeriod !== null && {
        deathBenefitPeriod: result.deathBenefitPeriod.map((p) => {
          const periodEarningsHistory = (
            result.deathBenefitPeriodEarningsHistory ?? []
          ).filter(
            (eh) =>
              eh.deathBenefitPeriodId.toString() === p.id.toString(),
          );

          return GetDeathBenefitPeriodResponseDto.build({
            startDate: p.startDate,
            ...(p.endDate !== null && { endDate: p.endDate }),
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            ...(p.pendencyReason !== null && {
              pendencyReason: p.pendencyReason,
            }),
            ...(p.typeOfContribution !== null && {
              typeOfContribution: p.typeOfContribution,
            }),
            status: p.status,
            ...(p.periodConsideration !== null && {
              periodConsideration: p.periodConsideration,
            }),
            ...(p.contributionAverage !== null && {
              contributionAverage: p.contributionAverage,
            }),
            ...(p.bondOrigin !== null && { bondOrigin: p.bondOrigin }),
            ...(periodEarningsHistory.length > 0 && {
              earningsHistory: periodEarningsHistory.map((eh) =>
                GetDeathBenefitPeriodEarningsHistoryResponseDto.build({
                  ...(eh.competence !== null && { competence: eh.competence }),
                  ...(eh.remuneration !== null && {
                    remuneration: eh.remuneration,
                  }),
                  ...(eh.indicators !== null && { indicators: eh.indicators }),
                  ...(eh.paymentDate !== null && {
                    paymentDate: eh.paymentDate,
                  }),
                  ...(eh.contribution !== null && {
                    contribution: eh.contribution,
                  }),
                  ...(eh.contributionSalary !== null && {
                    contributionSalary: eh.contributionSalary,
                  }),
                  ...(eh.analysis !== null && { analysis: eh.analysis }),
                  ...(eh.competenceBelowTheMinimum !== null && {
                    competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                  }),
                }),
              ),
            }),
          });
        }),
      }),
    });
  }

  private async buildCnisDocumentResponse(
    document: string,
  ): Promise<GetDeathBenefitCnisDocumentResponseDto> {
    const [buffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(document),
      this.fileProcessorGateway.getOriginalFileName(document),
    ]);

    return GetDeathBenefitCnisDocumentResponseDto.build({
      document: new Base64(buffer.toString('base64')),
      originalFileName,
    });
  }

  private async buildDependentResponse(
    dependentIdString: string,
    result: Awaited<
      ReturnType<
        DeathBenefitQueryRepositoryGateway['findOneByDeathBenefitIdOrFailWithRelations']
      >
    >,
  ): Promise<GetDeathBenefitDependentResponseDto> {
    const dep = result.deathBenefitDependent!.find(
      (d) => d.id.toString() === dependentIdString,
    )!;

    const dependentDocs = (result.deathBenefitDependentDocument ?? []).filter(
      (d) => d.deathBenefitDependentId.toString() === dependentIdString,
    );

    const builtDocs =
      dependentDocs.length > 0
        ? await Promise.all(
            dependentDocs.map(async (doc) => {
              const [buffer, originalFileName] = await Promise.all([
                this.fileProcessorGateway.getFileBuffer(doc.document),
                this.fileProcessorGateway.getOriginalFileName(doc.document),
              ]);

              return GetDeathBenefitDependentDocumentResponseDto.build({
                document: new Base64(buffer.toString('base64')),
                originalFileName,
              });
            }),
          )
        : [];

    return GetDeathBenefitDependentResponseDto.build({
      name: dep.name,
      dependentClass: dep.dependentClass,
      dependentType: dep.dependentType,
      sex: dep.sex,
      birthDate: dep.birthDate,
      hasDisabilityOrInvalidism: dep.hasDisabilityOrInvalidism,
      isMinorUnder16: dep.isMinorUnder16,
      ...(dep.stableUnionOrMarriageStartDate !== null && {
        stableUnionOrMarriageStartDate: dep.stableUnionOrMarriageStartDate,
      }),
      ...(builtDocs.length > 0 && { dependentDocuments: builtDocs }),
    });
  }
}
