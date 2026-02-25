import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { GetTeacherRetirementPlanningDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/query/result/get-teacher-retirement-planning-document.query.result';
import { GetTeacherRetirementPlanningInssBenefitQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/query/result/get-teacher-retirement-planning-inss-benefit.query.result';
import { GetTeacherRetirementPlanningLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/query/result/get-teacher-retirement-planning-legal-proceeding.query.result';
import { GetTeacherRetirementPlanningPeriodItemDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/query/result/get-teacher-retirement-planning-period-item-document.query.result';
import { GetTeacherRetirementPlanningPeriodItemQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item/query/result/get-teacher-retirement-planning-period-item.query.result';
import { GetTeacherRetirementPlanningPeriodQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/query/result/get-teacher-retirement-planning-period.query.result';
import { GetTeacherRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import { GetTeacherRetirementPlanningResultQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/query/result/get-teacher-retirement-planning-result.query.result';
import { GetTeacherRetirementPlanningQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning.query.result';
import { GetTeacherRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import { TeacherRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';
import { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';
import { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';
import { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';
import { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';
import { TeacherRetirementPlanningResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

@Injectable()
export class TeacherRetirementPlanningTypeormQueryRepository
  extends BaseTypeormQueryRepository<TeacherRetirementPlanningTypeormEntity>
  implements TeacherRetirementPlanningQueryRepositoryGateway
{
  protected readonly _type = TeacherRetirementPlanningTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningTypeormEntity)
    repository: Repository<TeacherRetirementPlanningTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneTeacherRetirementPlanningById(
    id: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningQueryResult | null> {
    const entity = await this.findOne({
      where: { id: id.toString() },
    });

    if (entity === null) {
      return null;
    }

    return GetTeacherRetirementPlanningQueryResult.build({
      id: new TeacherRetirementPlanningId(entity.id),
      federativeEntity: entity.federativeEntity,
      state: entity.state as never,
      municipality: entity.municipality,
      analysisName: entity.analysisName,
      currentPosition: entity.currentPosition,
      activityType: entity.activityType,
      publicServiceStartDate: entity.publicServiceStartDate,
      careerStartDate: entity.careerStartDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  public async findOneTeacherRetirementPlanningByIdWithRelations(
    id: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningWithRelationsQueryResult | null> {
    const entity = await this.findOne({
      where: { id: id.toString() },
      relations: {
        inssBenefits: true,
        legalProceedings: true,
        documents: true,
        periods: {
          items: {
            documents: true,
          },
        },
        remunerations: true,
        result: true,
      },
    });

    if (entity === null) {
      return null;
    }

    return GetTeacherRetirementPlanningWithRelationsQueryResult.build({
      id: new TeacherRetirementPlanningId(entity.id),
      federativeEntity: entity.federativeEntity,
      state: entity.state as never,
      municipality: entity.municipality,
      analysisName: entity.analysisName,
      currentPosition: entity.currentPosition,
      activityType: entity.activityType,
      publicServiceStartDate: entity.publicServiceStartDate,
      careerStartDate: entity.careerStartDate,
      inssBenefits: (entity.inssBenefits ?? []).map((item) =>
        GetTeacherRetirementPlanningInssBenefitQueryResult.build({
          id: new TeacherRetirementPlanningInssBenefitId(item.id),
          inssBenefitNumber: item.inssBenefitNumber,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      legalProceedings: (entity.legalProceedings ?? []).map((item) =>
        GetTeacherRetirementPlanningLegalProceedingQueryResult.build({
          id: new TeacherRetirementPlanningLegalProceedingId(item.id),
          legalProceedingNumber: item.legalProceedingNumber,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      documents: (entity.documents ?? []).map((item) =>
        GetTeacherRetirementPlanningDocumentQueryResult.build({
          id: new TeacherRetirementPlanningDocumentId(item.id),
          document: item.document,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      periods: (entity.periods ?? []).map((period) =>
        GetTeacherRetirementPlanningPeriodQueryResult.build({
          id: new TeacherRetirementPlanningPeriodId(period.id),
          startDate: period.startDate,
          endDate: period.endDate,
          positionName: period.positionName,
          careerName: period.careerName,
          serviceType: period.serviceType,
          department: period.department,
          items: (period.items ?? []).map((item) =>
            GetTeacherRetirementPlanningPeriodItemQueryResult.build({
              id: new TeacherRetirementPlanningPeriodItemId(item.id),
              startDate: item.startDate,
              endDate: item.endDate,
              institutionName: item.institutionName,
              institutionType: item.institutionType,
              educationLevel: item.educationLevel,
              rolePerformed: item.rolePerformed,
              documents: (item.documents ?? []).map((document) =>
                GetTeacherRetirementPlanningPeriodItemDocumentQueryResult.build({
                  id: new TeacherRetirementPlanningPeriodItemDocumentId(
                    document.id,
                  ),
                  document: document.document,
                  createdAt: document.createdAt,
                  updatedAt: document.updatedAt,
                  deletedAt: document.deletedAt,
                }),
              ),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
          ),
          createdAt: period.createdAt,
          updatedAt: period.updatedAt,
          deletedAt: period.deletedAt,
        }),
      ),
      remunerations: (entity.remunerations ?? []).map((item) =>
        GetTeacherRetirementPlanningRemunerationQueryResult.build({
          id: new TeacherRetirementPlanningRemunerationId(item.id),
          contributionDate: item.contributionDate,
          amount: new DecimalValue(item.amount),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      result: entity.result
        ? GetTeacherRetirementPlanningResultQueryResult.build({
            id: new TeacherRetirementPlanningResultId(entity.result.id),
            teacherRetirementPlanningCompleteAnalysis:
              entity.result.teacherRetirementPlanningCompleteAnalysis,
            teacherRetirementPlanningSimplifiedAnalysis:
              entity.result.teacherRetirementPlanningSimplifiedAnalysis,
            teacherRetirementPlanningCompleteAnalysisDownload:
              entity.result.teacherRetirementPlanningCompleteAnalysisDownload,
            createdAt: entity.result.createdAt,
            updatedAt: entity.result.updatedAt,
            deletedAt: entity.result.deletedAt,
          })
        : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
