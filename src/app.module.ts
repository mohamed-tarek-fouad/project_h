import { PagesModule } from "./pages/pages.module";
import { RouterModule } from "./Router/router.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./jwtAuthGuard";
@Module({
  imports: [PagesModule, RouterModule, AuthModule, UsersModule],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
