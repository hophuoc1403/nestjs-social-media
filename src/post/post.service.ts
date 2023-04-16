import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/Post.entity';
import { LikeEntity } from '../database/Like.entity';
import { CommentEntity } from '../database/Comment.entity';
import { UserEntity } from '../database/User.entity';
import fs from 'fs';
import { AddPostParams, EditPostParams } from './@types/post.params';
import { PostTagEntity } from '../database/PostTag.entity';
import { TagEntity } from '../database/Tag.entity';

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
    @InjectRepository(PostTagEntity)
    private postTagRepository: Repository<PostTagEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async getAllPost() {
    const allPosts = await this.postRepository.find({ relations: ['tags'] });
    return { posts: allPosts };
  }

  async addPost({ userId, tags, ...post }: AddPostParams) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newPost = await this.postRepository.save({ ...post, user });
    const allTags: any = [];
    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await this.postTagRepository.save({
          post: newPost.id,
          tag,
        });
        allTags.push(newTag);
      }),
    );

    const TagsOfPost = await this.tagRepository
      .createQueryBuilder('tag')
      .innerJoin('post_tag', 'pt', 'tag.id = pt.tag')
      .innerJoin('posts', 'p', 'p.id = pt.post')
      .where('p.id = :postId', { postId: newPost.id })
      .getMany();

    newPost.tags = TagsOfPost;

    return { post: newPost };
  }

  async deletePost({ postId }: { postId: number }) {
    await this.postRepository.delete(postId);
    return {
      message: `delete post ${postId} successfully`,
    };
  }

  async editPost({ id, tags, ...postInfo }: EditPostParams) {
    if (postInfo.picturePath) {
      const currentPost = await this.postRepository.findOne({ where: { id } });
      if (currentPost.picturePath) {
        fs.unlinkSync(`/${currentPost.picturePath}`);
      }
    }
    if (tags) {
    }
    await this.postRepository.update(id, { ...postInfo });
    return { message: 'update post success !' };
  }

  // async sharePost({});
}
