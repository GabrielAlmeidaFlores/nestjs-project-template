import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetSpecialRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-with-relations.query.result';
import { SpecialRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/special-retirement-grant.query.repository.gateway';

import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

@Injectable()
export class SpecialRetirementGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialRetirementGrantTypeormEntity>
  implements SpecialRetirementGrantQueryRepositoryGateway
{
  protected readonly _type = SpecialRetirementGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantTypeormEntity)
    repository: Repository<SpecialRetirementGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetSpecialRetirementGrantWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
        updatedBy: {
          organization: {
            id: organizationId.toString(),
          },
        },
      },
      relations: {
        createdBy: {
          customer: true,
          organization: true,
        },
        updatedBy: {
          customer: true,
          organization: true,
        },
        specialRetirementGrantBenefit: true,
        specialRetirementGrantLegalProceeding: true,
        specialRetirementGrantDocument: true,
        specialRetirementGrantResult: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      SpecialRetirementGrantTypeormEntity,
      GetSpecialRetirementGrantWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetSpecialRetirementGrantWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneBySpecialRetirementGrantIdAndOrganizationIdOrFail(
    specialRetirementGrantId: SpecialRetirementGrantId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialRetirementGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: specialRetirementGrantId.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        relations: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          specialRetirementGrantBenefit: true,
          specialRetirementGrantLegalProceeding: true,
          specialRetirementGrantDocument: true,
          specialRetirementGrantResult: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SpecialRetirementGrantTypeormEntity,
      GetSpecialRetirementGrantWithRelationsQueryResult,
    );
  }
}
