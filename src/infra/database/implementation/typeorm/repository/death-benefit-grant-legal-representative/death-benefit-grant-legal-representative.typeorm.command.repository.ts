import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitGrantLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-representative.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-legal-representative/command/death-benefit-grant-legal-representative.command.repository.gateway';
import { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitGrantLegalRepresentativeTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitGrantLegalRepresentativeTypeormEntity>
  implements DeathBenefitGrantLegalRepresentativeCommandRepositoryGateway
{
  protected readonly _type =
    DeathBenefitGrantLegalRepresentativeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitGrantLegalRepresentativeTypeormEntity)
    repository: Repository<DeathBenefitGrantLegalRepresentativeTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitGrantLegalRepresentative(
    props: DeathBenefitGrantLegalRepresentativeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantLegalRepresentativeEntity,
      DeathBenefitGrantLegalRepresentativeTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitGrantLegalRepresentative(
    id: DeathBenefitGrantLegalRepresentativeId,
    props: DeathBenefitGrantLegalRepresentativeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitGrantLegalRepresentativeEntity,
      DeathBenefitGrantLegalRepresentativeTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
