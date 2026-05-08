import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialRetirementGrantTechnicalDiagnosisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-technical-diagnosis.typeorm.entity';
import { SpecialRetirementGrantTechnicalDiagnosisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-technical-diagnosis/query/special-retirement-grant-technical-diagnosis.query.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantTechnicalDiagnosisId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/value-object/special-retirement-grant-technical-diagnosis-id/special-retirement-grant-technical-diagnosis-id.value-object';

@Injectable()
export class SpecialRetirementGrantTechnicalDiagnosisTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialRetirementGrantTechnicalDiagnosisTypeormEntity>
  implements SpecialRetirementGrantTechnicalDiagnosisQueryRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantTechnicalDiagnosisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantTechnicalDiagnosisTypeormEntity)
    repository: Repository<SpecialRetirementGrantTechnicalDiagnosisTypeormEntity>,
  ) {
    super(repository);
  }

  public async existsByIdAndSpecialRetirementGrantId(
    id: SpecialRetirementGrantTechnicalDiagnosisId,
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id: id.toString(),
        specialRetirementGrant: {
          id: specialRetirementGrantId.toString(),
        },
      },
    });

    return count > 0;
  }
}
