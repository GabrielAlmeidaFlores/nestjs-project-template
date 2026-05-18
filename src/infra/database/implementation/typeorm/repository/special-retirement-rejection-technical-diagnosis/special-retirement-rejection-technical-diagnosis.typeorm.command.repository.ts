import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-technical-diagnosis.typeorm.entity';
import { SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-technical-diagnosis/command/special-retirement-rejection-technical-diagnosis.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionTechnicalDiagnosisEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-technical-diagnosis/special-retirement-rejection-technical-diagnosis.entity';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

@Injectable()
export class SpecialRetirementRejectionTechnicalDiagnosisTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity>
  implements
    SpecialRetirementRejectionTechnicalDiagnosisCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionTechnicalDiagnosisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity)
    repository: Repository<SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionTechnicalDiagnosis(
    props: SpecialRetirementRejectionTechnicalDiagnosisEntity,
  ): TransactionType {
    const mapped =
      SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity.build({
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
        specialRetirementRejection: {
          id: props.specialRetirementRejectionId.toString(),
        } as never,
      });

    return this.create(mapped);
  }

  public updateSpecialRetirementRejectionTechnicalDiagnosis(
    props: SpecialRetirementRejectionTechnicalDiagnosisEntity,
  ): TransactionType {
    return this.createSpecialRetirementRejectionTechnicalDiagnosis(props);
  }

  public deleteAllBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          SpecialRetirementRejectionTechnicalDiagnosisTypeormEntity,
        )
        .softDelete({
          specialRetirementRejection: {
            id: specialRetirementRejectionId.toString(),
          },
        });
    };
  }
}
