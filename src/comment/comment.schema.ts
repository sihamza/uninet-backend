import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/post.schema';


@Schema({ timestamps: true  , strict: false })
export class Comment extends Document {
  @Prop()
  uid: number;

  @Prop({ any: {} })
  user: any ;

  @Prop()
  comment: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);