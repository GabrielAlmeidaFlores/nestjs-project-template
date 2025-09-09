import { Test, type TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { UserTempDataGateway } from '@lib/user-temp-data/user-temp-data.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id.value-object';
import { CustomerSignInRequestDto } from '@module/customer/account/dto/request/customer-sign-in.request.dto';
import { CustomerSignInResponseDto } from '@module/customer/account/dto/response/customer-sign-in.response.dto';
import { MissingCustomerIdentifierError } from '@module/customer/account/error/missing-customer-identifier.error';
import { WrongSignInCredentialsError } from '@module/customer/account/error/wrong-sign-in-credentials.error';
import { CustomerSignInUseCase } from '@module/customer/account/use-case/customer-sign-in.use-case';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { UserSessionJwtOutputModel } from '@lib/user-temp-data/model/output/user-session-jwt.output.model';
import type { FastifyReply } from 'fastify';

jest.mock('bcrypt');

const mockCompareSync = bcrypt.compareSync as unknown as jest.MockedFunction<
  typeof bcrypt.compareSync
>;

const createQueryGatewayMock =
  (): jest.Mocked<CustomerQueryRepositoryGateway> => ({
    findCustomerById: jest.fn(),
    findCustomerByEmail: jest.fn(),
    findCustomersByEmailOrFederalDocument: jest.fn<
      Promise<GetCustomerQueryResult[]>,
      [Email | FederalDocument]
    >(),
  });

const createUserSessionGatewayMock = (): jest.Mocked<UserTempDataGateway> => ({
  createCustomerSession: jest.fn<Promise<string>, [CustomerId]>(),
  getCustomerSession: jest.fn<Promise<CustomerId | null>, [CustomerId]>(),
  verifySession: jest.fn<UserSessionJwtOutputModel | null, [string]>(),
});

const makeDtoByEmail = (email: Email): CustomerSignInRequestDto =>
  CustomerSignInRequestDto.build({
    email,
    password: 'strongPassword123',
  });

const makeDtoByFederal = (
  federalDocument: FederalDocument,
): CustomerSignInRequestDto =>
  CustomerSignInRequestDto.build({
    federalDocument,
    password: 'strongPassword123',
  });

const makeDtoWithoutIdentifier = (): CustomerSignInRequestDto =>
  CustomerSignInRequestDto.build({
    password: 'strongPassword123',
  });

const buildCustomerResult = (params: {
  id?: CustomerId;
  name: string;
  email: Email;
  federalDocument: FederalDocument;
  phoneNumber?: PhoneNumber;
  hash: string;
}): GetCustomerQueryResult =>
  GetCustomerQueryResult.build({
    id: params.id ?? new CustomerId(),
    name: params.name,
    email: params.email,
    federalDocument: params.federalDocument,
    phoneNumber: params.phoneNumber ?? new PhoneNumber('5511999999999'),
    password: new Hash(params.hash),
    profilePicture: null,
    mfaSecret: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

describe('CustomerSignInUseCase', () => {
  let useCase: CustomerSignInUseCase;

  let mockCustomerQueryRepository: jest.Mocked<CustomerQueryRepositoryGateway>;
  let mockUserSessionGateway: jest.Mocked<UserTempDataGateway>;
  let reply: FastifyReply;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerSignInUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: createQueryGatewayMock(),
        },
        {
          provide: UserTempDataGateway,
          useValue: createUserSessionGatewayMock(),
        },
      ],
    }).compile();

    useCase = module.get(CustomerSignInUseCase);
    mockCustomerQueryRepository = module.get(CustomerQueryRepositoryGateway);
    mockUserSessionGateway = module.get(UserTempDataGateway);

    reply = { setCookie: jest.fn() } as unknown as FastifyReply;

    jest.clearAllMocks();
  });

  it('should throw MissingCustomerIdentifierError if no identifier is provided', async () => {
    const dto = makeDtoWithoutIdentifier();

    await expect(useCase.execute(reply, dto)).rejects.toThrow(
      MissingCustomerIdentifierError,
    );
    expect(
      mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument,
    ).not.toHaveBeenCalled();
    expect(mockUserSessionGateway.createCustomerSession).not.toHaveBeenCalled();
    expect(reply.setCookie).not.toHaveBeenCalled();
  });

  it('should throw WrongSignInCredentialsError if no customer matches the password', async () => {
    const email = new Email('john.doe@example.com');
    const dto = makeDtoByEmail(email);

    const customers: GetCustomerQueryResult[] = [
      buildCustomerResult({
        name: 'John A',
        email,
        federalDocument: new FederalDocument('11122233344'),
        hash: 'hash-a',
      }),
      buildCustomerResult({
        name: 'John B',
        email,
        federalDocument: new FederalDocument('55566677788'),
        hash: 'hash-b',
      }),
    ];

    mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument.mockResolvedValue(
      customers,
    );

    mockCompareSync.mockReturnValue(false);

    await expect(useCase.execute(reply, dto)).rejects.toThrow(
      WrongSignInCredentialsError,
    );

    expect(
      mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(email);
    expect(mockUserSessionGateway.createCustomerSession).not.toHaveBeenCalled();
    expect(reply.setCookie).not.toHaveBeenCalled();
  });

  it('should sign in by email when one of the customers matches the password', async () => {
    const email = new Email('john.doe@example.com');
    const dto = makeDtoByEmail(email);

    const idGood = new CustomerId();
    const customers: GetCustomerQueryResult[] = [
      buildCustomerResult({
        name: 'John Wrong',
        email,
        federalDocument: new FederalDocument('11122233344'),
        hash: 'hash-wrong',
      }),
      buildCustomerResult({
        id: idGood,
        name: 'John Right',
        email,
        federalDocument: new FederalDocument('97156839024'),
        hash: 'hash-right',
      }),
    ];

    mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument.mockResolvedValue(
      customers,
    );

    mockCompareSync.mockReturnValueOnce(false).mockReturnValueOnce(true);

    const sessionToken = 'mock-session-token';
    mockUserSessionGateway.createCustomerSession.mockResolvedValue(
      sessionToken,
    );

    const result = await useCase.execute(reply, dto);

    expect(
      mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(email);
    expect(mockUserSessionGateway.createCustomerSession).toHaveBeenCalledWith(
      idGood,
    );

    expect(reply.setCookie).toHaveBeenCalledWith(
      'auth_token',
      sessionToken.toString(),
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      }),
    );

    expect(result).toBeInstanceOf(CustomerSignInResponseDto);
    expect(result.userLevel).toBe(UserLevelEnum.CUSTOMER);
  });

  it('should sign in by federal document when one of the customers matches the password', async () => {
    const federal = new FederalDocument('21702426090');
    const dto = makeDtoByFederal(federal);

    const idGood = new CustomerId();
    const customers: GetCustomerQueryResult[] = [
      buildCustomerResult({
        name: 'Jane Wrong',
        email: new Email('jane.wrong@example.com'),
        federalDocument: federal,
        hash: 'hash-wrong',
      }),
      buildCustomerResult({
        id: idGood,
        name: 'Jane Right',
        email: new Email('jane.right@example.com'),
        federalDocument: federal,
        hash: 'hash-right',
      }),
    ];

    mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument.mockResolvedValue(
      customers,
    );

    mockCompareSync.mockReturnValueOnce(false).mockReturnValueOnce(true);

    const sessionToken = 'mock-session-token-2';
    mockUserSessionGateway.createCustomerSession.mockResolvedValue(
      sessionToken,
    );

    const result = await useCase.execute(reply, dto);

    expect(
      mockCustomerQueryRepository.findCustomersByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(federal);
    expect(mockUserSessionGateway.createCustomerSession).toHaveBeenCalledWith(
      idGood,
    );
    expect(reply.setCookie).toHaveBeenCalled();

    expect(result).toBeInstanceOf(CustomerSignInResponseDto);
    expect(result.userLevel).toBe(UserLevelEnum.CUSTOMER);
  });
});
