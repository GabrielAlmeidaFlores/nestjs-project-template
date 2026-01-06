import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetRetirementPlanningRppsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps-with-relations.query.result';
import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

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

  public async findOneByRetirementPlanningIdAndOrganizationIdWithRelationsOrFail(
    id: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRppsWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        },
        relations: {
          retirementPlanningRppsResult: true,
          retirementPlanningRppsRemunerationCalculation: true,
          retirementPlanningRppsInssBenefit: true,
          retirementPlanningRppsLegalProceeding: true,
          documents: true,
          remunerations: true,
          periods: {
            specialTimePeriod: { specialTimeDocuments: true },
            disabilityPeriod: { cid: true, disabilityDocuments: true },
          },
          analysisToolRecord: {
            analysisToolClient: {
              createdBy: { customer: true, organization: true },
              updatedBy: { customer: true, organization: true },
              analysisToolClientInssBenefit: true,
              analysisToolClientLegalProceeding: true,
            },
            createdBy: { customer: true, organization: true },
            updatedBy: { customer: true, organization: true },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      RetirementPlanningRppsTypeormEntity,
      GetRetirementPlanningRppsWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByRetirementPlanningIdAndOrganizationIdOrFail(
    id: RetirementPlanningRppsId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPlanningRppsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
            createdBy: {
              organization: {
                id: organizationId.toString(),
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
      GetRetirementPlanningRppsQueryResult,
    );

    return mappedData;
  }
}
