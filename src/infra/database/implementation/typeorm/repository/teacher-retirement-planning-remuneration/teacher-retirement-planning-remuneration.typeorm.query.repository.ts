import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TeacherRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-remuneration.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListTeacherRetirementPlanningRemunerationQueryParam } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/param/list-teacher-retirement-planning-remuneration.query.param';
import { GetTeacherRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import { TeacherRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/teacher-retirement-planning-remuneration.query.repository.gateway';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class TeacherRetirementPlanningRemunerationTypeormQueryRepository
  extends BaseTypeormQueryRepository<TeacherRetirementPlanningRemunerationTypeormEntity>
  implements TeacherRetirementPlanningRemunerationQueryRepositoryGateway
{
  protected readonly _type =
    TeacherRetirementPlanningRemunerationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TeacherRetirementPlanningRemunerationTypeormEntity)
    repository: Repository<TeacherRetirementPlanningRemunerationTypeormEntity>,
  ) {
    super(repository);
  }

  public async findByTeacherRetirementPlanningId(
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
  ): Promise<GetTeacherRetirementPlanningRemunerationQueryResult[]> {
    const data = await this.repository.find({
      where: {
        teacherRetirementPlanning: {
          id: teacherRetirementPlanningId.toString(),
        },
      },
      relations: {
        teacherRetirementPlanning: true,
      },
    });

    return data.map((item) =>
      GetTeacherRetirementPlanningRemunerationQueryResult.build({
        id: new TeacherRetirementPlanningRemunerationId(item.id),
        contributionDate: item.contributionDate,
        amount: new DecimalValue(item.amount),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
      }),
    );
  }

  public async listByTeacherRetirementPlanningIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    teacherRetirementPlanningId: TeacherRetirementPlanningId,
    listData: ListTeacherRetirementPlanningRemunerationQueryParam,
  ): Promise<
    ListDataOutputModel<GetTeacherRetirementPlanningRemunerationQueryResult>
  > {
    const searchParams: FindManyOptions<TeacherRetirementPlanningRemunerationTypeormEntity> =
      {
        where: {
          teacherRetirementPlanning: {
            id: teacherRetirementPlanningId.toString(),
          },
        },
        relations: {
          teacherRetirementPlanning: true,
        },
      };

    void organizationId;
    void authIdentityId;

    const data = await this.list(listData, searchParams);

    return new ListDataOutputModel({
      ...data,
      resource: data.resource.map((item) =>
        GetTeacherRetirementPlanningRemunerationQueryResult.build({
          id: new TeacherRetirementPlanningRemunerationId(item.id),
          contributionDate: item.contributionDate,
          amount: new DecimalValue(item.amount),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          deletedAt: item.deletedAt,
        }),
      ),
    });
  }
}
