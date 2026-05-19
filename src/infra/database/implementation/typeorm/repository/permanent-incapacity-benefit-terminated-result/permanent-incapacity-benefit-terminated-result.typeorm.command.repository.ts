import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-result/command/permanent-incapacity-benefit-terminated-result.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedResultTypeormEntity>
  implements PermanentIncapacityBenefitTerminatedResultCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PermanentIncapacityBenefitTerminatedResultTypeormEntity)
    repository: Repository<PermanentIncapacityBenefitTerminatedResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedResult(
    props: PermanentIncapacityBenefitTerminatedResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedResultEntity,
      PermanentIncapacityBenefitTerminatedResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePermanentIncapacityBenefitTerminatedResult(
    props: PermanentIncapacityBenefitTerminatedResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedResultEntity,
      PermanentIncapacityBenefitTerminatedResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
