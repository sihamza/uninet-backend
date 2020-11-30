import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private PostModel: Model<Post>){
        //this.PostModel.collection.drop();
    }

    async create(user,text) {
        const post = new this.PostModel({ text: text })
        /*post.user*/
        post.text = text 
        return await post.save() 
    }

    async update(id,text) {
        const post = await this.PostModel.findById(id)
        post.text = text 
        return await post.save()
    }

}
