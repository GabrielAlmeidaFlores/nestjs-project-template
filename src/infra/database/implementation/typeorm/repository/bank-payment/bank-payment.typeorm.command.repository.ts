import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class BankPaymentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BankPaymentTypeormEntity>
  implements BankPaymentCommandRepositoryGateway
{
  protected readonly _type = BankPaymentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BankPaymentTypeormEntity)
    repository: Repository<BankPaymentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBankPayment(props: BankPaymentEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BankPaymentEntity,
      BankPaymentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateBankPayment(
    id: BankPaymentId,
    props: BankPaymentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BankPaymentEntity,
      BankPaymentTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteBankPayment(id: BankPaymentId): TransactionType {
    return this.delete(id.toString());
  }
}
