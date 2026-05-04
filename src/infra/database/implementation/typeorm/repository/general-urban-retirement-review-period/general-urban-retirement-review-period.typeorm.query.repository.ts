import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { ListGeneralUrbanRetirementReviewPeriodQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/param/list-general-urban-retirement-review-period.query.param';
import { GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period-with-relations.query.result';
import { GetGeneralUrbanRetirementReviewPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/result/get-general-urban-retirement-review-period.query.result';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewPeriodTypeormEntity>
  implements GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByGeneralUrbanRetirementReviewId(
    _organizationId: OrganizationId,
    _authIdentityId: AuthIdentityId,
    listData: ListGeneralUrbanRetirementReviewPeriodQueryParam,
  ): Promise<
    ListDataOutputModel<GetGeneralUrbanRetirementReviewPeriodQueryResult>
  > {
    const where = listData.generalUrbanRetirementReview
      ? {
          generalUrbanRetirementReview: {
            id: listData.generalUrbanRetirementReview.toString(),
          },
        }
      : {};

    const result = await this.list(listData, { where });

    const resource = this.mapperGateway.mapArray(
      result.resource,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodQueryResult,
    );

    return new ListDataOutputModel<GetGeneralUrbanRetirementReviewPeriodQueryResult>(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        resource,
      },
    );
  }

  public async findOneByGeneralUrbanRetirementReviewPeriodIdOrFail(
    id: GeneralUrbanRetirementReviewPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodQueryResult> {
    const result = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      result,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodQueryResult,
    );
  }

  public async findOneByGeneralUrbanRetirementReviewPeriodIdOrFailWithRelations(
    id: GeneralUrbanRetirementReviewPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult> {
    const result = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: { generalUrbanRetirementReview: true },
      },
      err,
    );

    return this.mapperGateway.map(
      result,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodWithRelationsQueryResult,
    );
  }
}
