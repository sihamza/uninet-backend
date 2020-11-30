import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from 'src/feed/feed.module';
import { FeedService } from 'src/feed/feed.service';
import { PostModule } from 'src/post/post.module';
import { HomeController } from './home.controller';
import { Home, HomeSchema } from './home.schema';
import { HomeService } from './home.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),FeedModule,PostModule],
  exports: [HomeService],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}