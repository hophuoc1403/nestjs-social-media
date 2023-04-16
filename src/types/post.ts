export interface Post {
  id?: number;
  title: string;
  description: string;
  picturePath: string;
  userId: number;
  userRootId?: number;
  shareContent?: string;
}
