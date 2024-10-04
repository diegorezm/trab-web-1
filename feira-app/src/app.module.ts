import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {ProductsModule} from './products/products.module';
import {PrometheusModule} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), AuthModule, UsersModule, ProductsModule, PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true
      }
    })],
})
export class AppModule {}
