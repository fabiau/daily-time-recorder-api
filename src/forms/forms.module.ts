import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalystsModule } from "./analysts/analysts.module";

@Module({
  imports: [AnalystsModule],
})
export class FormsModule {

}