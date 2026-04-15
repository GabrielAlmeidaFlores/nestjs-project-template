import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-testimonial-witness-document/command/rural-or-hybrid-retirement-rejection-testimonial-witness-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity>
  implements RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity.build(
        {
          id: props.id.toString(),
          document: props.document,
          ruralOrHybridRetirementRejectionTestimonialWitness:
            RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity.build(
              {
                id: props.ruralOrHybridRetirementRejectionTestimonialWitnessId.toString(),
              } as RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
            ),
          createdAt: props.createdAt,
          updatedAt: props.updatedAt,
          deletedAt: props.deletedAt,
        } as RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity,
      );

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
