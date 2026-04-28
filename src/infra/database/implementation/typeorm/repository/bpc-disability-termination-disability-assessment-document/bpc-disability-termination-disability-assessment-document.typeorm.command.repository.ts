import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-disability-assessment-document/command/bpc-disability-termination-disability-assessment-document.command.repository.gateway';
import { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';

@Injectable()
export class BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity>
  implements
    BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
    )
    repository: Repository<BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationDisabilityAssessmentDocument(
    props: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
      BpcDisabilityTerminationDisabilityAssessmentDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityTerminationDisabilityAssessmentDocument(
    props: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcDisabilityTerminationDisabilityAssessmentDocument(item),
    );
  }
}
