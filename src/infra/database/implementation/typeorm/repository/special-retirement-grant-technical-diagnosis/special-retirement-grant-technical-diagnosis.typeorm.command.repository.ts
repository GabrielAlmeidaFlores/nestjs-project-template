import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantTechnicalDiagnosisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-technical-diagnosis.typeorm.entity';
import { SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-technical-diagnosis/command/special-retirement-grant-technical-diagnosis.command.repository.gateway';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-technical-diagnosis/special-retirement-grant-technical-diagnosis.entity';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class SpecialRetirementGrantTechnicalDiagnosisTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantTechnicalDiagnosisTypeormEntity>
  implements SpecialRetirementGrantTechnicalDiagnosisCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantTechnicalDiagnosisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantTechnicalDiagnosisTypeormEntity)
    repository: Repository<SpecialRetirementGrantTechnicalDiagnosisTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementGrantTechnicalDiagnosis(
    props: SpecialRetirementGrantTechnicalDiagnosisEntity,
  ): TransactionType {
    const mapped = SpecialRetirementGrantTechnicalDiagnosisTypeormEntity.build({
      id: props.id.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      periodStartDate: props.periodStartDate,
      periodEndDate: props.periodEndDate,
      recognized: props.recognized,
      justification: props.justification,
      company: props.company,
      cnpj: props.cnpj,
      role: props.role,
      supportingDocument: props.supportingDocument,
      recordedInCnis: props.recordedInCnis,
      remunerationRecordedInCnis: props.remunerationRecordedInCnis,
      hazardousAgents: props.hazardousAgents,
      informationSource: props.informationSource,
      legalFramework: props.legalFramework,
      epiEficaz: props.epiEficaz,
      observations: props.observations,
      specialRetirementGrant: {
        id: props.specialRetirementGrant.id.toString(),
      } as never,
    });

    return this.create(mapped);
  }

  public updateSpecialRetirementGrantTechnicalDiagnosis(
    props: SpecialRetirementGrantTechnicalDiagnosisEntity,
  ): TransactionType {
    return this.createSpecialRetirementGrantTechnicalDiagnosis(props);
  }

  public deleteAllBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(SpecialRetirementGrantTechnicalDiagnosisTypeormEntity)
        .softDelete({
          specialRetirementGrant: { id: specialRetirementGrantId.toString() },
        });
    };
  }
}
