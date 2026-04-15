import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { GetRuralOrHybridRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/result/get-rural-or-hybrid-retirement-rejection-with-relations.query.result';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<RuralOrHybridRetirementRejectionTypeormEntity>
  implements RuralOrHybridRetirementRejectionQueryRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
    id: RuralOrHybridRetirementRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRuralOrHybridRetirementRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          ruralOrHybridRetirementRejectionResult: true,
          ruralOrHybridRetirementRejectionDocument: true,
          ruralOrHybridRetirementRejectionInssBenefit: true,
          ruralOrHybridRetirementRejectionLegalProceeding: true,
          ruralOrHybridRetirementRejectionPeriod: {
            ruralOrHybridRetirementRejectionPeriodDocument: true,
            ruralOrHybridRetirementRejectionPeriodMember: {
              ruralOrHybridRetirementRejectionPeriodMemberDocument: true,
            },
          },
          ruralOrHybridRetirementRejectionTestimonialWitness: {
            ruralOrHybridRetirementRejectionTestimonialWitnessDocument: true,
          },
          ruralOrHybridRetirementRejectionWorkPeriod: {
            ruralOrHybridRetirementRejectionWorkPeriodDocument: true,
            ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis: true,
            ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory: true,
          },
          ruralOrHybridRetirementRejectionTimeAccelerator: true,
        },
      },
      err,
    );

    return this.mapToQueryResult(data);
  }

  private mapToQueryResult(
    data: RuralOrHybridRetirementRejectionTypeormEntity,
  ): GetRuralOrHybridRetirementRejectionWithRelationsQueryResult {
    const periods = data.ruralOrHybridRetirementRejectionPeriod ?? [];
    const workPeriods = data.ruralOrHybridRetirementRejectionWorkPeriod ?? [];
    const testimonialWitnesses =
      data.ruralOrHybridRetirementRejectionTestimonialWitness ?? [];

    const periodDocuments = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementRejectionPeriodDocument ?? []).map(
        (periodDocument) => ({
          ...periodDocument,
          ruralOrHybridRetirementRejectionPeriodId: period.id,
        }),
      ),
    );

    const periodMembers = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementRejectionPeriodMember ?? []).map(
        (periodMember) => ({
          ...periodMember,
          ruralOrHybridRetirementRejectionPeriodId: period.id,
        }),
      ),
    );

    const periodMemberDocuments = periods.flatMap((period) =>
      (period.ruralOrHybridRetirementRejectionPeriodMember ?? []).flatMap(
        (periodMember) =>
          (
            periodMember.ruralOrHybridRetirementRejectionPeriodMemberDocument ??
            []
          ).map((periodMemberDocument) => ({
            ...periodMemberDocument,
            ruralOrHybridRetirementRejectionPeriodMemberId: periodMember.id,
          })),
      ),
    );

    const testimonialWitnessDocuments = testimonialWitnesses.flatMap(
      (testimonialWitness) =>
        (
          testimonialWitness.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
          []
        ).map((testimonialWitnessDocument) => ({
          ...testimonialWitnessDocument,
          ruralOrHybridRetirementRejectionTestimonialWitnessId:
            testimonialWitness.id,
        })),
    );

    const workPeriodDocuments = workPeriods.flatMap((workPeriod) =>
      (workPeriod.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? []).map(
        (workPeriodDocument) => ({
          ...workPeriodDocument,
          ruralOrHybridRetirementRejectionWorkPeriodId: workPeriod.id,
        }),
      ),
    );

    const workPeriodDocumentAnalyses = workPeriods.flatMap((workPeriod) =>
      (
        workPeriod.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
        []
      ).map((workPeriodDocumentAnalysis) => ({
        ...workPeriodDocumentAnalysis,
        ruralOrHybridRetirementRejectionWorkPeriodId: workPeriod.id,
      })),
    );

    const workPeriodEarningsHistory = workPeriods.flatMap((workPeriod) =>
      (
        workPeriod.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory ??
        []
      ).map((earningsHistory) => ({
        ...earningsHistory,
        ruralOrHybridRetirementRejectionWorkPeriodId: workPeriod.id,
      })),
    );

    return GetRuralOrHybridRetirementRejectionWithRelationsQueryResult.build({
      ruralOrHybridRetirementRejectionId:
        new RuralOrHybridRetirementRejectionId(data.id),
      analysisName: data.analysisName,
      activityType: data.activityType,
      applicationSubmissionDate: data.applicationSubmissionDate,
      requestedBenefit: data.requestedBenefit,
      dateOfRejection: data.dateOfRejection,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      ruralOrHybridRetirementRejectionResult:
        data.ruralOrHybridRetirementRejectionResult ?? null,
      ruralOrHybridRetirementRejectionDocument:
        data.ruralOrHybridRetirementRejectionDocument ?? null,
      ruralOrHybridRetirementRejectionInssBenefit:
        data.ruralOrHybridRetirementRejectionInssBenefit ?? null,
      ruralOrHybridRetirementRejectionLegalProceeding:
        data.ruralOrHybridRetirementRejectionLegalProceeding ?? null,
      ruralOrHybridRetirementRejectionPeriod: periods,
      ruralOrHybridRetirementRejectionPeriodDocument: periodDocuments,
      ruralOrHybridRetirementRejectionPeriodMember: periodMembers,
      ruralOrHybridRetirementRejectionPeriodMemberDocument:
        periodMemberDocuments,
      ruralOrHybridRetirementRejectionTestimonialWitness: testimonialWitnesses,
      ruralOrHybridRetirementRejectionTestimonialWitnessDocument:
        testimonialWitnessDocuments,
      ruralOrHybridRetirementRejectionWorkPeriod: workPeriods,
      ruralOrHybridRetirementRejectionWorkPeriodDocument: workPeriodDocuments,
      ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis:
        workPeriodDocumentAnalyses,
      ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory:
        workPeriodEarningsHistory,
      ruralOrHybridRetirementRejectionTimeAccelerator:
        data.ruralOrHybridRetirementRejectionTimeAccelerator ?? null,
    } as unknown as GetRuralOrHybridRetirementRejectionWithRelationsQueryResult);
  }
}
