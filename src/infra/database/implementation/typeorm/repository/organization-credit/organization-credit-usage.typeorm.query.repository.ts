import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCreditUsageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-usage.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { GetOrganizationCreditUsageQueryResult } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/result/get-organization-credit-usage.query.result';
import { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class OrganizationCreditUsageTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCreditUsageTypeormEntity>
  implements OrganizationCreditUsageQueryRepositoryGateway
{
  protected readonly _type = OrganizationCreditUsageTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditUsageTypeormEntity)
    repository: Repository<OrganizationCreditUsageTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationCreditUsage(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationCreditUsageQueryResult>> {
    const data = await this.list(listData, {
      relations: ['paymentPlanPaidResource', 'createdBy'],
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationCreditUsageTypeormEntity,
      GetOrganizationCreditUsageQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationCreditUsageQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOneOrganizationCreditUsageByIdOrFail(
    id: OrganizationCreditUsageId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetOrganizationCreditUsageQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: ['paymentPlanPaidResource', 'createdBy'],
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      OrganizationCreditUsageTypeormEntity,
      GetOrganizationCreditUsageQueryResult,
    );

    return resource;
  }

  public async findManyOrganizationCreditUsageByPaymentPlanPaidResourceId(
    paymentPlanPaidResourceId: PaymentPlanPaidResourceId,
  ): Promise<GetOrganizationCreditUsageQueryResult[]> {
    const data = await this.find({
      where: {
        paymentPlanPaidResource: {
          id: paymentPlanPaidResourceId.toString(),
        },
      },
      relations: ['paymentPlanPaidResource', 'createdBy'],
    });

    const resource = this.mapperGateway.mapArray(
      data,
      OrganizationCreditUsageTypeormEntity,
      GetOrganizationCreditUsageQueryResult,
    );

    return resource;
  }

  public async findManyOrganizationCreditUsageByCreatedBy(
    createdBy: OrganizationMemberId,
  ): Promise<GetOrganizationCreditUsageQueryResult[]> {
    const data = await this.find({
      where: {
        createdBy: {
          id: createdBy.toString(),
        },
      },
      relations: ['paymentPlanPaidResource', 'createdBy'],
    });

    const resource = this.mapperGateway.mapArray(
      data,
      OrganizationCreditUsageTypeormEntity,
      GetOrganizationCreditUsageQueryResult,
    );

    return resource;
  }
}
