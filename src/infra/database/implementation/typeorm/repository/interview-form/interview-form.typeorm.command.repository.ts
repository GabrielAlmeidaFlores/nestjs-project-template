import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/interview-form.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InterviewFormCommandRepositoryGateway } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/command/interview-form.command.repository.gateway';
import { InterviewFormEntity } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/interview-form.entity';
import { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

@Injectable()
export class InterviewFormTypeormCommandRepository
  extends BaseTypeormCommandRepository<InterviewFormTypeormEntity>
  implements InterviewFormCommandRepositoryGateway
{
  protected readonly _type = InterviewFormTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InterviewFormTypeormEntity)
    repository: Repository<InterviewFormTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createInterviewForm(props: InterviewFormEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InterviewFormEntity,
      InterviewFormTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateInterviewForm(
    id: InterviewFormId,
    props: InterviewFormEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InterviewFormEntity,
      InterviewFormTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteInterviewForm(id: InterviewFormId): TransactionType {
    return this.delete(id.toString());
  }
}
