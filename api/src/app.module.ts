import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './Usuario/usuario.module';
import { DadosUsuarioModule } from './Dados-Usuario/dados-usuario.module';
import { AuthModule } from './auth/auth.module';
import { EnderecoUsuarioModule } from './endereco-usuario/endereco-usuario.module';
import { CatadorModule } from './catador/catador.module';
import { DadosCatadorModule } from './dados-catador/dados-catador.module';
import { VeiculoCatadorModule } from './veiculo-catador/veiculo-catador.module';
import { TipoLixoModule } from './tipo-lixo/tipo-lixo.module';
import { PedidoModule } from './pedido/pedido.module';
import { ItemPedidoModule } from './item-pedido/item-pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // só para dev
    }),
    UsuarioModule,
    DadosUsuarioModule,
    AuthModule,
    EnderecoUsuarioModule,
    CatadorModule,
    DadosCatadorModule,
    VeiculoCatadorModule,
    TipoLixoModule,
    PedidoModule,
    ItemPedidoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
