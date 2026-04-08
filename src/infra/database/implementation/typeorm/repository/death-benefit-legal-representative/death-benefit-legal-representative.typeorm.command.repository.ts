import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DeathBenefitLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-representative.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DeathBenefitLegalRepresentativeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-legal-representative/command/death-benefit-legal-representative.command.repository.gateway';
import { DeathBenefitLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity';
import { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitLegalRepresentativeTypeormCommandRepository
  extends BaseTypeormCommandRepository<DeathBenefitLegalRepresentativeTypeormEntity>
  implements DeathBenefitLegalRepresentativeCommandRepositoryGateway
{
  protected readonly _type = DeathBenefitLegalRepresentativeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DeathBenefitLegalRepresentativeTypeormEntity)
    repository: Repository<DeathBenefitLegalRepresentativeTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDeathBenefitLegalRepresentative(props: DeathBenefitLegalRepresentativeEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitLegalRepresentativeEntity,
      DeathBenefitLegalRepresentativeTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDeathBenefitLegalRepresentative(
    id: DeathBenefitLegalRepresentativeId,
    props: DeathBenefitLegalRepresentativeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DeathBenefitLegalRepresentativeEntity,
      DeathBenefitLegalRepresentativeTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
