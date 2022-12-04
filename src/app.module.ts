import { SpecialitiesModule } from "./specialities/specialities.module";
import { BookingModule } from "./bookings/booking.module";
import { VotesModule } from "./votes/votes.module";
import { PagesModule } from "./pages/pages.module";
import { RouterModule } from "./Router/router.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./jwtAuthGuard";
import { BullModule } from "@nestjs/bull";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Module({
  imports: [
    SpecialitiesModule,
    BookingModule,
    VotesModule,
    PagesModule,
    RouterModule,
    AuthModule,
    UsersModule,
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
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
  ],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
