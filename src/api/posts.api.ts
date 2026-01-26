import { httpClient } from "@/config/api";
import type { Post, User } from "@/types/post.type";

class PostsApiService {
  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    try {
      const params = {
        _start: (page - 1) * limit,
        _limit: limit,
      };
      const data = await httpClient.get<Post[]>("/posts", params);
      const response = data.map(async (post) => {
        const data = await this.getUserById(post.userId);
        return {
          ...post,
          user: data,
        };
      });
      return Promise.all(response);
    } catch (error) {
      throw new Error("Error al obtener los posts publicados");
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const data = await httpClient.get<User>(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error(`Error al obtener el usuario`);
    }
  }

  async getPostByName(title: string): Promise<Post[]> {
    try {
      const params = {
        title_like: title,
      };
      const data = await httpClient.get<Post[]>("/posts", params);
      return data;
    } catch (error) {
      throw new Error("Error al obtener los posts por título");
    }
  }

  async getPostById(id: number): Promise<Post> {
    try {
      const data = await httpClient.get<Post>(`/posts/${id}`);
      const user = await this.getUserById(data.userId);
      return {
        ...data,
        user,
      };
    } catch (error) {
      throw new Error(`Error al obtener el post`);
    }
  }

  async getCommentsByPostId(postId: number): Promise<any[]> {
    try {
      const data = await httpClient.get<any[]>(`/posts/${postId}/comments`);
      return data;
    } catch (error) {
      throw new Error(`Error al obtener los comentarios del post`);
    }
  }
}

export const postsApi = new PostsApiService();
