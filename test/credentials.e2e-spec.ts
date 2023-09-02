
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2EUtils } from './utils/e2e-utils';
import { AuthDto } from '../src/auth/dto/authuser.dto';
import { UserFactory } from './factories/user.factory';
import { CreateCredentialDto } from '../src/credentials/dto/create-credential.dto';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('Credentials E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let jwt:JwtService=new JwtService({secret:process.env.JWT_SECRET})

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();

    await E2EUtils.cleanDb(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  })

  it('POST /credentials => should create a note', async () => {
    const user=await new UserFactory(prisma)
      .withEmail("lorenzobaumgratz9@yahoo.com.br")
      .withSenha("s3nh@F4rte")
      .persist()
      
      const authDto: CreateUserDto = new CreateUserDto({
        email:"lorenzobaumgratz9@yahoo.com.br",
        senha:"s3nh@F4rte"
      });

    const token=await E2EUtils.generateToken(jwt,user)

    const creadentialDto: CreateCredentialDto = new CreateCredentialDto({
      url:faker.internet.url(),
      rotulo:"isso",
      senha:"s3nh@F4rte",
      username:"loren"
    });

    await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization',`Bearer ${token}`)
      .send(creadentialDto)
      .expect(HttpStatus.CREATED)

    const credential = await prisma.credential.findMany();
    expect(credential).toHaveLength(1);
    expect(credential[0]).toEqual({
      id: expect.any(Number),
      url:expect.any(String),
      rotulo:"isso",
      senha:expect.any(String),
      username:"loren",
      userId:expect.any(Number)
    })
  });

  it('GET /credentials', async () => {
    
  });

  it('GET /credentials/:id', async () => {
    
  });

  it('DELETE /credentials/:id', async () => {
    
  });
});