import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/query/general-urban-retirement-grant-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantEarningsHistoryTypeormQueryRepository implements GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway {
  protected readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity)
    private readonly repository: Repository<GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findByGeneralUrbanRetirementGrantPeriodId(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GeneralUrbanRetirementGrantEarningsHistoryEntity[]> {
    const results = await this.repository.find({
      where: {
        generalUrbanRetirementGrantPeriod: {
          id: periodId.toString(),
        },
      },
    });

    return results.map((r) =>
      this.mapperGateway.map(
        r,
        GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
        GeneralUrbanRetirementGrantEarningsHistoryEntity,
      ),
    );
  }

  public async findByGeneralUrbanRetirementGrantPeriodIdBelowMinimum(
    periodId: GeneralUrbanRetirementGrantPeriodId,
  ): Promise<GeneralUrbanRetirementGrantEarningsHistoryEntity[]> {
    const results = await this.repository.find({
      where: {
        generalUrbanRetirementGrantPeriod: {
          id: periodId.toString(),
        },
        competenceBelowTheMinimum: true,
      },
    });

    return results.map((r) =>
      this.mapperGateway.map(
        r,
        GeneralUrbanRetirementGrantEarningsHistoryTypeormEntity,
        GeneralUrbanRetirementGrantEarningsHistoryEntity,
      ),
    );
  }
}
