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
import { SharePostDto } from './dtos/SharePost.dto';
import { UserPostEntity } from '../database/UserPost.entity';
import { AddCommentDto } from './dtos/AddComment.dto';
import { paginate } from 'nestjs-typeorm-paginate';

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
    @InjectRepository(UserPostEntity)
    private userPostRepository: Repository<UserPostEntity>,
  ) {}

  async getAllPost(payload: { limit: number; page: number }) {
    const userPost = await this.userPostRepository.createQueryBuilder(
      'userPost',
    );

    await userPost
      .leftJoinAndSelect('userPost.user', 'user')
      .leftJoinAndSelect('userPost.post', 'post')
      .leftJoinAndSelect('userPost.tags', 'tags')
      .leftJoinAndSelect('userPost.likes', 'likes')
      .leftJoinAndSelect('likes.user', 'likeUser')
      .leftJoinAndSelect('likes.post', 'likePost')
      .leftJoin('userPost.comments', 'comments')
      .loadRelationCountAndMap('userPost.commentCount', 'userPost.comments')
      .leftJoinAndSelect('userPost.userRoot', 'userRoot')
      .orderBy('userPost.createdAt', 'DESC')
      .getMany();

    return paginate<UserPostEntity>(userPost, payload);
  }

  async getUserPost(userId: number, payload: { limit: number; page: number }) {
    const returnUserPost = await this.userPostRepository.createQueryBuilder(
      'userPost',
    );

    await returnUserPost
      .where('userPost.userId = :userId', { userId })
      .leftJoinAndSelect('userPost.user', 'user')
      .leftJoinAndSelect('userPost.post', 'post')
      .leftJoinAndSelect('userPost.tags', 'tags')
      .leftJoinAndSelect('userPost.likes', 'likes')
      .leftJoinAndSelect('likes.user', 'likeUser')
      .leftJoinAndSelect('likes.post', 'likePost')
      .leftJoin('userPost.comments', 'comments')
      .leftJoinAndSelect('userPost.userRoot', 'userRoot')
      .loadRelationCountAndMap('userPost.commentCount', 'userPost.comments')
      .orderBy('userPost.createdAt', 'DESC')
      .getMany();

    return paginate<UserPostEntity>(returnUserPost, payload);
  }

  async getPostDetail(postId: number) {
    const postDetail = await this.userPostRepository.findOne({
      where: { id: postId },
      relations: [
        'tags',
        'user',
        'post',
        'likes',
        'likes.user',
        'likes.post',
        'userRoot',
      ],
    });

    return { post: postDetail };
  }

  async addPost({ userId, tags, ...post }: AddPostParams) {
    tags = JSON.parse(tags as unknown as string);
    const newPost = await this.postRepository.save({
      ...post,
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newUserPost = await this.userPostRepository.save({
      user: user,
      post: newPost,
    });
    const allTags: any = [];
    await Promise.all(
      tags.map(async (tag) => {
        const newTag = await this.postTagRepository.save({
          post: { id: newPost.id },
          tag: { id: tag },
        });
        allTags.push(newTag);
      }),
    );
    const returnPost = await this.userPostRepository.findOne({
      where: { id: newUserPost.id },
      relations: ['tags', 'user', 'post', 'likes', 'likes.user', 'likes.post'],
    });

    // const tagsRes = await this.tagRepository
    //   .createQueryBuilder('tag')
    //   .innerJoin('post_tag', 'pt', 'tag.id = pt.tagId')
    //   .innerJoin('posts', 'p', 'p.id = pt.postId')
    //   .where('p.id = :postId', { postId: newPost.id })
    //   .getMany();
    //
    // const postRes = {
    //   ...returnPost,
    //   tags: tagsRes,
    // };

    return { post: returnPost };
  }

  async deletePost({ postId }: { postId: number }) {
    await this.userPostRepository.delete(postId);
    return {
      message: `delete post ${postId} successfully`,
    };
  }

  async editPost({ id, tags, pictureDelete, ...postInfo }: EditPostParams) {
    const currentPost = await this.postRepository.findOne({ where: { id } });
    if (postInfo.picturePath) {
      if (currentPost.picturePath) {
        fs.unlinkSync(`/${currentPost.picturePath}`);
      }
    }
    if (pictureDelete) {
      fs.unlinkSync(`/${pictureDelete}`);
    }

    // delete tags and add new tags
    if (tags) {
      await this.postTagRepository.delete({
        post: { id: currentPost.id },
      });
      await Promise.all(
        tags.map(async (tag) => {
          await this.postTagRepository.save({
            post: { id: currentPost.id },
            tag: { id: tag },
          });
        }),
      );
    }
    await this.postRepository.update(id, {
      picturePath: postInfo.picturePath,
      description: postInfo.description,
    });
    // await this.postRepository
    //   .createQueryBuilder('post')
    //   .update()
    //   .set({
    //     picturePath: postInfo.picturePath,
    //     description: postInfo.description,
    //     // ...postInfo,
    //   })
    //   .where('id = :id', { id })
    //   .execute();

    const postDetail = await this.userPostRepository.findOne({
      where: { id },
      relations: [
        'tags',
        'user',
        'post',
        'likes',
        'likes.user',
        'likes.post',
        'userRoot',
      ],
    });

    return { post: postDetail };
  }

  async sharePost({
    postInfo,
    userId,
  }: {
    postInfo: SharePostDto;
    userId: number;
  }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newSharedPost = await this.userPostRepository.save({
      post: { id: postInfo.postId },
      userRoot: { id: userId },
      sharedContent: postInfo.description,
      user: user,
    });
    const postDetail = await this.userPostRepository.findOne({
      where: { id: newSharedPost.id },
      relations: [
        'tags',
        'user',
        'post',
        'likes',
        'likes.user',
        'likes.post',
        'userRoot',
      ],
    });
    return { post: postDetail };
  }

  // comment service

  async addComment({
    comment,
    userId,
  }: {
    comment: AddCommentDto;
    userId: number;
  }) {
    const newComment = await this.commentRepository.save({
      post: { id: comment.postId },
      parentCommentId: comment.parentCommentId ? comment.parentCommentId : null,
      user: { id: userId },
      content: comment.content,
    });

    const returnedComment = await this.commentRepository.findOne({
      where: { id: newComment.id },
      relations: ['post', 'user'],
    });

    return { comment: returnedComment };
  }

  async getComment({
    postId,
    ...option
  }: {
    postId: number;
    page: number;
    limit: number;
  }) {
    // const allComment = await this.commentRepository.find({
    //   where: { post: { id: postId } },
    //   relations: ['post', 'user'],
    // });

    const allComment = this.commentRepository.createQueryBuilder('comment');

    allComment
      .where('comment.post = :postId', { postId })
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.user', 'user');

    return paginate<CommentEntity>(allComment, option);
  }

  async deleteComment({ commentId }: { commentId: number }) {
    return await this.commentRepository.delete({ id: commentId });
  }

  async editComment({
    commentId,
    content,
  }: {
    commentId: number;
    content: string;
  }) {
    return await this.commentRepository.update(commentId, { content });
  }

  // like service

  async likePost({ userId, postId }: { userId: number; postId: number }) {
    const isLiked = await this.likeRepository.findOne({
      where: { post: { id: postId } },
    });

    if (isLiked) {
      await this.likeRepository
        .createQueryBuilder('delete_like')
        .delete()
        .from(LikeEntity)
        .where('userId = :id', { id: userId })
        .where('postId = :id', { id: postId })
        .execute();
    } else {
      await this.likeRepository.save({
        post: { id: postId },
        user: { id: userId },
      });
    }
    const currentPost = await this.userPostRepository.findOne({
      where: { id: postId },
      relations: [
        'tags',
        'user',
        'post',
        'comments',
        'likes',
        'likes.user',
        'likes.post',
      ],
    });

    return { post: currentPost };
  }

  async getTags() {
    return await this.tagRepository.find({});
  }
}
