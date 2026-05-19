import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-disability-assessment/command/bpc-disability-termination-disability-assessment.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';

@Injectable()
export class BpcDisabilityTerminationDisabilityAssessmentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationDisabilityAssessmentTypeormEntity>
  implements
    BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationDisabilityAssessmentTypeormEntity)
    repository: Repository<BpcDisabilityTerminationDisabilityAssessmentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationDisabilityAssessment(
    props: BpcDisabilityTerminationDisabilityAssessmentEntity,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationDisabilityAssessmentEntity,
      BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
    );

    mappedData.bpcDisabilityTermination = {
      id: bpcDisabilityTerminationId.toString(),
    } as BpcDisabilityTerminationTypeormEntity;

    return this.create(mappedData);
  }

  public updateBpcDisabilityTerminationDisabilityAssessment(
    id: BpcDisabilityTerminationDisabilityAssessmentId,
    props: BpcDisabilityTerminationDisabilityAssessmentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationDisabilityAssessmentEntity,
      BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
