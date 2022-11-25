import { VotesModule } from "./votes/votes.module";
import { PagesModule } from "./pages/pages.module";
import { RouterModule } from "./Router/router.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./jwtAuthGuard";
import { BullModule } from "@nestjs/bull";
@Module({
  imports: [
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
  ],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
