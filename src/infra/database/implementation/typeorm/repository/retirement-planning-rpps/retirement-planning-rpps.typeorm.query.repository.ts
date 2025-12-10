import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class RetirementPlanningRppsTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPlanningRppsTypeormEntity>
  implements RetirementPlanningRppsQueryRepositoryGateway
{
  protected readonly _type = RetirementPlanningRppsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsTypeormEntity)
    repository: Repository<RetirementPlanningRppsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
    id: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: Constructor<NotFoundError>,
  ): Promise<RetirementPlanningRppsEntity> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
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
        },
        relations: {
          analysisToolRecord: {
            createdBy: {
              organization: true,
              customer: {
                authIdentity: true,
              },
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRppsTypeormEntity,
      RetirementPlanningRppsEntity,
    );

    return mappedData;
  }
}
