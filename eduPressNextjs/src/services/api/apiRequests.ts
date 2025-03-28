import { apiRequest } from "./api";
import * as Types from "@/services/types";

// USERS
export const getProtectedData = async (): Promise<Types.User> => {
  return apiRequest<Types.User>('/protected/current', 'GET', null);
};

export const getUserStats = async (): Promise<Types.UserStats> => {
  return apiRequest<Types.UserStats>('/protected/statistic', 'GET', null);
}


export const postLogout = async (): Promise<void> => {
  return apiRequest<void>('/auth/logout', 'POST', null);
};

export const uploadAvatar = async (image: File, userId: number): Promise<string> => {
  const formData = new FormData();
  formData.append("avatar", image);
  formData.append("userId", String(userId));

  return await apiRequest<string>("/user/avatar/upload", "POST", formData);
};

export const updateProfile = async (profile: Types.UserUpdateDTO): Promise<Types.UpdateUserResponseDTO> => {
  return apiRequest<Types.UpdateUserResponseDTO>('/protected/current', 'PUT', profile);
};
export const newEmailConfirmation = async (token: string): Promise<void> => {
  return apiRequest<void>(`/auth/confirm-new-email/${token}`, `GET`, null);
};
export const getUserDailyCompletion = async (): Promise<Types.UserDailyCompletions[]> => {
  return apiRequest<Types.UserDailyCompletions[]>(`/protected/getUserDailyProgress`, `GET`, null);
}
export const getUserAchievements = async (): Promise<Types.UserAchievements[]> => {
  return apiRequest<Types.UserAchievements[]>(`/protected/achievement`, `GET`, null);
}
// CATEGORIES
export const getHeroCategories = async (): Promise<Types.Category[]> => {
  return apiRequest<Types.Category[]>('/category', 'GET', null);
};

export const getAllFilterCategories = async (): Promise<Types.Category[]> => {
  return apiRequest<Types.Category[]>(`/category`, `GET`, null);
};

// COURSES
export const getCoursesByCategory = async (categoryId: number, page: number, size: number): Promise<Types.PaginatedResponse<Types.Course>> => {
  return apiRequest<Types.PaginatedResponse<Types.Course>>(`/courses/byCategory/${categoryId}?page=${page}&size=${size}`, 'GET', null);
};

export const getAllCourses = async (page = 0, size = 9): Promise<Types.PaginatedResponse<Types.Course>> => {
  return apiRequest<Types.PaginatedResponse<Types.Course>>(`/courses?page=${page}&size=${size}`, 'GET', null);
};

export const getCourseById = async (courseId: number): Promise<Types.Course> => {
  return apiRequest<Types.Course>(`/courses/course/${courseId}`, `GET`, null);
};

export const getTopCourses = async (): Promise<Types.Course[]> => {
  return apiRequest<Types.Course[]>(`/courses/topCourses`, `GET`, null);
};

export const getModulesByCourseId = async (courseId: number): Promise<Types.Module[]> => {
  return apiRequest<Types.Module[]>(`/modules/course/${courseId}`, `GET`, null);
};

export const searchCourses = async (query: string): Promise<Types.Course[]> => {
  return apiRequest<Types.Course[]>(`/courses/search/${query}`, `GET`, null);
};

export const getUsersCourses = async (): Promise<Types.Course[]> => {
  return apiRequest<Types.Course[]>(`/courses/courseForUser`, `GET`, null);
}
export const getPublishedCourses = async (): Promise<Types.Course[]> => {
  return apiRequest<Types.Course[]>(`/courses/getPublished`, `GET`, null);
}
export const getCoursesByInstructor = async (instructorId: number, page: number, size: number): Promise<Types.PaginatedResponse<Types.Course>> => {
  return apiRequest<Types.PaginatedResponse<Types.Course>>(`/courses/byInstructor/${instructorId}?page=${page}&size=${size}`, "GET", null);
}

