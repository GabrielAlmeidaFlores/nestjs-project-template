import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-testimonial-witness/command/rural-or-hybrid-retirement-analysis-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisTestimonialWitness(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementAnalysisTestimonialWitness(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisTestimonialWitness(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntity,
  ): RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity {
    return RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity.build(
      {
        id: props.id.toString(),
        fullName: props.fullName,
        federalDocument: props.federalDocument,
        insuredRelationship: props.insuredRelationship,
        canTestifyStartDate: props.canTestifyStartDate,
        canTestifyEndDate: props.canTestifyEndDate,
        ruralOrHybridRetirementAnalysis:
          RuralOrHybridRetirementAnalysisTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisId.toString(),
          } as RuralOrHybridRetirementAnalysisTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
    );
  }
}
