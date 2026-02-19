import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { GetRetirementPlanningRgpsDetailsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-details.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRetirementPlanningRgpsDetailsUseCase {
  protected readonly _type = GetRetirementPlanningRgpsDetailsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
  ): Promise<GetRetirementPlanningRgpsDetailsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const analysisRecord =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRgpsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRgpsNotFoundError,
      );

    const periods = retirementPlanningRgps.retirementPlanningRgpsPeriod;

    const periodWithoutPendencies =
      periods && Array.isArray(periods)
        ? periods.filter((period) => period.isPendency === false)
        : [];

    const {
      years: periodWithoutPendenciesYears,
      months: periodWithoutPendenciesMonths,
      days: periodWithoutPendenciesDays,
    } = this.totalWorkPeriod(periodWithoutPendencies);

    const periodWithoutPendenciesString = `${periodWithoutPendenciesYears} anos, ${periodWithoutPendenciesMonths} meses e ${periodWithoutPendenciesDays} dias`;

    const {
      years: periodTotalYears,
      months: periodTotalMonths,
      days: periodTotalDays,
    } = this.totalWorkPeriod(periods);

    const periodTotalString = `${periodTotalYears} anos, ${periodTotalMonths} meses e ${periodTotalDays} dias`;

    const MONTHS_IN_YEAR = 12;
    const DAYS_IN_MONTH = 30;

    const acceleratorTimes =
      await this.retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway.findByRetirementPlanningRgpsId(
        retirementPlanningRgpsId,
      );

    const {
      years: acceleratorYears,
      months: acceleratorMonths,
      days: acceleratorDays,
    } = this.totalWorkPeriod(acceleratorTimes);

    const totalPerioWithAcceleratorDays = periodTotalDays + acceleratorDays;
    const extraMonthsFromDays = Math.floor(
      totalPerioWithAcceleratorDays / DAYS_IN_MONTH,
    );
    const finalDays = totalPerioWithAcceleratorDays % DAYS_IN_MONTH;

    const totalPeriodWithAcceleratorMonths =
      periodTotalMonths + acceleratorMonths + extraMonthsFromDays;
    const extraYearsFromMonths = Math.floor(
      totalPeriodWithAcceleratorMonths / MONTHS_IN_YEAR,
    );
    const finalMonths = totalPeriodWithAcceleratorMonths % MONTHS_IN_YEAR;

    const finalYears =
      periodTotalYears + acceleratorYears + extraYearsFromMonths;

    const acceleratorTimeString = `${finalYears} anos, ${finalMonths} meses e ${finalDays} dias`;

    const carenciaTimeWithoutPendencyMonths = this.calculateCarenciaTotal(
      periodWithoutPendencies.map((period) => ({
        dataInicio: period.periodStart,
        dataFim: period.periodEnd,
      })),
    );

    const carenciaTimeWithoutPendencyMonthsString = `${carenciaTimeWithoutPendencyMonths} contribuições`;

    const carenciaTimeWithPendencyMonths = this.calculateCarenciaTotal(
      (periods ?? []).map((period) => ({
        dataInicio: period.periodStart,
        dataFim: period.periodEnd,
      })),
    );

    const carenciaTimeWithPendencyMonthsString = `${carenciaTimeWithPendencyMonths} contribuições`;

    const carenciaTimeWithAccelerationMonths = this.calculateCarenciaTotal(
      acceleratorTimes.map((period) => ({
        dataInicio: period.periodStart,
        dataFim: period.periodEnd,
      })),
    );

    const totalCarenciaTimeWithAccelerationMonthsString = `${carenciaTimeWithAccelerationMonths + carenciaTimeWithPendencyMonths} contribuições`;

    const searchPeriodo = periods;

    let category: string | null = '';

    const nonBenefitPeriods = (searchPeriodo ?? []).filter((p) => {
      const cat = (p.category ?? '').toString().trim();
      return cat.length > 0 && !/benef/i.test(cat);
    });

    if (nonBenefitPeriods.length > 0) {
      const lastNonBenefit = nonBenefitPeriods.reduce((prev, cur) => {
        const prevDate = prev?.periodEnd ?? prev?.periodStart;
        const curDate = cur.periodEnd ?? cur.periodStart;
        const prevTime = prevDate ? new Date(prevDate).getTime() : 0;
        const curTime = curDate ? new Date(curDate).getTime() : 0;
        return curTime > prevTime ? cur : prev;
      }, nonBenefitPeriods[0]);
      category = lastNonBenefit?.category ?? '';
    } else {
      category = '';
    }

    return GetRetirementPlanningRgpsDetailsResponseDto.build({
      id: retirementPlanningRgps.id,
      name:
        retirementPlanningRgps.retirementPlanningRgpsResult?.clientName ?? '',
      federalDocumentNumber:
        retirementPlanningRgps.retirementPlanningRgpsResult?.clientFederalDocument?.toString() ??
        '',
      birthdate:
        retirementPlanningRgps.retirementPlanningRgpsResult?.clientBirthDate ??
        new Date(),
      gender: analysisRecord.analysisToolClient.gender ?? null,
      email: analysisRecord.analysisToolClient.email ?? null,
      phoneNumber: analysisRecord.analysisToolClient.phoneNumber ?? null,
      type: analysisRecord.analysisToolClient.clientType,
      category,
      legalProceedingNumber:
        retirementPlanningRgps.retirementPlanningRgpsLegalProceeding?.map(
          (legalProceeding) => legalProceeding.legalProceedingNumber,
        ) ?? [],
      inssBenefitNumber:
        retirementPlanningRgps.retirementPlanningRgpsBenefit?.map(
          (benefit) => benefit.inssBenefitNumber,
        ) ?? [],
      contributionTimeWithoutPendency: periodWithoutPendenciesString,
      contributionTimeWithPendency: periodTotalString,
      contributionTimeWithAcceleration: acceleratorTimeString,
      carencyTimeWithoutPendency: carenciaTimeWithoutPendencyMonthsString,
      carencyTimeWithPendency: carenciaTimeWithPendencyMonthsString,
      carencyTimeWithAcceleration:
        totalCarenciaTimeWithAccelerationMonthsString,
      result: retirementPlanningRgps.retirementPlanningRgpsResult?.result ?? '',
    });
  }

  private totalWorkPeriod(
    periods:
      | GetRetirementPlanningRgpsTimeAcceleratorQueryResult[]
      | RetirementPlanningRgpsPeriodEntity[]
      | null,
  ): {
    years: number;
    months: number;
    days: number;
  } {
    let totalDays = 0;

    if (periods === null) {
      return {
        years: 0,
        months: 0,
        days: 0,
      };
    }

    periods.forEach((period) => {
      if (period.periodStart === null || period.periodEnd === null) {
        return;
      }

      const start = moment(period.periodStart);
      const end = moment(period.periodEnd);

      if (!start.isValid() || !end.isValid()) {
        return;
      }

      if (end.isBefore(start)) {
        return;
      }

      totalDays += end.diff(start, 'days');
    });

    const duration = moment.duration(totalDays, 'days');

    return {
      years: duration.years(),
      months: duration.months(),
      days: duration.days(),
    };
  }

  private calculateCarenciaTotal(
    periods: {
      dataInicio: Date | null;
      dataFim: Date | null;
    }[],
  ): number {
    const monthsAssigned = new Set<string>();

    for (const item of periods) {
      const startDate = this.toDate(item.dataInicio);
      const endDate = this.toDate(item.dataFim);

      if (!startDate || !endDate || startDate.getTime() > endDate.getTime()) {
        continue;
      }

      const current = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        1,
      );
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

      while (current <= end) {
        const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        monthsAssigned.add(monthKey);
        current.setMonth(current.getMonth() + 1);
      }
    }

    return monthsAssigned.size;
  }

  private toDate(value: Date | null | undefined): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
}
