import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-technical-diagnosis.typeorm.entity';
import { SpecialRetirementRejectionTechnicalDiagnosisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-technical-diagnosis/query/special-retirement-rejection-technical-diagnosis.query.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/value-object/special-retirement-rejection-technical-diagnosis-id/special-retirement-rejection-technical-diagnosis-id.value-object';

@Injectable()
export class SpecialRetirementRejectionTechnicalDiagnosisTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity>
  implements SpecialRetirementRejectionTechnicalDiagnosisQueryRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionTechnicalDiagnosisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity)
    repository: Repository<SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity>,
  ) {
    super(repository);
  }

  public async existsByIdAndSpecialRetirementRejectionId(
    id: SpecialRetirementRejectionTechnicalDiagnosisId,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id: id.toString(),
        specialRetirementRejection: {
          id: specialRetirementRejectionId.toString(),
        },
      },
    });

    return count > 0;
  }
}
