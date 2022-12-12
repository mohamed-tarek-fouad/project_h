import { SpecialitiesModule } from "./specialities/specialities.module";
import { BookingModule } from "./bookings/booking.module";
import { VotesModule } from "./votes/votes.module";
import { PagesModule } from "./pages/pages.module";
import { RouterModule } from "./Router/router.module";
import { AuthModule } from "./auth/auth.module";
import { Module, CacheModule } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./jwtAuthGuard";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as CacheStore from "cache-manager-ioredis";
@Module({
  imports: [
    SpecialitiesModule,
    BookingModule,
    VotesModule,
    PagesModule,
    RouterModule,
    AuthModule,
    UsersModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("EMAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("EMAIL_USER"),
            pass: config.get("EMAIL_PASSWORD"),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: CacheStore,
      host: "localhost",
      port: 6379,
      ttl: 60 * 60,
    }),
  ],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
