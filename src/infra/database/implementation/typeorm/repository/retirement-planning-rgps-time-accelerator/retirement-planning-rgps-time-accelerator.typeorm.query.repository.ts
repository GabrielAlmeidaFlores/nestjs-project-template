import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRgpsTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListRetirementPlanningRgpsTimeAcceleratorQueryParam } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/param/list-retirement-planning-rgps-time-accelerator.query.param';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>
  implements RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsTimeAcceleratorTypeormEntity)
    repository: Repository<RetirementPlanningRgpsTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningRgpsTimeAcceleratorIdOrFail(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
      },
      err,
    );

    const mapped = this.mapperGateway.map(
      data,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    );

    return mapped;
  }

  public async findByRetirementPlanningRgpsId(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsTimeAcceleratorQueryResult[]> {
    const data = await this.find({
      where: {
        retirementPlanningRgps: {
          id: retirementPlanningRgpsId.toString(),
        },
      },
    });

    const mapped = this.mapperGateway.mapArray(
      data,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    );

    return mapped;
  }

  public async listByRetirementPlanningRgpsId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListRetirementPlanningRgpsTimeAcceleratorQueryParam,
  ): Promise<
    ListDataOutputModel<GetRetirementPlanningRgpsTimeAcceleratorQueryResult>
  > {
    const where = listData.retirementPlanningRgps
      ? {
          retirementPlanningRgps: {
            id: listData.retirementPlanningRgps.toString(),
          },
        }
      : {};

    const result = await this.list(listData, { where });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      RetirementPlanningRgpsTimeAcceleratorTypeormEntity,
      GetRetirementPlanningRgpsTimeAcceleratorQueryResult,
    );

    return new ListDataOutputModel<GetRetirementPlanningRgpsTimeAcceleratorQueryResult>(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        resource,
      },
    );
  }
}
