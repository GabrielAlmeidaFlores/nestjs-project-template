import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/result/get-rural-or-hybrid-retirement-analysis-with-relations.query.result';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralOrHybridRetirementAnalysisTypeormEntity>
  implements RuralOrHybridRetirementAnalysisQueryRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementAnalysisTypeormEntity)
    repository: Repository<RuralOrHybridRetirementAnalysisTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
    id: RuralOrHybridRetirementAnalysisId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          ruralOrHybridRetirementAnalysisResult: true,
          ruralOrHybridRetirementAnalysisDocument: true,
          ruralOrHybridRetirementAnalysisPeriod: {
            ruralOrHybridRetirementAnalysisPeriodDocument: true,
            ruralOrHybridRetirementAnalysisPeriodMember: {
              ruralOrHybridRetirementAnalysisPeriodMemberDocument: true,
            },
          },
          ruralOrHybridRetirementAnalysisTestimonialWitness: {
            ruralOrHybridRetirementAnalysisTestimonialWitnessDocument: true,
          },
          ruralOrHybridRetirementAnalysisWorkPeriod: {
            ruralOrHybridRetirementAnalysisWorkPeriodDocument: true,
            ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis: true,
            ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory: true,
          },
          ruralOrHybridRetirementAnalysisTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapToQueryResult(data);
  }

  private mapToQueryResult(
    data: RuralOrHybridRetirementAnalysisTypeormEntity,
  ): GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult {
    const periods = data.ruralOrHybridRetirementAnalysisPeriod ?? [];
    const workPeriods = data.ruralOrHybridRetirementAnalysisWorkPeriod ?? [];
    const testimonialWitnesses =
      data.ruralOrHybridRetirementAnalysisTestimonialWitness ?? [];

    const periodDocuments = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementAnalysisPeriodDocument ?? []).map(
        (periodDocument) => ({
          ...periodDocument,
          ruralOrHybridRetirementAnalysisPeriodId: period.id,
        }),
      ),
    );

    const periodMembers = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementAnalysisPeriodMember ?? []).map(
        (periodMember) => ({
          ...periodMember,
          ruralOrHybridRetirementAnalysisPeriodId: period.id,
        }),
      ),
    );

    const periodMemberDocuments = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementAnalysisPeriodMember ?? []).flatMap(
        (periodMember) =>
          (
            periodMember.ruralOrHybridRetirementAnalysisPeriodMemberDocument ??
            []
          ).map((periodMemberDocument) => ({
            ...periodMemberDocument,
            ruralOrHybridRetirementAnalysisPeriodMemberId: periodMember.id,
          })),
      ),
    );

    const testimonialWitnessDocuments = testimonialWitnesses.flatMap(
      (testimonialWitness) =>
        (
          testimonialWitness.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument ??
          []
        ).map((testimonialWitnessDocument) => ({
          ...testimonialWitnessDocument,
          ruralOrHybridRetirementAnalysisTestimonialWitnessId:
            testimonialWitness.id,
        })),
    );

    const workPeriodDocuments = workPeriods.flatMap((workPeriod) =>
      (workPeriod.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? []).map(
        (workPeriodDocument) => ({
          ...workPeriodDocument,
          ruralOrHybridRetirementAnalysisWorkPeriodId: workPeriod.id,
        }),
      ),
    );

    const workPeriodDocumentAnalyses = workPeriods.flatMap((workPeriod) =>
      (
        workPeriod.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis ??
        []
      ).map((workPeriodDocumentAnalysis) => ({
        ...workPeriodDocumentAnalysis,
        ruralOrHybridRetirementAnalysisWorkPeriodId: workPeriod.id,
      })),
    );

    const workPeriodEarningsHistory = workPeriods.flatMap((workPeriod) =>
      (
        workPeriod.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory ??
        []
      ).map((earningsHistory) => ({
        ...earningsHistory,
        ruralOrHybridRetirementAnalysisWorkPeriodId: workPeriod.id,
      })),
    );

    return GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult.build({
      ruralOrHybridRetirementAnalysisId: new RuralOrHybridRetirementAnalysisId(
        data.id,
      ),
      analysisName: data.analysisName,
      activityType: data.activityType,
      requestedBenefit: data.requestedBenefit,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      ruralOrHybridRetirementAnalysisResult:
        data.ruralOrHybridRetirementAnalysisResult ?? null,
      ruralOrHybridRetirementAnalysisDocument:
        data.ruralOrHybridRetirementAnalysisDocument ?? null,
      ruralOrHybridRetirementAnalysisPeriod: periods,
      ruralOrHybridRetirementAnalysisPeriodDocument: periodDocuments,
      ruralOrHybridRetirementAnalysisPeriodMember: periodMembers,
      ruralOrHybridRetirementAnalysisPeriodMemberDocument:
        periodMemberDocuments,
      ruralOrHybridRetirementAnalysisTestimonialWitness: testimonialWitnesses,
      ruralOrHybridRetirementAnalysisTestimonialWitnessDocument:
        testimonialWitnessDocuments,
      ruralOrHybridRetirementAnalysisWorkPeriod: workPeriods,
      ruralOrHybridRetirementAnalysisWorkPeriodDocument: workPeriodDocuments,
      ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis:
        workPeriodDocumentAnalyses,
      ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory:
        workPeriodEarningsHistory,
      ruralOrHybridRetirementAnalysisTimeAccelerator:
        data.ruralOrHybridRetirementAnalysisTimeAccelerator ?? null,
    } as unknown as GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult);
  }
}
