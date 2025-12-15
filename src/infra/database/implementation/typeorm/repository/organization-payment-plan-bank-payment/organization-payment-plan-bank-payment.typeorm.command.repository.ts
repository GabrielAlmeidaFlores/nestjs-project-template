import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationPaymentPlanBankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-bank-payment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';

@Injectable()
export class OrganizationPaymentPlanBankPaymentTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationPaymentPlanBankPaymentTypeormEntity>
  implements OrganizationPaymentPlanBankPaymentCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationPaymentPlanBankPaymentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationPaymentPlanBankPaymentTypeormEntity)
    repository: Repository<OrganizationPaymentPlanBankPaymentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationPaymentPlanBankPayment(
    props: OrganizationPaymentPlanBankPaymentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanBankPaymentEntity,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationPaymentPlanBankPayment(
    id: OrganizationPaymentPlanBankPaymentId,
    props: Partial<OrganizationPaymentPlanBankPaymentEntity>,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationPaymentPlanBankPaymentEntity,
      OrganizationPaymentPlanBankPaymentTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteOrganizationPaymentPlanBankPayment(
    id: OrganizationPaymentPlanBankPaymentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
