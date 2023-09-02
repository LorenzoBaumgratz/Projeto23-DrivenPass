import { PrismaService } from "../../src/prisma/prisma.service";

export class CredentialFactory { 
  private rotulo: string;
  private url: string;
  private userId: number;
  private username: string;
  private senha: string;

  constructor(private readonly prisma: PrismaService) { }
  
  withRotulo(rotulo: string) {
    this.rotulo = rotulo;
    return this;
  }

  withUrl(url: string) {
    this.url = url;
    return this;
  }

  withUserId(userId: number) {
    this.userId = userId;
    return this;
  }

  withUsername(username: string) {
    this.username = username;
    return this;
  }

  withSenha(senha: string) {
    this.senha = senha;
    return this;
  }

  build() {
    return {
      rotulo: this.rotulo,
      url: this.url,
      userId:this.userId,
      username:this.username,
      senha:this.senha
    }
  }

  async persist() {
    const credentials = this.build();
    return await this.prisma.credential.create({
      data: credentials
    })
  }

}