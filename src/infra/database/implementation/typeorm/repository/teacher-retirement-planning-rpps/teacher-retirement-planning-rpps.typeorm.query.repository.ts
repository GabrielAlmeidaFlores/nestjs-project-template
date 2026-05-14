import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { GetTeacherRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import { GetTeacherRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning.query.result';
import { TeacherRetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning/query/teacher-retirement-planning.query.repository.gateway';
import { GetTeacherRetirementPlanningRppsDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-document/query/result/get-teacher-retirement-planning-document.query.result';
import { GetTeacherRetirementPlanningRppsInssBenefitQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-inss-benefit/query/result/get-teacher-retirement-planning-inss-benefit.query.result';
import { GetTeacherRetirementPlanningRppsLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-legal-proceeding/query/result/get-teacher-retirement-planning-legal-proceeding.query.result';
import { GetTeacherRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period/query/result/get-teacher-retirement-planning-period.query.result';
import { GetTeacherRetirementPlanningRppsPeriodItemQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item/query/result/get-teacher-retirement-planning-period-item.query.result';
import { GetTeacherRetirementPlanningRppsPeriodItemDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item-document/query/result/get-teacher-retirement-planning-period-item-document.query.result';
import { GetTeacherRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import { GetTeacherRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/query/result/get-teacher-retirement-planning-result.query.result';
import { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';
import { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';
import { TeacherRetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';
import { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';
import { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';
import { TeacherRetirementPlanningRppsPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import { TeacherRetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';
import { TeacherRetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRppsTypeormQueryRepository
  extends BaseTypeormQueryRepository<TeacherRetirementPlanningTypeormEntity>
  implements TeacherRetirementPlanningRppsQueryRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRppsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningTypeormEntity)
    repository: Repository<TeacherRetirementPlanningTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneTeacherRetirementPlanningById(
    id: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsQueryResult | null> {
    const entity = await this.findOne({
      where: { id: id.toString() },
    });

    if (entity === null) {
      return null;
    }

    return GetTeacherRetirementPlanningRppsQueryResult.build({
      id: new TeacherRetirementPlanningRppsId(entity.id),
      federativeEntity:
        entity.federativeEntity as unknown as TeacherRetirementPlanningRppsFederativeEntityEnum,
      state: entity.state as never,
      municipality: entity.municipality,
      analysisName: entity.analysisName,
      currentPosition: entity.currentPosition,
      activityType:
        entity.activityType as unknown as TeacherRetirementPlanningRppsActivityTypeEnum,
      publicServiceStartDate: entity.publicServiceStartDate,
      careerStartDate: entity.careerStartDate,
      administrativeProcessAnalysis: entity.administrativeProcessAnalysis,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  public async findOneTeacherRetirementPlanningByIdWithRelations(
    id: TeacherRetirementPlanningRppsId,
  ): Promise<GetTeacherRetirementPlanningRppsWithRelationsQueryResult | null> {
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
        teacherRetirementPlanningResult: true,
      },
    });

    if (entity === null) {
      return null;
    }

    return GetTeacherRetirementPlanningRppsWithRelationsQueryResult.build({
      id: new TeacherRetirementPlanningRppsId(entity.id),
      federativeEntity:
        entity.federativeEntity as unknown as TeacherRetirementPlanningRppsFederativeEntityEnum,
      state: entity.state as never,
      municipality: entity.municipality,
      analysisName: entity.analysisName,
      currentPosition: entity.currentPosition,
      activityType:
        entity.activityType as unknown as TeacherRetirementPlanningRppsActivityTypeEnum,
      publicServiceStartDate: entity.publicServiceStartDate,
      careerStartDate: entity.careerStartDate,
      administrativeProcessAnalysis: entity.administrativeProcessAnalysis,
      inssBenefits: (entity.inssBenefits ?? []).map((item) =>
        GetTeacherRetirementPlanningRppsInssBenefitQueryResult.build({
          id: new TeacherRetirementPlanningRppsInssBenefitId(item.id),
          inssBenefitNumber: item.inssBenefitNumber,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      legalProceedings: (entity.legalProceedings ?? []).map((item) =>
        GetTeacherRetirementPlanningRppsLegalProceedingQueryResult.build({
          id: new TeacherRetirementPlanningRppsLegalProceedingId(item.id),
          legalProceedingNumber: item.legalProceedingNumber,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      documents: (entity.documents ?? []).map((item) =>
        GetTeacherRetirementPlanningRppsDocumentQueryResult.build({
          id: new TeacherRetirementPlanningRppsDocumentId(item.id),
          document: item.document,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      periods: (entity.periods ?? []).map((period) =>
        GetTeacherRetirementPlanningRppsPeriodQueryResult.build({
          id: new TeacherRetirementPlanningRppsPeriodId(period.id),
          startDate: period.startDate,
          endDate: period.endDate,
          positionName: period.positionName,
          careerName: period.careerName,
          serviceType:
            period.serviceType as unknown as TeacherRetirementPlanningRppsPeriodServiceTypeEnum,
          department: period.department,
          items: (period.items ?? []).map((item) =>
            GetTeacherRetirementPlanningRppsPeriodItemQueryResult.build({
              id: new TeacherRetirementPlanningRppsPeriodItemId(item.id),
              startDate: item.startDate,
              endDate: item.endDate,
              institutionName: item.institutionName,
              institutionType:
                item.institutionType as unknown as TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum,
              educationLevel:
                item.educationLevel as unknown as TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum,
              rolePerformed:
                item.rolePerformed as unknown as TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum,
              documents: (item.documents ?? []).map((document) =>
                GetTeacherRetirementPlanningRppsPeriodItemDocumentQueryResult.build(
                  {
                    id: new TeacherRetirementPlanningRppsPeriodItemDocumentId(
                      document.id,
                    ),
                    document: document.document,
                    createdAt: document.createdAt,
                    updatedAt: document.updatedAt,
                    deletedAt: document.deletedAt,
                  },
                ),
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
        GetTeacherRetirementPlanningRppsRemunerationQueryResult.build({
          id: new TeacherRetirementPlanningRppsRemunerationId(item.id),
          contributionDate: item.contributionDate,
          amount: new DecimalValue(item.amount),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
      result: entity.teacherRetirementPlanningResult
        ? GetTeacherRetirementPlanningRppsResultQueryResult.build({
            id: new TeacherRetirementPlanningRppsResultId(
              entity.teacherRetirementPlanningResult.id,
            ),
            teacherRetirementPlanningCompleteAnalysis:
              entity.teacherRetirementPlanningResult
                .teacherRetirementPlanningCompleteAnalysis,
            teacherRetirementPlanningSimplifiedAnalysis:
              entity.teacherRetirementPlanningResult
                .teacherRetirementPlanningSimplifiedAnalysis,
            teacherRetirementPlanningCompleteAnalysisDownload:
              entity.teacherRetirementPlanningResult
                .teacherRetirementPlanningCompleteAnalysisDownload,
            createdAt: entity.teacherRetirementPlanningResult.createdAt,
            updatedAt: entity.teacherRetirementPlanningResult.updatedAt,
            deletedAt: entity.teacherRetirementPlanningResult.deletedAt,
          })
        : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
