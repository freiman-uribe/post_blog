import { defineStore } from "pinia";
import { postsApi } from "@/api/posts.api";
import type { Post, PostsState } from "@/types/post.type";

export const usePostsStore = defineStore("posts", {
  state: (): PostsState => ({
    posts: [],
    commentsPost: [],
    currentPost: null,
    loading: "idle",
    error: null,
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 5,
  }),

  getters: {
    filteredPosts: (state): Post[] => {
      if (!state.searchQuery) {
        return state.posts;
      }

      const query = state.searchQuery.toLowerCase();
      return state.posts.filter((post) =>
        post.title.toLowerCase().includes(query),
      );
    },

    paginatedPosts: (state): Post[] => {
      const filtered = state.searchQuery
        ? state.posts.filter((post) =>
            post.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
          )
        : state.posts;

      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return filtered.slice(start, end);
    },

    totalPages: (state): number => {
      const filtered = state.searchQuery
        ? state.posts.filter((post) =>
            post.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
          )
        : state.posts;
      return Math.ceil(filtered.length / state.itemsPerPage);
    },

    isLoading: (state): boolean => state.loading === "loading",
    hasError: (state): boolean => state.loading === "error",
  },

  actions: {
    async fetchPostsByPage(page: number, limit: number = 10): Promise<void> {
      this.loading = "loading";
      this.error = null;
      try {
        const allPosts = await postsApi.getPosts(page, limit);
        this.posts = allPosts;
        this.currentPage = page;
        this.loading = "success";
      } catch (error) {
        this.loading = "error";
        this.error =
          error instanceof Error ? error.message : "Error desconocido";
      }
    },

    async fetchPostById(id: number): Promise<void> {
      this.loading = "loading";
      this.error = null;
      try {
        const localPost = this.posts.find((post) => post.id === id);
        if (localPost) {
          this.currentPost = localPost;
          this.loading = "success";
        } else {
          this.currentPost = await postsApi.getPostById(id);
          this.loading = "success";
        }
      } catch (error) {
        this.loading = "error";
        this.error =
          error instanceof Error ? error.message : "Error desconocido";
      }
    },

    async fetchCommentsByPostId(id: number): Promise<void> {
      this.loading = "loading";
      this.error = null;
      try {
        const comments = await postsApi.getCommentsByPostId(id);
        this.commentsPost = comments;
        this.loading = "success";
      } catch (error) {
        this.loading = "error";
        this.error =
          error instanceof Error ? error.message : "Error desconocido";
      }
    },

    setSearchQuery(query: string): void {
      this.searchQuery = query;
      this.currentPage = 1; // Resetear a la primera página al buscar
    },

    setCurrentPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
});
