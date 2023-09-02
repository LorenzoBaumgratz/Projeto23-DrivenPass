
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { E2EUtils } from './utils/e2e-utils';

describe('Notes E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

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

  it('POST /notes => should create a note', async () => {
    // const mediaDto: CreateMediaDto = new CreateMediaDto({
    //   title: "Facebook",
    //   username: "test@test.com.br"
    // });

    // await request(app.getHttpServer())
    //   .post('/medias')
    //   .send(mediaDto)
    //   .expect(HttpStatus.CREATED)

    // const medias = await prisma.media.findMany();
    // expect(medias).toHaveLength(1);
    // const media = medias[0];
    // expect(media).toEqual({
    //   id: expect.any(Number),
    //   title: mediaDto.title,
    //   username: mediaDto.username
    // })
  });

  it('GET /notes', async () => {
    
  });

  it('GET /notes/:id', async () => {
    
  });

  it('DELETE /notes/:id', async () => {
    
  });
});
