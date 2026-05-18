import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/command/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclaration(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
    );

    return this.create(mapped);
  }
}
