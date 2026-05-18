import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/command/permanent-incapacity-benefit-terminated.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedTypeormEntity>
  implements PermanentIncapacityBenefitTerminatedCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PermanentIncapacityBenefitTerminatedTypeormEntity)
    repository: Repository<PermanentIncapacityBenefitTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminated(
    props: PermanentIncapacityBenefitTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedEntity,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updatePermanentIncapacityBenefitTerminated(
    id: PermanentIncapacityBenefitTerminatedId,
    props: PermanentIncapacityBenefitTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedEntity,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updatePermanentIncapacityBenefitTerminatedResultId(
    id: PermanentIncapacityBenefitTerminatedId,
    resultId: PermanentIncapacityBenefitTerminatedResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      permanentIncapacityBenefitTerminatedResult:
        PermanentIncapacityBenefitTerminatedResultTypeormEntity.build({
          id: resultId.toString(),
        } as PermanentIncapacityBenefitTerminatedResultTypeormEntity),
    });
  }
}
