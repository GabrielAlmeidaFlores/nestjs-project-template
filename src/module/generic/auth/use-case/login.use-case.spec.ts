import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';
import { LoginRequestDto } from '@module/generic/auth/dto/request/login.request.dto';
import { LoginResponseDto } from '@module/generic/auth/dto/response/login.response.dto';
import { InvalidLoginCredentialsError } from '@module/generic/auth/error/invalid-login-credentials.error';
import { LoginUseCase } from '@module/generic/auth/use-case/login.use-case';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/node.application-variable';

import type { FastifyReply } from 'fastify';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  let customerQueryRepositoryGateway: {
    findCustomerByEmailOrFederalDocument: jest.MockedFunction<
      CustomerQueryRepositoryGateway['findCustomerByEmailOrFederalDocument']
    >;
    findCustomerByEmail: jest.MockedFunction<
      CustomerQueryRepositoryGateway['findCustomerByEmail']
    >;
  };

  let userSessionGateway: {
    createCustomerSession: jest.MockedFunction<
      UserSessionGateway['createCustomerSession']
    >;
  };

  let reply: {
    setCookie: jest.MockedFunction<FastifyReply['setCookie']>;
  };

  const makeCustomer = (password: Hash): CustomerEntity =>
    new CustomerEntity({
      id: Guid.generate(),
      name: 'John Doe',
      email: new Email('test@example.com'),
      federalDocument: new FederalDocument('12345678900'),
      phoneNumber: new PhoneNumber('5511999999999'),
      password,
      bankExternalId: 'bank-id-123',
      profilePicture: null,
      mfaSecret: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  beforeEach(async () => {
    customerQueryRepositoryGateway = {
      findCustomerByEmail: jest.fn(),
      findCustomerByEmailOrFederalDocument: jest.fn(),
    };

    userSessionGateway = {
      createCustomerSession: jest.fn(),
    };

    reply = {
      setCookie: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: UserSessionGateway,
          useValue: userSessionGateway,
        },
      ],
    }).compile();

    useCase = module.get(LoginUseCase);
  });

  it('should throw InvalidLoginCredentialsError if no identifier is provided', async () => {
    const dto = LoginRequestDto.build({ password: 'password' });

    await expect(
      useCase.execute(reply as unknown as FastifyReply, dto),
    ).rejects.toThrow(InvalidLoginCredentialsError);
  });

  it('should throw InvalidLoginCredentialsError if user is not found', async () => {
    const dto = LoginRequestDto.build({
      email: new Email('test@example.com'),
      password: 'password',
    });

    customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument.mockResolvedValue(
      null,
    );

    await expect(
      useCase.execute(reply as unknown as FastifyReply, dto),
    ).rejects.toThrow(InvalidLoginCredentialsError);

    expect(
      customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument,
    ).toHaveBeenCalledWith(dto.email);
  });

  it('should throw InvalidLoginCredentialsError if password is incorrect', async () => {
    const dto = LoginRequestDto.build({
      email: new Email('test@example.com'),
      password: 'wrong-password',
    });

    const user = makeCustomer(new Hash('hashed-password'));

    customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument.mockResolvedValue(
      user,
    );
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

    await expect(
      useCase.execute(reply as unknown as FastifyReply, dto),
    ).rejects.toThrow(InvalidLoginCredentialsError);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      dto.password,
      user.password.toString(),
    );
  });

  it('should authenticate and return LoginResponseDto on success', async () => {
    const dto = LoginRequestDto.build({
      email: new Email('test@example.com'),
      password: 'correct-password',
    });

    const user = makeCustomer(new Hash('hashed-password'));

    customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument.mockResolvedValue(
      user,
    );
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    const session = Guid.generate().toString();
    userSessionGateway.createCustomerSession.mockResolvedValue(session);

    const result = await useCase.execute(reply as unknown as FastifyReply, dto);

    expect(result).toBeInstanceOf(LoginResponseDto);
    expect(result.authenticated).toBe(true);

    expect(reply.setCookie).toHaveBeenCalledWith('auth_token', session, {
      httpOnly: true,
      secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
      sameSite: 'lax',
      path: '/',
      maxAge: 604800,
    });
  });
});
