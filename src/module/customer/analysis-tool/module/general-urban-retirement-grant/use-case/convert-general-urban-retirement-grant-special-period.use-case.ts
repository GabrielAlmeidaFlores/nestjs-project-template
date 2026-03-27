import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/general-urban-retirement-grant-special-period.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-special-period/query/result/get-general-urban-retirement-grant-special-period.query.result';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';
import { ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/convert-general-urban-retirement-grant-special-period.response.dto';
import { GeneralUrbanRetirementGrantSpecialPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-special-period-not-found.error';

interface GeneralUrbanRetirementGrantSpecialPeriodAnalysisInterface {
  resumo_executivo: {
    nome: string;
    periodoInicio: string;
    periodoFim: string;
  };
}

@Injectable()
export class ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase {
  protected readonly _type =
    ConvertGeneralUrbanRetirementGrantSpecialPeriodUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway: GeneralUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    generalUrbanRetirementGrantSpecialPeriodId: GeneralUrbanRetirementGrantSpecialPeriodId,
  ): Promise<ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto> {
    await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFail(
      generalUrbanRetirementGrantId,
      GeneralUrbanRetirementGrantSpecialPeriodNotFoundError,
    );

    const generalUrbanRetirementGrantEntity =
      new GeneralUrbanRetirementGrantEntity({
        id: new GeneralUrbanRetirementGrantId(
          generalUrbanRetirementGrantId.toString(),
        ),
      });

    const specialPeriod: GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult =
      await this.generalUrbanRetirementGrantSpecialPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantSpecialPeriodIdOrFail(
        generalUrbanRetirementGrantSpecialPeriodId,
        GeneralUrbanRetirementGrantSpecialPeriodNotFoundError,
      );

    const rawResponse = specialPeriod.response;

    let jsonString = '';
    const codeFenceMatch = rawResponse.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/i,
    );

    if (
      codeFenceMatch &&
      typeof codeFenceMatch[1] === 'string' &&
      codeFenceMatch[1].trim() !== ''
    ) {
      jsonString = codeFenceMatch[1].trim();
    } else {
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      jsonString = objMatch ? objMatch[0] : '{}';
    }

    let parsed: GeneralUrbanRetirementGrantSpecialPeriodAnalysisInterface;
    try {
      parsed = JSON.parse(
        jsonString,
      ) as GeneralUrbanRetirementGrantSpecialPeriodAnalysisInterface;
    } catch {
      throw new GeneralUrbanRetirementGrantSpecialPeriodNotFoundError();
    }

    const periodEntity = new GeneralUrbanRetirementGrantPeriodEntity({
      periodName: parsed.resumo_executivo.nome,
      periodStart: new Date(parsed.resumo_executivo.periodoInicio),
      periodEnd: new Date(parsed.resumo_executivo.periodoFim),
      category: 'Especial',
      isPendency: false,
      competenceBelowTheMinimum: true,
      contributionAverage: new DecimalValue(0),
      typeOfContribution: 'Urbano',
      generalUrbanRetirementGrant: generalUrbanRetirementGrantEntity,
    });

    const createdPeriod =
      this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.createGeneralUrbanRetirementGrantPeriod(
        periodEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createdPeriod,
    ]);

    await transactions.commit();

    return ConvertGeneralUrbanRetirementGrantSpecialPeriodResponseDto.build({
      generalUrbanRetirementGrantPeriodId: periodEntity.id,
    });
  }
}
