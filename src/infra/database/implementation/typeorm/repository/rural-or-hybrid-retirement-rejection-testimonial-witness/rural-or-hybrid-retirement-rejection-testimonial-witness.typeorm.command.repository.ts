import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-testimonial-witness/command/rural-or-hybrid-retirement-rejection-testimonial-witness.command.repository.gateway';
import { RuralOrHybridRetirementRejectionTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionTestimonialWitnessTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionTestimonialWitness(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejectionTestimonialWitness(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessId,
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionTestimonialWitness(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntity,
  ): RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity {
    return RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity.build(
      {
        id: props.id.toString(),
        fullName: props.fullName,
        federalDocument: props.federalDocument,
        insuredRelationship: props.insuredRelationship,
        canTestifyStartDate: props.canTestifyStartDate,
        canTestifyEndDate: props.canTestifyEndDate,
        ruralOrHybridRetirementRejection:
          RuralOrHybridRetirementRejectionTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionId.toString(),
          } as RuralOrHybridRetirementRejectionTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
    );
  }
}
