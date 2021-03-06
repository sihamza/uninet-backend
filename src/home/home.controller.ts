import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { PostService } from 'src/post/post.service';
import { HomeService } from './home.service';
import storage from 'src/storageOptions';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('home')
export class HomeController {

    constructor(private homeService: HomeService,private postService: PostService, private userService: UserService){}

    @Get('/:id')
    async index(@Param("id") id ) {
        return await this.homeService.geTimeline(id)
    }

    //Admin Guard
    @Post('/admin/post')
    @UseInterceptors(FilesInterceptor('media', 1 , { storage: storage }))
    async adminPost(@Param("id") id , @Body('content') content , @UploadedFiles() media , @Req() req ) {
        const user = await this.userService.findOne(req.user.id)
        const userObj = this.userService.getUser(user.id)
        return await this.homeService.PostToTimeline( 1 , await this.postService.create(userObj,content))
    }

    @Post('/general/post')
    @UseInterceptors(FilesInterceptor('media', 1 , { storage: storage }))
    async GenralPost(@Param("id") id , @Body('content') content , @UploadedFiles() media , @Req() req ) {
        const user = await this.userService.getInformations(req.user.id)
        const userObj = await this.userService.getUser(user.id)
        return await this.homeService.PostToTimeline( 2 , await this.postService.create(userObj,content) , user.profile.feed )
    }

}
