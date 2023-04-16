import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/Post.entity';
import { LikeEntity } from '../database/Like.entity';
import { CommentEntity } from '../database/Comment.entity';
import { UserEntity } from '../database/User.entity';
import { AddPostDto } from './dtos/addPost.dto';
import { EditPostDto } from './dtos/EditPost.dto';
import fs from 'fs';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,

    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,

    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllPost() {
    const allPosts = await this.postRepository.find({});
    return { posts: allPosts };
  }

  async addPost(post: AddPostDto) {
    const { userId, ...postDetail } = post;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return this.postRepository.save({ ...postDetail, user });
  }

  async deletePost({ postId }: { postId: number }) {
    await this.postRepository.delete(postId);
    return {
      message: `delete post ${postId} successfully`,
    };
  }

  async editPost({ postInfo, id }: { postInfo: EditPostDto; id: number }) {
    if (postInfo.picturePath) {
      const currentPost = await this.postRepository.findOne({ where: { id } });
      if (currentPost.picturePath) {
        fs.unlinkSync(`/${currentPost.picturePath}`);
      }
    }

    await this.postRepository.update(id, postInfo);
    return { message: 'update post success !' };
  }
}
