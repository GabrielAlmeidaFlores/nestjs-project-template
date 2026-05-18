import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-testimonial-witness-document/command/rural-or-hybrid-retirement-analysis-testimonial-witness-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity.build(
        {
          id: props.id.toString(),
          document: props.document,
          ruralOrHybridRetirementAnalysisTestimonialWitness:
            RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity.build(
              {
                id: props.ruralOrHybridRetirementAnalysisTestimonialWitnessId.toString(),
              } as RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
            ),
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        } as RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity,
      );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
