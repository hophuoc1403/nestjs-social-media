export interface AddPostParams {
  userId: number;
  description: string;
  picturePath?: string;
  tags: number[];
}

export interface EditPostParams {
  id: number;
  description: string;
  picturePath?: string;
  tags?: number[];

  pictureDelete?: string;
}
