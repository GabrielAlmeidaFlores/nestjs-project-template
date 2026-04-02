import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AffiliateBankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-bank-transfer.typeorm.entity';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-transfer.typeorm.entity';
import { OrganizationPaymentPlanAffiliateCommissionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-affiliate-commission.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AffiliateBankTransferCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/command/affiliate-bank-transfer.command.repository.gateway';
import { AffiliateBankTransferEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity';

@Injectable()
export class AffiliateBankTransferTypeormCommandRepository
  extends BaseTypeormCommandRepository<AffiliateBankTransferTypeormEntity>
  implements AffiliateBankTransferCommandRepositoryGateway
{
  protected readonly _type = AffiliateBankTransferTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AffiliateBankTransferTypeormEntity)
    repository: Repository<AffiliateBankTransferTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAffiliateBankTransfer(
    props: AffiliateBankTransferEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AffiliateBankTransferEntity,
      AffiliateBankTransferTypeormEntity,
    );

    return this.create(
      AffiliateBankTransferTypeormEntity.build({
        ...mappedData,
        affiliatePlanCommission: {
          id: props.affiliatePlanCommission.toString(),
        } as OrganizationPaymentPlanAffiliateCommissionTypeormEntity,
        bankPayment: {
          id: props.bankPayment.toString(),
        } as BankPaymentTypeormEntity,
        bankTransfer: {
          id: props.bankTransfer.toString(),
        } as BankTransferTypeormEntity,
      }),
    );
  }
}
