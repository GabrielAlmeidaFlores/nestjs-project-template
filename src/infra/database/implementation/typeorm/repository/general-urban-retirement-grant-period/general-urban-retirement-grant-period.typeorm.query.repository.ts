import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { ListGeneralUrbanRetirementGrantPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/param/list-general-urban-retirement-grant-period.query.param';
import { GetGeneralUrbanRetirementGrantPeriodWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/result/get-general-urban-retirement-grant-period-with-relations.query.result';
import { GetGeneralUrbanRetirementGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/result/get-general-urban-retirement-grant-period.query.result';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantPeriodTypeormEntity>
  implements GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByGeneralUrbanRetirementGrantId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListGeneralUrbanRetirementGrantPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetGeneralUrbanRetirementGrantPeriodQueryResult>
  > {
    const where = listData.generalUrbanRetirementGrant
      ? {
          generalUrbanRetirementGrant: {
            id: listData.generalUrbanRetirementGrant.toString(),
          },
        }
      : {};

    const result = await this.list(listData, { where });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodQueryResult,
    );

    return new ListDataOutputModel<GetGeneralUrbanRetirementGrantPeriodQueryResult>(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        resource,
      },
    );
  }

  public async findOneByGeneralUrbanRetirementGrantPeriodIdOrFail(
    id: GeneralUrbanRetirementGrantPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodQueryResult> {
    const result = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      result,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodQueryResult,
    );
  }

  public async findOneByGeneralUrbanRetirementGrantPeriodIdOrFailWithRelations(
    id: GeneralUrbanRetirementGrantPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantPeriodWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: { generalUrbanRetirementGrant: true },
      },
      err,
    );

    return this.mapperGateway.map(
      result,
      GeneralUrbanRetirementGrantPeriodTypeormEntity,
      GetGeneralUrbanRetirementGrantPeriodWithRelationsQueryResult,
    );
  }
}
