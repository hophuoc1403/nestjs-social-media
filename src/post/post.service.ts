// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { PostEntity } from '../database/Post.entity';
// import { LikeEntity } from '../database/Like.entity';
// import { CommentEntity } from '../database/Comment.entity';
// import { UserEntity } from '../database/User.entity';
// import fs from 'fs';
// import { AddPostParams, EditPostParams } from './@types/post.params';
// import { PostTagEntity } from '../database/PostTag.entity';
// import { TagEntity } from '../database/Tag.entity';
// import { SharePostDto } from './dtos/SharePost.dto';
// import { UserPostEntity } from '../database/UserPost.entity';
//
// @Injectable()
// export class PostService {
//   constructor(
//     @InjectRepository(PostEntity)
//     private postRepository: Repository<PostEntity>,
//
//     @InjectRepository(LikeEntity)
//     private likeRepository: Repository<LikeEntity>,
//
//     @InjectRepository(CommentEntity)
//     private commentRepository: Repository<CommentEntity>,
//     @InjectRepository(UserEntity)
//     private userRepository: Repository<UserEntity>,
//     @InjectRepository(PostTagEntity)
//     private postTagRepository: Repository<PostTagEntity>,
//     @InjectRepository(TagEntity)
//     private tagRepository: Repository<TagEntity>,
//     @InjectRepository(UserPostEntity)
//     private userPostRepository: Repository<UserPostEntity>,
//   ) {}
//
//   async getAllPost() {
//     const allPosts = await this.postRepository.find({ relations: ['tags'] });
//     return { posts: allPosts };
//   }
//
//   async addPost({ userId, tags, ...post }: AddPostParams) {
//     const newPost = await this.postRepository.save({ ...post });
//     const newUserPost = await this.userPostRepository.save({
//       post: newPost,
//       user: userId,
//     });
//     const returnPost = await this.userPostRepository.findOne({
//       where: { id: newUserPost.id },
//       relations: ['post', 'user', 'tags'],
//     });
//     const allTags: any = [];
//     await Promise.all(
//       tags.map(async (tag) => {
//         const newTag = await this.postTagRepository.save({
//           post: newPost.id,
//           tag,
//         });
//         allTags.push(newTag);
//       }),
//     );
//
//     const tagsRes = await this.tagRepository
//       .createQueryBuilder('tag')
//       .innerJoin('post_tag', 'pt', 'tag.id = pt.tagId')
//       .innerJoin('posts', 'p', 'p.id = pt.postId')
//       .where('p.id = :postId', { postId: newPost.id })
//       .getMany();
//
//     const postRes = {
//       ...returnPost,
//       tags: tagsRes,
//     };
//     return { post: postRes };
//   }
//
//   async deletePost({ postId }: { postId: number }) {
//     await this.postRepository.delete(postId);
//     return {
//       message: `delete post ${postId} successfully`,
//     };
//   }
//
//   async editPost({ id, tags, ...postInfo }: EditPostParams) {
//     if (postInfo.picturePath) {
//       const currentPost = await this.postRepository.findOne({ where: { id } });
//       if (currentPost.picturePath) {
//         fs.unlinkSync(`/${currentPost.picturePath}`);
//       }
//     }
//     if (tags) {
//     }
//     await this.postRepository.update(id, { ...postInfo });
//     return { message: 'update post success !' };
//   }
//
//   async sharePost({
//     postInfo,
//     userId,
//   }: {
//     postInfo: SharePostDto;
//     userId: number;
//   }) {
//     // const currentPost = await this.postRepository.findOne({
//     //   where: { id: postInfo.postId },
//     // });
//     // const { id, ...currentPostInfo } = currentPost;
//     //
//     // const userRoot = await this.userRepository.findOne({
//     //   where: { id: currentPost.user },
//     // });
//     //
//     // const newSharePost = await this.postRepository.save({
//     //   ...currentPostInfo,
//     //   userRoot: userRoot.id,
//     //   description: postInfo.description,
//     //   sharedContent: currentPost.description,
//     //   user: userId,
//     //   createdAtRoot: currentPost.createdAt,
//     //   createdAt: new Date(),
//     // });
//
//     return {};
//   }
// }