export const rateCourse = async (ratingData: Types.CourseRating): Promise<void> => {
  return apiRequest<void>(`/courses/rate`, `POST`, ratingData);
}
export const getCourseRating = async (courseId: number): Promise<Types.CourseRatingData> => {
  return apiRequest<Types.CourseRatingData>(`/courses/rating/${courseId}`, "GET", null);
};
// COURSE LESSONS
export const fetchLessonsByCourseId = async (courseId: number): Promise<Types.Lesson[]> => {
  return apiRequest<Types.Lesson[]>(`/lessons/course/${courseId}`, `GET`, null);
};

export const fetchLesson = async (courseId: number, lessonId: number): Promise<Types.Lesson> => {
  return apiRequest<Types.Lesson>(`/lessons/course/${courseId}/lesson/${lessonId}`, `GET`, null);
};

export const markLessonAsCompleted = async (lessonId: number): Promise<void> => {
  return apiRequest<void>(`/lessons/${lessonId}/complete`, `POST`, null);
};

// COURSE ENROLLMENTS
export const enrollToCourse = async (courseId: number): Promise<void> => {
  return apiRequest<void>(`/enrollments/enroll/${courseId}`, `POST`, null);
};

// COURSE OVERVIEWS
export const getCourseOverview = async (courseId: number): Promise<Types.CourseOverview> => {
  return apiRequest<Types.CourseOverview>(`/course/overview/${courseId}`, `GET`, null);
};

// COURSE FAQs
export const getFaqsForCourse = async (courseId: number): Promise<Types.FAQs[]> => {
  return apiRequest<Types.FAQs[]>(`/courses/faqs/${courseId}`, `GET`, null);
}

// COMMENTS
export const getListOfComment = async (courseId: number, page:number, size:number): Promise<Types.PaginatedResponse<Types.CommentData>> => {
  return apiRequest<Types.PaginatedResponse<Types.CommentData>>(`/comments/course/${courseId}?page=${page}&size=${size}`, `GET`, null);
};

export const addCommentToCourse = async (comment: Omit<Types.NewCommentData, 'id'>): Promise<Types.NewCommentData> => {
  return apiRequest<Types.NewCommentData>(`/comments`, `POST`, comment);
};

// ARTICLES
export const getAllArticles = async (page: number, size: number): Promise<Types.PaginatedResponse<Types.Article>> => {
  return apiRequest<Types.PaginatedResponse<Types.Article>>(`/article?page=${page}&size=${size}`,"GET", null);
};

export const searchArticles = async (query: string, page: number, size: number): Promise<Types.PaginatedResponse<Types.Article>> => {
  return apiRequest<Types.PaginatedResponse<Types.Article>>(`/article/search/${query}?page=${page}&size=${size}`,"GET",null);
};

export const deleteArticle = async (id: number): Promise<void> => {
  return apiRequest<void>(`/article/${id}`, `DELETE`, null);
};

export const addArticle = async (article: Types.Article): Promise<Types.Article> => {
  return apiRequest<Types.Article>(`/article`, `POST`, article);
};

export const getArticleById = async (articleId: number): Promise<Types.Article> => {
  return apiRequest<Types.Article>(`/article/${articleId}`, `GET`, null);
};

export const getArticleCategories = async (): Promise<Types.ArticleCategory[]> => {
  return apiRequest<Types.ArticleCategory[]>(`/article/articleCategories`, `GET`, null);
};

export const addArticleCategory = async (articleCategory: Types.ArticleCategory): Promise<Types.ArticleCategory> => {
  return apiRequest<Types.ArticleCategory>(`/article/articleCategories`, `POST`, articleCategory);
};

export const getArticlesByCategory = async (articleCategoryId: number, page: number, size: number): Promise<Types.PaginatedResponse<Types.Article>> => {
  return apiRequest<Types.PaginatedResponse<Types.Article>>(`/article/category/${articleCategoryId}?page=${page}&size=${size}`, "GET", null);
};

export const getArticleTags = async (): Promise<Types.Tag[]> => {
  return apiRequest<Types.Tag[]>(`/article/tags`, `GET`, null);
};