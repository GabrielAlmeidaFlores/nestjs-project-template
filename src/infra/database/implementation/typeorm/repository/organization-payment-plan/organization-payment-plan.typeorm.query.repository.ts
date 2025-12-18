import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { GetOrganizationPaymentPlanWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan-with-relations.query.result';
import { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';

@Injectable()
export class OrganizationPaymentPlanTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationPaymentPlanTypeormEntity>
  implements OrganizationPaymentPlanQueryRepositoryGateway
{
  protected readonly _type = OrganizationPaymentPlanTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanTypeormEntity)
    repository: Repository<OrganizationPaymentPlanTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationPaymentPlanQueryResult[]> {
    const data = await this.repository.find({
      where: {
        organization: {
          id: organizationId.toString(),
        },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanQueryResult,
    );
  }

  public async findOneByBankExternalId(
    bankExternalId: string,
  ): Promise<GetOrganizationPaymentPlanQueryResult | null> {
    const data = await this.repository.findOne({
      where: {
        bankExternalId,
      },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanQueryResult,
    );
  }

  public async findOneByBankExternalIdWithRelations(
    bankExternalId: string,
  ): Promise<GetOrganizationPaymentPlanWithRelationsQueryResult | null> {
    const data = await this.repository.findOne({
      where: {
        bankExternalId,
      },
      relations: [
        'organization',
        'paymentPlan',
        'paymentPlan.paymentPlanEnabledPaidResource',
        'paymentPlan.paymentPlanEnabledPaidResource.paymentPlan',
        'paymentPlan.paymentPlanEnabledPaidResource.paymentPlanPaidResource',
      ],
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      OrganizationPaymentPlanTypeormEntity,
      GetOrganizationPaymentPlanWithRelationsQueryResult,
    );
  }
}
