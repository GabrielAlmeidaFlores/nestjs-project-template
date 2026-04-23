import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitRejectionLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-representative.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-legal-representative/command/death-benefit-rejection-legal-representative.command.repository.gateway';
import { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitRejectionLegalRepresentativeTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitRejectionLegalRepresentativeTypeormEntity>
  implements DeathBenefitRejectionLegalRepresentativeCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitRejectionLegalRepresentativeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitRejectionLegalRepresentativeTypeormEntity)
    repository: Repository<DeathBenefitRejectionLegalRepresentativeTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitRejectionLegalRepresentative(
    props: DeathBenefitRejectionLegalRepresentativeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionLegalRepresentativeEntity,
      DeathBenefitRejectionLegalRepresentativeTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitRejectionLegalRepresentative(
    id: DeathBenefitRejectionLegalRepresentativeId,
    props: DeathBenefitRejectionLegalRepresentativeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitRejectionLegalRepresentativeEntity,
      DeathBenefitRejectionLegalRepresentativeTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDeathBenefitRejectionLegalRepresentative(
    id: DeathBenefitRejectionLegalRepresentativeId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
