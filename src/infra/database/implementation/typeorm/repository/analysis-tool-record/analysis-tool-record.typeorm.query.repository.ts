import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import {
  Between,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  IsNull,
  Like,
  Not,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import { GetAnalysisToolRecordStatisticsMonthlyQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics-monthly.query.result';
import {
  AnalysisToolRecordStatisticsQueryResult,
  MonthlyStatisticsQueryResult,
} from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/analysis-tool-record-statistics.query.result';
import { GetAnalysisToolRecordWithFullRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-full-relations.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AnalysisToolRecordTypeormQueryRepository
  extends BaseTypeormQueryRepository<AnalysisToolRecordTypeormEntity>
  implements AnalysisToolRecordQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolRecordTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolRecordTypeormEntity)
    repository: Repository<AnalysisToolRecordTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  > {
    const relationsClause = this.getRelationsClauseOperation();

    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: [],
      relations: relationsClause,
    };

    const baseWhere: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const atLeastOneRelationNotNull: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      [
        { cnisFastAnalysis: Not(IsNull()) },
        { retirementPlanningRgps: Not(IsNull()) },
        { retirementPlanningRpps: Not(IsNull()) },
        { teacherRetirementPlanning: Not(IsNull()) },
        { disabilityAssessmentForBpcAnalysis: Not(IsNull()) },
        { administrativeProcedureInssAnalysis: Not(IsNull()) },
        { judicialCaseAnalysis: Not(IsNull()) },
        { medicalAndSocialReportObjectionGeneratorAnalysis: Not(IsNull()) },
        { speechGenerator: Not(IsNull()) },
        { medicalQuestionGenerator: Not(IsNull()) },
        { perCapitaIncomeForBpcAnalysis: Not(IsNull()) },
        { specialActivity: Not(IsNull()) },
        { specialRetirementGrant: Not(IsNull()) },
        { specialCategoryRetirementAnalysis: Not(IsNull()) },
        { insuranceQualityAnalysis: Not(IsNull()) },
        { ruralTimeline: Not(IsNull()) },
        { ruralOrHybridRetirementRejection: Not(IsNull()) },
        { audienceQuestionGenerator: Not(IsNull()) },
        { disabilityRetirementPlanning: Not(IsNull()) },
        { disabilityRetirementPlanningGrant: Not(IsNull()) },
        { generalUrbanRetirementGrant: Not(IsNull()) },
        { generalUrbanRetirementAnalysis: Not(IsNull()) },
        { temporaryDisabilityBenefitsGrant: Not(IsNull()) },
        { accidentBenefitRejection: Not(IsNull()) },
        { deathBenefitGrant: Not(IsNull()) },
        { deathBenefitRejection: Not(IsNull()) },
        { survivorPensionAnalysis: Not(IsNull()) },
        { generalUrbanRetirementDenial: Not(IsNull()) },
        { disabilityRetirementPlanningRejection: Not(IsNull()) },
        { bpcElderlyAnalysis: Not(IsNull()) },
        { temporaryIncapacityBenefitRejection: Not(IsNull()) },
        { maternityPayGrant: Not(IsNull()) },
      ];

    const withUpdatedBy = {
      ...baseWhere,
      updatedBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const whereType =
      typeof listData.type === 'string' ? { type: listData.type } : {};

    const hasSearchBy = typeof listData.searchBy === 'string';
    const hasClientId =
      listData.analysisToolClientId instanceof AnalysisToolClientId;

    if (hasSearchBy && hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasSearchBy) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
        },
      ];
    } else {
      searchParams.where = [
        {
          ...whereType,
          ...withUpdatedBy,
        },
      ];
    }

    searchParams.where = searchParams.where.flatMap((cond) =>
      atLeastOneRelationNotNull.map((rel) => ({ ...cond, ...rel })),
    );

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async countByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
    });

    return total;
  }

  public async findMaxCodeByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const whereClause = {
      createdBy: {
        organization: { id: organizationId.toString() },
        customer: { authIdentity: { id: authIdentityId.toString() } },
      },
    };

    const [record, count] = await Promise.all([
      this.repository.findOne({
        where: whereClause,
        withDeleted: true,
        order: { createdAt: 'DESC' },
      }),
      this.repository.count({
        where: whereClause,
        withDeleted: true,
      }),
    ]);

    const codeFromRecord =
      record !== null ? new AnalysisToolRecordCode(record.code).toNumber() : 0;

    return Math.max(codeFromRecord, count);
  }

  public async findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.find({
      where: {
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
      relations: relationsClause,
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: relationsClause,
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async countByOrganizationIdAndAnalysisToolClientIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
      },
    });

    return total;
  }

  public async findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    cnisFastAnalysisId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          cnisFastAnalysis: {
            id: cnisFastAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          cnisFastAnalysis: {
            cnisFastAnalysisResult: true,
            cnisFastAnalysisInssBenefit: true,
            cnisFastAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByInsuranceQualityAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    insuranceQualityAnalysisId: InsuranceQualityAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          insuranceQualityAnalysis: {
            id: insuranceQualityAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          insuranceQualityAnalysis: {
            insuranceQualityAnalysisResult: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRppsId: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          retirementPlanningRpps: {
            id: retirementPlanningRppsId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          retirementPlanningRpps: {
            retirementPlanningRppsInssBenefit: true,
            retirementPlanningRppsLegalProceeding: true,
            retirementPlanningRppsResult: true,
            documents: true,
            remunerations: true,
            periods: {
              specialTimePeriod: {
                specialTimeDocuments: true,
              },
              disabilityPeriod: {
                cid: true,
                disabilityDocuments: true,
              },
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          retirementPlanningRgps: {
            id: retirementPlanningRgpsId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
            updatedBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
          },
          cnisFastAnalysis: {
            cnisFastAnalysisResult: true,
            cnisFastAnalysisInssBenefit: true,
            cnisFastAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          updatedBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          retirementPlanningRgps: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByGeneralUrbanRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          generalUrbanRetirementGrant: {
            id: generalUrbanRetirementGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
            updatedBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
          },
          createdBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          updatedBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          generalUrbanRetirementGrant: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          generalUrbanRetirementAnalysis: {
            id: generalUrbanRetirementAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          generalUrbanRetirementAnalysis: {
            generalUrbanRetirementAnalysisResult: true,
            remunerations: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsBySpecialActivityIdAndOrganizationIdAndAuthIdentityIdOrFail(
    specialActivityId: SpecialActivityId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          specialActivity: {
            id: specialActivityId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
            updatedBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
          },
          specialActivity: {
            specialActivityResult: true,
            specialActivityDocuments: true,
            specialActivityInssBenefit: true,
            specialActivityLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          updatedBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    specialRetirementGrantId: SpecialRetirementGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          specialRetirementGrant: {
            id: specialRetirementGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
            updatedBy: {
              customer: true,
              organization: {
                organizationMember: true,
              },
            },
          },
          specialRetirementGrant: {
            specialRetirementGrantBenefit: true,
            specialRetirementGrantLegalProceeding: true,
            specialRetirementGrantDocument: true,
            specialRetirementGrantResult: true,
          },
          createdBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
          updatedBy: {
            customer: true,
            organization: {
              organizationMember: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByAdministrativeProcedureInssAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    administrativeProcedureInssAnalysisId: AdministrativeProcedureInssAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          administrativeProcedureInssAnalysis: {
            id: administrativeProcedureInssAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          administrativeProcedureInssAnalysis: {
            administrativeProcedureInssAnalysisResult: true,
            administrativeProcedureInssAnalysisBenefit: true,
            administrativeProcedureInssAnalysisLegalProceeding: true,
            administrativeProcedureInssAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          medicalAndSocialReportObjectionGeneratorAnalysis: {
            id: medicalAndSocialReportObjectionGeneratorAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          medicalAndSocialReportObjectionGeneratorAnalysis: {
            msReportObjectionAnalysisResult: true,
            medicalAndSocialReportObjectionGeneratorAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    speechGeneratorId: SpeechGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          speechGenerator: {
            id: speechGeneratorId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          speechGenerator: {
            speechGeneratorDocument: true,
            speechGeneratorResult: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          judicialCaseAnalysis: {
            id: judicialCaseAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          judicialCaseAnalysis: {
            judicialCaseAnalysisResult: true,
            judicialCaseAnalysisBenefit: true,
            judicialCaseAnalysisLegalProceeding: true,
            judicialCaseAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          audienceQuestionGenerator: {
            id: audienceQuestionGeneratorId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          audienceQuestionGenerator: {
            audienceQuestionGeneratorResult: true,
            audienceQuestionGeneratorDocument: true,
            audienceQuestionGeneratorBenefit: true,
            audienceQuestionGeneratorLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByMedicalQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
    medicalQuestionGeneratorId: MedicalQuestionGeneratorId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          medicalQuestionGenerator: {
            id: medicalQuestionGeneratorId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientLegalProceeding: true,
            analysisToolClientInssBenefit: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          medicalQuestionGenerator: {
            medicalQuestionGeneratorResult: true,
            medicalQuestionGeneratorInssBenefit: true,
            medicalQuestionGeneratorLegalProceeding: true,
            medicalQuestionGeneratorDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          disabilityAssessmentForBpcAnalysis: {
            id: disabilityAssessmentForBpcAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          disabilityAssessmentForBpcAnalysis: {
            disabilityAssessmentForBpcAnalysisResult: true,
            disabilityAssessmentForBpcAnalysisBenefit: true,
            disabilityAssessmentForBpcAnalysisLegalProceeding: true,
            disabilityAssessmentForBpcAnalysisDocument: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          ruralTimeline: {
            id: ruralTimelineAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          ruralTimeline: {
            ruralTimelineAnalysisInssBenefit: true,
            ruralTimelineAnalysisLegalProceeding: true,
            ruralTimelinePeriod: true,
            ruralTimelineDocument: true,
            ruralTimelineCnisContributionPeriod: {
              ruralTimelineCnisContributionPeriodPendingExitDate: true,
              ruralTimelineCnisContributionPeriodUnderMinimum: true,
              ruralTimelineCnisContributionPeriodOverdueContribution: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          ruralOrHybridRetirementRejection: {
            id: ruralOrHybridRetirementRejectionId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          ruralOrHybridRetirementRejection: {
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
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRuralOrHybridRetirementRejectionIdOrFail(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          ruralOrHybridRetirementRejection: {
            id: ruralOrHybridRetirementRejectionId.toString(),
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          perCapitaIncomeForBpcAnalysis: {
            id: perCapitaIncomeForBpcAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          perCapitaIncomeForBpcAnalysis: {
            perCapitaIncomeForBpcAnalysisResult: true,
            perCapitaIncomeForBpcAnalysisDocument: true,
            perCapitaIncomeForBpcAnalysisFamilyMember: {
              perCapitaIncomeForBpcAnalysisFamilyMemberDocument: true,
            },
            perCapitaIncomeForBpcAnalysisBenefit: true,
            perCapitaIncomeForBpcAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByBpcElderlyAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          bpcElderlyAnalysis: {
            id: bpcElderlyAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          bpcElderlyAnalysis: {
            bpcElderlyAnalysisResult: true,
            bpcElderlyAnalysisDocument: true,
            bpcElderlyAnalysisFamilyMember: {
              bpcElderlyAnalysisFamilyMemberDocument: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async getStatisticsByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    startDate: Date,
    endDate: Date,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<AnalysisToolRecordStatisticsQueryResult> {
    const startDateNormalized = new Date(startDate);
    startDateNormalized.setHours(0, 0, 0, 0);

    const endDateNormalized = new Date(endDate);
    const HOURS_IN_DAY = 23;
    const MINUTES_IN_HOUR = 59;
    const SECONDS_IN_MINUTE = 59;
    const MILLISECONDS_IN_SECOND = 999;
    endDateNormalized.setHours(
      HOURS_IN_DAY,
      MINUTES_IN_HOUR,
      SECONDS_IN_MINUTE,
      MILLISECONDS_IN_SECOND,
    );

    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdBy: {
        customer: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
        organization: {
          id: organizationId.toString(),
        },
      },
    };

    if (typeof type !== 'undefined') {
      whereClause.type = type;
    }

    const records = await this.find({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
      },
    });

    const filteredRecords = records.filter(
      (record) =>
        record.createdAt >= startDateNormalized &&
        record.createdAt <= endDateNormalized,
    );

    const monthlyStats = new Map<string, number>();
    let totalCount = 0;

    for (const record of filteredRecords) {
      const date = new Date(record.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const currentCount = monthlyStats.get(monthKey) ?? 0;
      monthlyStats.set(monthKey, currentCount + 1);
      totalCount++;
    }

    const allMonths = new Set<string>();
    const currentDate = new Date(startDateNormalized);
    while (currentDate <= endDateNormalized) {
      const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      allMonths.add(monthKey);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    for (const monthKey of allMonths) {
      if (!monthlyStats.has(monthKey)) {
        monthlyStats.set(monthKey, 0);
      }
    }

    const monthlyStatistics = Array.from(monthlyStats.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([monthKey, count]) => {
        const [yearStr = '0', monthStr = '00'] = monthKey.split('-');
        return MonthlyStatisticsQueryResult.build({
          year: parseInt(yearStr, 10),
          month: monthStr,
          count,
        });
      });

    return AnalysisToolRecordStatisticsQueryResult.build({
      totalCount,
      monthlyStatistics,
    });
  }

  public async countAllAnalysesForYear(
    year: number,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<number> {
    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startDate = new Date(year, JANUARY, 1);
    const endDate = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdAt: Between(startDate, endDate),
    };

    if (type !== undefined) {
      whereClause.type = type;
    }

    const count = await this.repository.count({
      where: whereClause,
    });

    return count;
  }

  public async countAllMonthlyAnalysesForYear(
    year: number,
    type?: AnalysisToolRecordTypeEnum,
  ): Promise<Array<GetAnalysisToolRecordStatisticsMonthlyQueryResult>> {
    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startDate = new Date(year, JANUARY, 1);
    const endDate = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdAt: Between(startDate, endDate),
    };

    if (type !== undefined) {
      whereClause.type = type;
    }

    const analyses = await this.repository.find({
      where: whereClause,
      select: {
        createdAt: true,
      },
    });

    const analysesByMonth = new Map<number, number>();

    for (const analysis of analyses) {
      const month = analysis.createdAt.getMonth();
      const currentCount = analysesByMonth.get(month) ?? 0;
      analysesByMonth.set(month, currentCount + 1);
    }

    return Array.from(analysesByMonth.entries())
      .sort(([monthA], [monthB]) => monthA - monthB)
      .map(([month, totalCount]) =>
        GetAnalysisToolRecordStatisticsMonthlyQueryResult.build({
          month,
          totalCount,
        }),
      );
  }

  public async listAllAnalysesForYear(
    year: number,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  > {
    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startDate = new Date(year, JANUARY, 1);
    const endDate = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const relationsClause = this.getRelationsClauseOperation();

    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: [],
      relations: relationsClause,
    };

    const baseWhere: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdAt: Between(startDate, endDate),
    };

    const atLeastOneRelationNotNull: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      [
        { cnisFastAnalysis: Not(IsNull()) },
        { retirementPlanningRgps: Not(IsNull()) },
        { retirementPlanningRpps: Not(IsNull()) },
        { teacherRetirementPlanning: Not(IsNull()) },
        { disabilityAssessmentForBpcAnalysis: Not(IsNull()) },
        { administrativeProcedureInssAnalysis: Not(IsNull()) },
        { judicialCaseAnalysis: Not(IsNull()) },
        { medicalAndSocialReportObjectionGeneratorAnalysis: Not(IsNull()) },
        { speechGenerator: Not(IsNull()) },
        { medicalQuestionGenerator: Not(IsNull()) },
        { perCapitaIncomeForBpcAnalysis: Not(IsNull()) },
        { specialActivity: Not(IsNull()) },
        { specialCategoryRetirementAnalysis: Not(IsNull()) },
        { insuranceQualityAnalysis: Not(IsNull()) },
        { ruralTimeline: Not(IsNull()) },
        { ruralOrHybridRetirementRejection: Not(IsNull()) },
        { audienceQuestionGenerator: Not(IsNull()) },
        { disabilityRetirementPlanning: Not(IsNull()) },
        { disabilityRetirementPlanningGrant: Not(IsNull()) },
        { generalUrbanRetirementGrant: Not(IsNull()) },
        { generalUrbanRetirementAnalysis: Not(IsNull()) },
        { temporaryDisabilityBenefitsGrant: Not(IsNull()) },
        { deathBenefitGrant: Not(IsNull()) },
        { deathBenefitRejection: Not(IsNull()) },
        { survivorPensionAnalysis: Not(IsNull()) },
        { generalUrbanRetirementDenial: Not(IsNull()) },
        { disabilityRetirementPlanningRejection: Not(IsNull()) },
        { bpcElderlyAnalysis: Not(IsNull()) },
        { temporaryIncapacityBenefitRejection: Not(IsNull()) },
        { maternityPayGrant: Not(IsNull()) },
      ];

    for (const relationalClause of atLeastOneRelationNotNull) {
      (
        searchParams.where as FindOptionsWhere<AnalysisToolRecordTypeormEntity>[]
      ).push({
        ...baseWhere,
        ...relationalClause,
      });
    }

    if (listData.searchBy !== null) {
      searchParams.where = (
        searchParams.where as FindOptionsWhere<AnalysisToolRecordTypeormEntity>[]
      ).map((where) => ({
        ...where,
        code: Like(`${listData.searchBy}`),
      }));
    }

    if (listData.type !== null) {
      searchParams.where = (
        searchParams.where as FindOptionsWhere<AnalysisToolRecordTypeormEntity>[]
      ).map((where) => ({
        ...where,
        type: listData.type as AnalysisToolRecordTypeEnum,
      }));
    }

    const skip = (listData.page - 1) * listData.limit;

    const [items, total] = await this.repository.findAndCount({
      ...searchParams,
      skip,
      take: listData.limit,
      order: {
        code: 'DESC',
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      items,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return new ListDataOutputModel({
      resource: mappedData,
      totalItems: total,
      page: listData.page,
      limit: listData.limit,
    });
  }

  public async listAllAnalysesForYearWithFullRelations(
    year: number,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithFullRelationsQueryResult>
  > {
    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startDate = new Date(year, JANUARY, 1);
    const endDate = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: {
        createdBy: {
          customer: {
            authIdentity: true,
          },
          organization: true,
        },
        updatedBy: {
          customer: {
            authIdentity: true,
          },
          organization: true,
        },
        analysisToolClient: {
          createdBy: {
            customer: {
              authIdentity: true,
            },
            organization: true,
          },
          updatedBy: {
            customer: {
              authIdentity: true,
            },
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
      },
    };

    if (listData.searchBy !== null) {
      (
        searchParams.where as FindOptionsWhere<AnalysisToolRecordTypeormEntity>
      ).code = Like(`${listData.searchBy}`);
    }

    if (listData.type !== null) {
      (
        searchParams.where as FindOptionsWhere<AnalysisToolRecordTypeormEntity>
      ).type = listData.type;
    }

    const skip = (listData.page - 1) * listData.limit;

    const [items, total] = await this.repository.findAndCount({
      ...searchParams,
      skip,
      take: listData.limit,
      order: {
        createdAt: 'DESC',
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      items,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithFullRelationsQueryResult,
    );

    return new ListDataOutputModel({
      resource: mappedData,
      totalItems: total,
      page: listData.page,
      limit: listData.limit,
    });
  }

  public async findWithRelationsByDisabilityRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          disabilityRetirementPlanning: {
            id: disabilityRetirementPlanningId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          disabilityRetirementPlanning: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          disabilityRetirementPlanningGrant: {
            id: disabilityRetirementPlanningGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          disabilityRetirementPlanningGrant: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDeathBenefitGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    deathBenefitGrantId: DeathBenefitGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          deathBenefitGrant: {
            id: deathBenefitGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          deathBenefitGrant: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    deathBenefitRejectionId: DeathBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          deathBenefitRejection: {
            id: deathBenefitRejectionId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          deathBenefitRejection: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          temporaryDisabilityBenefitsGrant: {
            id: temporaryDisabilityBenefitsGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          temporaryDisabilityBenefitsGrant: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByTemporaryDisabilityBenefitsGrantIdAndOrganizationIdAndAuthIdentityId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: {
        temporaryDisabilityBenefitsGrant: {
          id: temporaryDisabilityBenefitsGrantId.toString(),
        },
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
      relations: {
        analysisToolClient: {
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
        temporaryDisabilityBenefitsGrant: true,
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
      },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );
  }

  public async findWithRelationsByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          teacherRetirementPlanning: {
            id: teacherRetirementPlanningId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          teacherRetirementPlanning: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          survivorPensionAnalysis: {
            id: survivorPensionAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          survivorPensionAnalysis: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByGeneralUrbanRetirementDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          generalUrbanRetirementDenial: {
            id: generalUrbanRetirementDenialId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          accidentBenefitRejection: {
            id: accidentBenefitRejectionId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByMaternityPayGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
    maternityPayGrantId: MaternityPayGrantId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          maternityPayGrant: {
            id: maternityPayGrantId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          maternityPayGrant: true,
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByDisabilityRetirementPlanningRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          disabilityRetirementPlanningRejection: {
            id: disabilityRetirementPlanningRejectionId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByTemporaryIncapacityBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          temporaryIncapacityBenefitRejection: {
            id: temporaryIncapacityBenefitRejectionId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
              organization: true,
            },
            updatedBy: {
              customer: true,
              organization: true,
            },
          },
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  private getRelationsClauseOperation(): FindOptionsRelations<AnalysisToolRecordTypeormEntity> {
    const relationsClause: FindOptionsRelations<AnalysisToolRecordTypeormEntity> =
      {
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
        speechGenerator: true,
        ruralTimeline: {
          ruralTimelineAnalysisInssBenefit: true,
          ruralTimelineAnalysisLegalProceeding: true,
        },
      };

    for (const key of this.getEntityRelationsKey()) {
      relationsClause[key] = true as never;
    }

    return relationsClause;
  }

  private getEntityRelationsKey(): (keyof AnalysisToolRecordTypeormEntity)[] {
    return [
      'cnisFastAnalysis',
      'retirementPlanningRpps',
      'retirementPlanningRgps',
      'teacherRetirementPlanning',
      'specialActivity',
      'specialRetirementGrant',
      'specialCategoryRetirementAnalysis',
      'administrativeProcedureInssAnalysis',
      'judicialCaseAnalysis',
      'generalUrbanRetirementGrant',
      'generalUrbanRetirementAnalysis',
      'medicalAndSocialReportObjectionGeneratorAnalysis',
      'medicalQuestionGenerator',
      'disabilityAssessmentForBpcAnalysis',
      'perCapitaIncomeForBpcAnalysis',
      'insuranceQualityAnalysis',
      'ruralOrHybridRetirementRejection',
      'audienceQuestionGenerator',
      'disabilityRetirementPlanning',
      'disabilityRetirementPlanningGrant',
      'deathBenefitGrant',
      'deathBenefitRejection',
      'temporaryDisabilityBenefitsGrant',
      'survivorPensionAnalysis',
      'generalUrbanRetirementDenial',
      'disabilityRetirementPlanningRejection',
      'bpcElderlyAnalysis',
      'temporaryIncapacityBenefitRejection',
      'maternityPayGrant',
    ];
  }
}
