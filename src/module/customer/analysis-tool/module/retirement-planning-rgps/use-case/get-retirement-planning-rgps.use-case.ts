import { Inject, Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { GetRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-period.response.dto';
import {
  GetRetirementPlanningRgpsInssBenefitResponseDto,
  GetRetirementPlanningRgpsLegalProceedingResponseDto,
  GetRetirementPlanningRgpsResponse,
  GetRetirementPlanningRgpsResultResponseDto,
} from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';

@Injectable()
export class GetRetirementPlanningRgpsUseCase {
  protected readonly _type = GetRetirementPlanningRgpsUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsResponse> {
    const result =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    return GetRetirementPlanningRgpsResponse.build({
      id: result.id,
      cnisDocument: result.cnisDocument ?? null,
      retirementPlanningRgpsBenefit:
        result.retirementPlanningRgpsBenefit?.map((b) =>
          GetRetirementPlanningRgpsInssBenefitResponseDto.build({
            id: b.id,
            inssBenefitNumber: b.inssBenefitNumber,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
          }),
        ) ?? null,
      retirementPlanningRgpsResult:
        result.retirementPlanningRgpsResult &&
        GetRetirementPlanningRgpsResultResponseDto.build({
          clientName: result.retirementPlanningRgpsResult.clientName ?? null,
          clientFederalDocument:
            result.retirementPlanningRgpsResult.clientFederalDocument ?? null,
          clientBirthDate:
            result.retirementPlanningRgpsResult.clientBirthDate ?? null,
          clientLastAffiliationDate:
            result.retirementPlanningRgpsResult.clientLastAffiliationDate ??
            null,
          compareCnisCtps:
            result.retirementPlanningRgpsResult.compareCnisCtps ?? null,
          compareCnisCtpsRaw:
            result.retirementPlanningRgpsResult.compareCnisCtpsRaw ?? null,
        }),
      retirementPlanningRgpsLegalProceeding:
        result.retirementPlanningRgpsLegalProceeding?.map((p) =>
          GetRetirementPlanningRgpsLegalProceedingResponseDto.build({
            id: p.id,
            legalProceedingNumber: p.legalProceedingNumber,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }),
        ) ?? null,
      retirementPlanningRgpsPeriod:
        result.retirementPlanningRgpsPeriod?.map((p) =>
          GetRetirementPlanningRgpsPeriodResponseDto.build({
            id: p.id,
            periodName: p.periodName ?? null,
            periodStart: p.periodStart ?? null,
            periodEnd: p.periodEnd ?? null,
            category: p.category ?? null,
            isPendency: p.isPendency ?? null,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum ?? null,
            contributionAverage: p.contributionAverage ?? null,
            typeOfContribution: p.typeOfContribution ?? null,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }),
        ) ?? null,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt ?? null,
    } as unknown as GetRetirementPlanningRgpsResponse);
  }
}
