import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityAssessmentForBpcAnalysisTypeormEntity>
  implements DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityAssessmentForBpcAnalysisTypeormEntity)
    repository: Repository<DisabilityAssessmentForBpcAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityAssessmentForBpcAnalysis(
    props: DisabilityAssessmentForBpcAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisEntity,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityAssessmentForBpcAnalysis(
    id: DisabilityAssessmentForBpcAnalysisId,
    props: DisabilityAssessmentForBpcAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisEntity,
      DisabilityAssessmentForBpcAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteDisabilityAssessmentForBpcAnalysis(
    id: DisabilityAssessmentForBpcAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType {
    return this.update(id.toString(), {
      deletedAt: new Date(),
      updatedBy: {
        id: updatedBy.toString(),
      },
    });
  }
}
