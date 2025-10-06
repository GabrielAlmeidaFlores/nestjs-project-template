import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(CreateAnalysisToolClientUseCase.name, () => {
  let useCase: CreateAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      createAnalysisToolClient: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientCommandRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<BaseTransactionRepositoryGateway>;

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildDto = (): CreateAnalysisToolClientRequestDto =>
    CreateAnalysisToolClientRequestDto.build({
      name: 'John Doe',
      email: null,
      birthDate: new Date('1990-01-01'),
      clientType: null,
      federalDocument: null,
      gender: null,
      phoneNumber: null,
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateAnalysisToolClientUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientCommandRepositoryGateway,
          useValue: analysisToolClientCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('should successfully create an analysis tool client', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const organizationMember = buildOrganizationMember();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientCommandRepositoryGateway.createAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(sessionData, orgSessionData, dto);

    expect(result).toBeInstanceOf(CreateAnalysisToolClientResponseDto);
    expect(result.analysisToolClientId).toBeDefined();

    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledTimes(1);
    expect(
      organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId,
    ).toHaveBeenCalledWith(
      sessionData.authIdentityId,
      orgSessionData.organizationId,
    );

    expect(
      analysisToolClientCommandRepositoryGateway.createAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    const [[capturedClient]] = analysisToolClientCommandRepositoryGateway
      .createAnalysisToolClient.mock.calls as [[AnalysisToolClientEntity]];
    expect(capturedClient).toBeInstanceOf(AnalysisToolClientEntity);
    expect(capturedClient.name).toBe(dto.name);
    expect(capturedClient.birthDate).toEqual(dto.birthDate);
    expect(capturedClient.createdBy).toBe(organizationMember.id);
    expect(capturedClient.updatedBy).toBe(organizationMember.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('throws OrganizationMemberNotFoundError when organization member is not found', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);

    expect(
      analysisToolClientCommandRepositoryGateway.createAnalysisToolClient,
    ).not.toHaveBeenCalled();
    expect(baseTransactionRepositoryGateway.execute).not.toHaveBeenCalled();
  });
});
