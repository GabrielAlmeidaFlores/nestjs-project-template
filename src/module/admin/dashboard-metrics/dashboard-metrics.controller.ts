import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CurrentYearAnalysesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-count.response.dto';
import { CurrentYearAnalysesMonthCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-analyses-monthly-count.response.dto';
import { CurrentYearLegalPleadingMonthCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleading-monthly-count.response.dto';
import { CurrentYearLegalPleadingsCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-legal-pleadings-count.response.dto';
import { CurrentYearRevenueResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-revenue.response.dto';
import { CurrentYearUsersCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-users-count.response.dto';
import { ListCurrentYearAnalysesResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-current-year-analyses.response.dto';
import { ListCurrentYearLegalPleadingsResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-current-year-legal-pleadings.response.dto';
import { ListUsersResponseDto } from '@module/admin/dashboard-metrics/dto/response/list-users.response.dto';
import { PaymentPlanSalesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/payment-plan-sales-count.response.dto';
import { TotalSubscribersCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/total-subscribers-count.response.dto';
import { GetCurrentYearAnalysesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-analyses-count.use-case';
import { GetCurrentYearAnalysisMonthlyCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-analyses-monthly-count.use-case';
import { GetCurrentYearLegalPleadingsCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-legal-pleadings-count.use-case';
import { GetCurrentYearLegalPleadingMonthlyCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-legal-pleadings-monthly-count.use-case';
import { GetCurrentYearRevenueUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-revenue.use-case';
import { GetCurrentYearUsersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-current-year-users-count.use-case';
import { GetPaymentPlanSalesCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-payment-plan-sales-count.use-case';
import { GetTotalSubscribersCountUseCase } from '@module/admin/dashboard-metrics/use-case/get-total-subscribers-count.use-case';
import { ListAllUsersUseCase } from '@module/admin/dashboard-metrics/use-case/list-all-users.use-case';
import { ListCurrentYearAnalysesUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-analyses.use-case';
import { ListCurrentYearLegalPleadingsUseCase } from '@module/admin/dashboard-metrics/use-case/list-current-year-legal-pleadings.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('dashboard-metrics')
export class DashboardMetricsController {
  protected readonly _type = DashboardMetricsController.name;

  public constructor(
    private readonly getTotalSubscribersCountUseCase: GetTotalSubscribersCountUseCase,
    private readonly getCurrentYearRevenueUseCase: GetCurrentYearRevenueUseCase,
    private readonly getCurrentYearUsersCountUseCase: GetCurrentYearUsersCountUseCase,
    private readonly getPaymentPlanSalesCountUseCase: GetPaymentPlanSalesCountUseCase,
    private readonly getCurrentYearLegalPleadingsCountUseCase: GetCurrentYearLegalPleadingsCountUseCase,
    private readonly listCurrentYearLegalPleadingsUseCase: ListCurrentYearLegalPleadingsUseCase,
    private readonly getCurrentYearAnalysesCountUseCase: GetCurrentYearAnalysesCountUseCase,
    private readonly listCurrentYearAnalysesUseCase: ListCurrentYearAnalysesUseCase,
    private readonly listAllUsersUseCase: ListAllUsersUseCase,
    private readonly getCurrentYearAnalysisMonthlyCountUseCase: GetCurrentYearAnalysisMonthlyCountUseCase,
    private readonly getCurrentYearLegalPleadingMonthlyCountUseCase: GetCurrentYearLegalPleadingMonthlyCountUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Obter total de assinantes ativos',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'subscribers/count',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Total de assinantes ativos obtido com sucesso.',
      type: TotalSubscribersCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getTotalSubscribersCount(): Promise<TotalSubscribersCountResponseDto> {
    return this.getTotalSubscribersCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Obter receita do ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'revenue/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Receita do ano atual obtida com sucesso.',
      type: CurrentYearRevenueResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearRevenue(): Promise<CurrentYearRevenueResponseDto> {
    return this.getCurrentYearRevenueUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Obter número de usuários cadastrados no ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'users/count/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Número de usuários do ano atual obtido com sucesso.',
      type: CurrentYearUsersCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearUsersCount(): Promise<CurrentYearUsersCountResponseDto> {
    return this.getCurrentYearUsersCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Obter quantidade de vendas por plano ativo',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'plans/sales-count',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Quantidade de vendas por plano obtida com sucesso.',
      type: PaymentPlanSalesCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getPaymentPlanSalesCount(): Promise<PaymentPlanSalesCountResponseDto> {
    return this.getPaymentPlanSalesCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Obter número total de peças processuais geradas no ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'legal-pleadings/count/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Número total de peças processuais do ano atual obtido com sucesso.',
      type: CurrentYearLegalPleadingsCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearLegalPleadingsCount(): Promise<CurrentYearLegalPleadingsCountResponseDto> {
    return this.getCurrentYearLegalPleadingsCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Listar peças processuais geradas no ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'legal-pleadings/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Lista de peças processuais do ano atual obtida com sucesso.',
      type: ListCurrentYearLegalPleadingsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCurrentYearLegalPleadings(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCurrentYearLegalPleadingsResponseDto> {
    return this.listCurrentYearLegalPleadingsUseCase.execute(
      new ListDataInputModel(dto),
    );
  }

  @BuildEndpointSpecification({
    summary:
      'Obter quantidade de peças processuais geradas no mês durante o ano.',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'legal-pleadings/count/monthly',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Quantidade de peças processuais geradas no mês durante o ano.',
      type: CurrentYearLegalPleadingMonthCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearnLegalPleadingMonthlyCount(): Promise<CurrentYearLegalPleadingMonthCountResponseDto> {
    return this.getCurrentYearLegalPleadingMonthlyCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Obter número total de análises geradas no ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'analyses/count/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Número total de análises do ano atual obtido com sucesso.',
      type: CurrentYearAnalysesCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearAnalysesCount(): Promise<CurrentYearAnalysesCountResponseDto> {
    return this.getCurrentYearAnalysesCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Listar análises geradas no ano atual',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'analyses/current-year',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de análises do ano atual obtida com sucesso.',
      type: ListCurrentYearAnalysesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCurrentYearAnalyses(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCurrentYearAnalysesResponseDto> {
    return this.listCurrentYearAnalysesUseCase.execute(
      new ListDataInputModel(dto),
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter quantidade de analises geradas no mês durante o ano.',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'analyses/count/monthly',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Quantidade de analises geradas no mês durante o ano.',
      type: CurrentYearAnalysesMonthCountResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getCurrentYearnAnalysesMonthlyCount(): Promise<CurrentYearAnalysesMonthCountResponseDto> {
    return this.getCurrentYearAnalysisMonthlyCountUseCase.execute();
  }

  @BuildEndpointSpecification({
    summary: 'Listar todos os usuários cadastrados',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'users',
      method: RequestMethod.GET,
    },
    tag: ['dashboard-admin'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de usuários obtida com sucesso.',
      type: ListUsersResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAllUsers(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListUsersResponseDto> {
    return this.listAllUsersUseCase.execute(new ListDataInputModel(dto));
  }
}
