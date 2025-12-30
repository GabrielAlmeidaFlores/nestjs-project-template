import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { CreateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-period.request.dto';
import { CreateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-period.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';

@Injectable()
export class CreateRetirementPlanningRgpsPeriodUseCase {
  protected readonly _type = CreateRetirementPlanningRgpsPeriodUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFail(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgps,
    });

    const period = new RetirementPlanningRgpsPeriodEntity({
      periodName: dto.json.periodName,
      periodStart: dto.json.periodStart,
      periodEnd: dto.json.periodEnd,
      category: dto.json.category,
      isPendency: dto.json.isPendency,
      competenceBelowTheMinimum: dto.json.competenceBelowTheMinimum,
      contributionAverage: dto.json.contributionAverage,
      typeOfContribution: dto.json.typeOfContribution,
      retirementPlanningRgps: retirementPlanningRgpsEntity,
      status: dto.json.status,
    });

    const documents =
      dto.documents !== undefined
        ? dto.documents.map((value) => {
            return new RetirementPlanningRgpsPeriodDocumentEntity({
              document: value.file.toString(),
              retirementPlanningRgpsPeriod: period,
            });
          })
        : [];

    await this.createOnDatabase(period, documents);

    return CreateRetirementPlanningRgpsPeriodResponseDto.build({
      retirementPlanningRgpsPeriodId: period.id,
    });
  }

  private async createOnDatabase(
    retirementPlanningRgpsPeriod: RetirementPlanningRgpsPeriodEntity,
    retirementPlanningRgpsPeriodDocuments?: RetirementPlanningRgpsPeriodDocumentEntity[],
  ): Promise<void> {
    const retirementPlanningRgpsPeriodTransaction =
      this.retirementPlanningRgpsPeriodCommandRepositoryGateway.createRetirementPlanningRgpsPeriod(
        retirementPlanningRgpsPeriod,
      );

    const retirementPlanningRgpsPeriodDocumentTransactions =
      retirementPlanningRgpsPeriodDocuments?.map((value) => {
        return this.retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRgpsPeriodDocument(
          value,
        );
      }) ?? [];

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsPeriodTransaction,
      ...retirementPlanningRgpsPeriodDocumentTransactions,
    ]);

    await transactions.commit();
  }
}
