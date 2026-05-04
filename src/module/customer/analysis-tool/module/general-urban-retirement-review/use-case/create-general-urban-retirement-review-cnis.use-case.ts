import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { TetoInssData } from '@lib/cnis-analyzer/data/teto.inss';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { CnisDocumentIsNotValidError } from '@module/customer/analysis-tool/module/cnis-fast-analysis/error/cnis-document-is-not-valid.error';
import { GeneralUrbanRetirementReviewCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/command/general-urban-retirement-review.command.repository.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-earnings-history/command/general-urban-retirement-review-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CreateGeneralUrbanRetirementReviewCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-cnis.request.dto';
import { CreateGeneralUrbanRetirementReviewCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-cnis.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementReviewCnisUseCase {
  protected readonly _type = CreateGeneralUrbanRetirementReviewCnisUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(GeneralUrbanRetirementReviewCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewCommandRepositoryGateway: GeneralUrbanRetirementReviewCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway: GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateGeneralUrbanRetirementReviewCnisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewCnisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        dto.json.generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const validateCnisDocument =
      await this.analysisProcessorGateway.validateCnisDocument(
        dto.cnisDocument.buffer,
      );

    if (validateCnisDocument === false) {
      throw new CnisDocumentIsNotValidError();
    }

    const cnisDocument = await this.fileProcessorGateway.uploadFile(
      dto.cnisDocument,
    );

    const generalUrbanRetirementReviewResult =
      new GeneralUrbanRetirementReviewResultEntity({
        ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
      });

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_CNIS_ANALYSIS,
        organizationMember.id,
      );

    const updatedGeneralUrbanRetirementReview =
      new GeneralUrbanRetirementReviewEntity({
        ...generalUrbanRetirementReview,
        generalUrbanRetirementReviewResult,
        cnisDocument,
      });

    const cnis = await this.analysisProcessorGateway.parseCnisDocument(
      dto.cnisDocument.buffer,
    );

    const earningHistories: GeneralUrbanRetirementReviewEarningsHistoryEntity[] =
      [];

    interface PeriodWithFlagsInterface extends GeneralUrbanRetirementReviewPeriodEntity {
      __carenciaDestravada: boolean;
      __contaTempo: boolean;
    }

    const periods =
      cnis.socialSecurityRelations !== undefined
        ? cnis.socialSecurityRelations.map((relation) => {
            const typeOfContribution =
              relation.socialSecurityAffiliationInfo.origemDoVinculo ===
                'PERÍODO DE ATIVIDADE DE SEGURADO ESPECIAL' ||
              relation.socialSecurityAffiliationInfo.origemDoVinculo ===
                'SEGURADO ESPECIAL'
                ? 'Rural'
                : 'Urbano';

            const contributionTotal =
              relation.socialSecurityAffiliationEarningsHistory
                .map((earning) => {
                  const remuneration = this.parseRemunerationString(
                    earning.remuneracao,
                  );
                  if (remuneration === null || isNaN(remuneration)) {
                    return 0;
                  }
                  return remuneration;
                })
                .reduce((acc, curr) => acc + curr, 0);

            const contributionAverage =
              relation.socialSecurityAffiliationEarningsHistory.length > 0
                ? contributionTotal /
                  relation.socialSecurityAffiliationEarningsHistory.length
                : 0;

            const competenceBelowTheMinimum =
              relation.socialSecurityAffiliationEarningsHistory.some(
                (earning) => {
                  return TetoInssData.some((teto) => {
                    const competencia = earning.competencia;
                    if (!competencia) {
                      return false;
                    }
                    const competenciaYear = competencia.getFullYear();
                    if (teto.ano !== competenciaYear) {
                      return false;
                    }
                    const remuneration = this.parseRemunerationString(
                      earning.remuneracao,
                    );
                    if (remuneration === null || isNaN(remuneration)) {
                      return false;
                    }
                    return remuneration < teto.salarioMinimo;
                  });
                },
              );

            const indicadorPendencia = ['PEXT'];

            const delayPayment =
              relation.socialSecurityAffiliationEarningsHistory.some(
                (earning) => {
                  if (
                    earning.indicadores === undefined ||
                    earning.indicadores === ''
                  ) {
                    return false;
                  }
                  return indicadorPendencia.includes(earning.indicadores);
                },
              );

            const reasonPendency =
              relation.socialSecurityAffiliationInfo.dataFim === undefined
                ? ReasonPendencyEnum.LEAVE_DATE
                : competenceBelowTheMinimum
                  ? ReasonPendencyEnum.COMPETENCE_BELOW_MINIMUM
                  : delayPayment
                    ? ReasonPendencyEnum.INCONSISTENT_COMPETENCE
                    : '';

            const period = new GeneralUrbanRetirementReviewPeriodEntity({
              periodName:
                relation.socialSecurityAffiliationInfo.origemDoVinculo ?? null,
              periodStart:
                relation.socialSecurityAffiliationInfo.dataInicio ?? null,
              periodEnd: relation.socialSecurityAffiliationInfo.dataFim ?? null,
              category:
                relation.socialSecurityAffiliationInfo.tipoFiliadoNoVinculo ??
                null,
              isPendency: reasonPendency !== '',
              competenceBelowTheMinimum,
              contributionAverage: new DecimalValue(contributionAverage),
              typeOfContribution,
              generalUrbanRetirementReview: updatedGeneralUrbanRetirementReview,
              reasonPendency:
                reasonPendency !== ''
                  ? (reasonPendency as ReasonPendencyEnum)
                  : null,
              status: reasonPendency === '',
            }) as PeriodWithFlagsInterface;

            const earnings = relation.socialSecurityAffiliationEarningsHistory;

            const MESES_PARA_PERDA_CI = 15;

            if (earnings.length > 0) {
              earnings.forEach((e, index) => {
                const competenceBelowTheMinimumSalary =
                  relation.socialSecurityAffiliationEarningsHistory.some(() => {
                    if (!e.competencia) {
                      return false;
                    }

                    const year = e.competencia.getFullYear();

                    const findSalary = TetoInssData.find((teto) => {
                      return teto.ano === year;
                    });

                    if (!findSalary) {
                      return false;
                    }
                    const salarioMinimo = findSalary.salarioMinimo;
                    const remuneration = this.parseRemunerationString(
                      e.remuneracao,
                    );
                    if (remuneration === null) {
                      return false;
                    }
                    if (isNaN(remuneration)) {
                      return false;
                    }

                    return remuneration < salarioMinimo;
                  });
                const data = e.competencia ?? new Date();
                const ano = data.getFullYear();
                const mes = data.getMonth() + 1;

                const dataVencimento = this.calcularDataVencimento(mes, ano);

                const paymentDate = e.dataPgto ?? new Date();

                const pagamentoEmDia = this.checkPaymentOnTime(
                  paymentDate,
                  dataVencimento,
                );
                const tipoUpper = (
                  relation.socialSecurityAffiliationInfo.origemDoVinculo ?? ''
                ).toUpperCase();

                const isEmpregado =
                  tipoUpper.includes('EMPREGADO') ||
                  tipoUpper.includes('DOMÉSTICO') ||
                  tipoUpper.includes('DOMESTICO') ||
                  tipoUpper.includes('AVULSO') ||
                  tipoUpper.includes('PÚBLICO') ||
                  tipoUpper.includes('PUBLICO');

                if (index === 0) {
                  period.__carenciaDestravada = false;
                  period.__contaTempo = true;
                }

                let carenciaDestravada = period.__carenciaDestravada;
                let contaCarencia = false;
                let valida = false;
                let contribuicaoEmDia = false;
                let contaTempo = period.__contaTempo;

                const isContribuinteIndividual =
                  tipoUpper.includes('CONTRIBUINTE') ||
                  tipoUpper.includes('INDIVIDUAL');
                const isFacultativo = tipoUpper.includes('FACULTATIVO');

                const indicadores =
                  relation.socialSecurityAffiliationInfo.indicadores ?? '';

                const possuiIndicadorImped =
                  indicadores.includes('PEXT') ||
                  indicadores.includes('PREM-EXT');

                if (possuiIndicadorImped) {
                  valida = false;
                  contaCarencia = false;
                  contaTempo = false;
                } else {
                  if (isEmpregado) {
                    contribuicaoEmDia = true;
                    carenciaDestravada = true;
                    contaCarencia = true;
                    valida = true;
                  } else {
                    const fatalLimit = this.calcularLimiteFatal(
                      dataVencimento,
                      MESES_PARA_PERDA_CI,
                    );

                    if (pagamentoEmDia) {
                      carenciaDestravada = true;
                      contaCarencia = true;
                      valida = true;
                    } else {
                      if (!carenciaDestravada) {
                        if (isContribuinteIndividual) {
                          contaCarencia = false;
                          valida = true;
                        } else if (isFacultativo) {
                          contaCarencia = false;
                          valida = false;
                          contaTempo = false;
                        } else {
                          contaCarencia = false;
                          valida = false;
                        }
                      } else {
                        if (paymentDate <= fatalLimit) {
                          contaCarencia = true;
                          valida = true;
                        } else {
                          contaCarencia = false;
                          valida = false;
                          contaTempo = false;
                          carenciaDestravada = false;
                        }
                      }
                    }
                  }
                }

                period.__carenciaDestravada = carenciaDestravada;
                period.__contaTempo = contaTempo;

                const analysisTextParts: string[] = [];
                analysisTextParts.push(
                  pagamentoEmDia ? 'Pagamento em dia' : 'Pagamento em atraso',
                );
                analysisTextParts.push(
                  contaCarencia
                    ? 'Conta para carência'
                    : 'Não conta para carência',
                );
                analysisTextParts.push(
                  valida ? 'Competência válida' : 'Competência inválida',
                );
                analysisTextParts.push(
                  contribuicaoEmDia
                    ? 'Contribuição considerada em dia'
                    : 'Contribuição não considerada em dia',
                );
                analysisTextParts.push(
                  contaTempo
                    ? 'Conta para tempo de contribuição'
                    : 'Não conta para tempo de contribuição',
                );

                const analysisText = analysisTextParts.join('. ') + '.';

                const earningEntity =
                  new GeneralUrbanRetirementReviewEarningsHistoryEntity({
                    competence: e.competencia ?? null,
                    remuneration: e.remuneracao ?? null,
                    indicators: e.indicadores ?? null,
                    paymentDate: e.dataPgto ?? null,
                    contribution: e.contribuicao ?? null,
                    contributionSalary: e.salarioContribuicao ?? null,
                    generalUrbanRetirementReview:
                      updatedGeneralUrbanRetirementReview,
                    generalUrbanRetirementReviewPeriod: period,
                    competenceBelowTheMinimum: competenceBelowTheMinimumSalary,
                    analysis: analysisText,
                  });
                earningHistories.push(earningEntity);
              });
            }

            return period;
          })
        : [];

    await this.createOnDatabase(
      generalUrbanRetirementReview.id,
      updatedGeneralUrbanRetirementReview,
      consumeCreditTransaction,
      periods,
      earningHistories,
    );

    return CreateGeneralUrbanRetirementReviewCnisResponseDto.build({
      generalUrbanRetirementReviewId: generalUrbanRetirementReview.id,
    });
  }

  private async createOnDatabase(
    id: GeneralUrbanRetirementReviewId,
    generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity,
    consumeCreditTransaction: TransactionType,
    generalUrbanRetirementReviewPeriod?: GeneralUrbanRetirementReviewPeriodEntity[],
    earningHistories?: GeneralUrbanRetirementReviewEarningsHistoryEntity[],
  ): Promise<void> {
    const generalUrbanRetirementReviewPeriodTransaction =
      generalUrbanRetirementReviewPeriod?.map((value) => {
        return this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.createGeneralUrbanRetirementReviewPeriod(
          value,
        );
      }) ?? [];
    const generalUrbanRetirementReviewTransaction =
      this.generalUrbanRetirementReviewCommandRepositoryGateway.updateGeneralUrbanRetirementReview(
        id,
        generalUrbanRetirementReview,
      );

    const earningHistoriesTransaction =
      earningHistories?.map((value) => {
        return this.generalUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway.createGeneralUrbanRetirementReviewEarningsHistory(
          value,
        );
      }) ?? [];

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...generalUrbanRetirementReviewPeriodTransaction,
      ...earningHistoriesTransaction,
      consumeCreditTransaction,
      generalUrbanRetirementReviewTransaction,
    ]);

    await transactions.commit();
  }

  private parseRemunerationString(input?: string): number | null {
    if (input === undefined) {
      return null;
    }
    const raw = input.trim();
    if (!raw) {
      return null;
    }

    let s = raw.replace(/[^\d.,-]/g, '').replace(/\s+/g, '');

    const hasComma = s.includes(',');
    const hasDot = s.includes('.');

    const THOUSANDS_GROUP_LENGTH = 3;

    if (hasComma && hasDot) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (hasComma) {
      s = s.replace(',', '.');
    } else if (hasDot) {
      const parts = s.split('.');

      if (!parts.length) {
        return null;
      }

      const lastPart = parts[parts.length - 1];
      if (
        parts.length > 2 ||
        (typeof lastPart === 'string' &&
          lastPart.length === THOUSANDS_GROUP_LENGTH)
      ) {
        s = s.replace(/\./g, '');
      }
    }

    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  private calcularDataVencimento(month: number, year: number): Date {
    const DAY_15 = 15;
    const MONTHS_IN_YEAR = 12;
    let mesVencimento = month + 1;
    let anoVencimento = year;
    if (mesVencimento > MONTHS_IN_YEAR) {
      mesVencimento = 1;
      anoVencimento++;
    }
    const dataBase = new Date(anoVencimento, mesVencimento - 1, DAY_15);
    return this.nextBusinessDay(dataBase);
  }

  private nextBusinessDay(data: Date): Date {
    const novaData = new Date(data);
    while (!this.isDayUtil(novaData)) {
      novaData.setDate(novaData.getDate() + 1);
    }
    return novaData;
  }

  private isDayUtil(data: Date): boolean {
    const DAY_WEEKEND_SATURDAY = 6;
    const DAY_WEEKEND_SUNDAY = 0;
    const FERIADOS_NACIONAIS = [
      '01/01', // Ano Novo
      '21/04', // Tiradentes
      '01/05', // Dia do Trabalho
      '07/09', // Independência
      '12/10', // Nossa Senhora Aparecida
      '02/11', // Finados
      '15/11', // Proclamação da República
      '20/11', // Consciência Negra
      '25/12', // Natal
    ];

    const diaSemana = data.getDay();
    if (
      diaSemana === DAY_WEEKEND_SUNDAY ||
      diaSemana === DAY_WEEKEND_SATURDAY
    ) {
      return false;
    }

    const diaFormatado = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    if (FERIADOS_NACIONAIS.includes(diaFormatado)) {
      return false;
    }

    return true;
  }

  private checkPaymentOnTime(paymentDate: Date, dueDate: Date): boolean {
    const pag = new Date(
      paymentDate.getFullYear(),
      paymentDate.getMonth(),
      paymentDate.getDate(),
    );
    const venc = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate(),
    );
    return pag <= venc;
  }

  private calcularLimiteFatal(dataBase: Date, mesesPeriodoGraca: number): Date {
    const fimPeriodoGraca = new Date(
      dataBase.getFullYear(),
      dataBase.getMonth() + mesesPeriodoGraca,
      1,
    );

    const DAY_16 = 16;

    return new Date(
      fimPeriodoGraca.getFullYear(),
      fimPeriodoGraca.getMonth() + 1,
      DAY_16,
    );
  }
}
