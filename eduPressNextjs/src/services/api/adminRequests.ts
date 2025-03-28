import { apiRequest } from "./api";
import type * as Types from "@/services/types";

// FAQS FOR COURSE
export const addFaqToCourse = async (faq: Types.NewFAQs): Promise<Types.FAQs> => {
    return apiRequest<Types.FAQs>(`/courses/faqs`, `POST`, faq);
}



// MODULES FOR COURSE
export const addModuleToCourse = async (newModule: Types.NewModule): Promise<Types.Module> => {
    return apiRequest<Types.Module>(`/modules`, `POST`, newModule);
}

export const addLessonToModule = async (newLesson: Types.NewLesson): Promise<Types.Lesson> => {
    return apiRequest<Types.Lesson>(`/lessons`, `POST`, newLesson);
}
export const addListOfLessonsToModule = async (newLesson: Types.NewLesson[]): Promise<Types.Lesson[]> => {
    return apiRequest<Types.Lesson[]>(`/lessons/batch`, `POST`, newLesson);
}
export const updateCourseModule = async (moduleId: number, module: Types.UpdateModuleData): Promise<Types.Module> => {
    return apiRequest<Types.Module>(`/modules/${moduleId}`, `PATCH`, module);
}
export const getModuleById = async (moduleId: number): Promise<Types.Module> => {
    return apiRequest<Types.Module>(`/modules/${moduleId}`, `GET`, null);
}

// INSTRUCTOR APPLICATIONS
export const addInstructorApplication = async (application: Types.InstructorNewApplicationData): Promise<Types.InstructorNewApplicationData> => {
    return apiRequest<Types.InstructorNewApplicationData>(`/instructor-applications`, `POST`, application);
};

export const getInstructorApplication = async (): Promise<Types.InstructorApplication[]> => {
    return apiRequest<Types.InstructorApplication[]>(`/instructor-applications`, `GET`, null);
}

export const patchInstructorApplication = async (application: Types.InstructorApplicationUpdateData): Promise<Types.InstructorApplicationUpdateData> => {
    return apiRequest<Types.InstructorApplicationUpdateData>(`/instructor-applications`, `PATCH`, application);
}

export const deleteInstructorApplication = async (applicationId: number): Promise<void> => {
    return apiRequest<void>(`/instructor-applications/${applicationId}`, `DELETE`, null);
}

// USERS
export const getAdminData = async (): Promise<Types.Admin> => {
    return apiRequest<Types.Admin>('/admin/admin', 'GET', null);
};

export const getAllUsers = async (): Promise<Types.User[]> => {
    return apiRequest<Types.User[]>('/admin/users', 'GET', null);
};

export const deleteUser = async (userId: number): Promise<void> => {
    return apiRequest<void>(`/admin/users/${userId}`, 'DELETE', null);
}

// INSTRUCTORS
export const getInstructorData = async (userId: number): Promise<Types.Instructor> => {
    return apiRequest<Types.Instructor>(`/instructor/${userId}`, `GET`, null);
}

export const getAllInstructors = async (): Promise<Types.Instructor[]> => {
    return apiRequest<Types.Instructor[]>('/instructor', 'GET', null);
}

export const getAllInstructorsName = async (): Promise<Types.Instructor[]> => {
    return apiRequest<Types.Instructor[]>('/instructor/names', 'GET', null);
}

// CATEGORIES
export const addCategory = async (category: Types.NewCategoryData): Promise<Types.Category> => {
    return apiRequest<Types.Category>('/admin/category', 'POST', category);
};

export const getAllCategories = async (): Promise<Types.Category[]> => {
    return apiRequest<Types.Category[]>('/admin/category', 'GET', null);
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
    return apiRequest<void>(`/admin/category/${categoryId}`, 'DELETE', null);
}

// COURSES
export const addCourseWithImage = async (
    course: Types.NewCourseData,
    image: File | null
): Promise<Types.Course> => {
    const formData = new FormData();
    formData.append('courseData', new Blob([JSON.stringify(course)], { type: 'application/json' }));

    if (image) {
        formData.append('image', image);
    }

    return apiRequest('/admin/courses', 'POST', formData);
};

export const getAllCourses = async (): Promise<Types.Course[]> => {
    return apiRequest<Types.Course[]>('/admin/courses', 'GET', null);
};

export const deleteCourse = async (courseId: number): Promise<void> => {
    return apiRequest<void>(`/admin/courses/${courseId}`, 'DELETE', null);
};

export const updateCourse = async (courseId:number, course: Types.UpdateCourseData): Promise<Types.Course> => {
    return apiRequest<Types.Course>(`/admin/courses/${courseId}`, 'PATCH', course);
}

// COURSES OVERVIEW
export const addOverviewToCourse = async (overview: Types.CourseOverview): Promise<Types.CourseOverview> => {
    return apiRequest<Types.CourseOverview>(`/course/overview`, `POST`, overview);
}

// ARTICLES 
export const getAllArticles = async (): Promise<Types.Article[]> => {
    return apiRequest<Types.Article[]>(`/article`, `GET`, null);
}

export const searchArticles = async (query: string): Promise<Types.Article[]> => {
    return apiRequest<Types.Article[]>(`/article/search/${query}`, `GET`, null);
}

export const deleteArticle = async (id: number): Promise<void> => {
    return apiRequest<void>(`/article/${id}`, `DELETE`, null);
}

export const addArticle = async (article: Types.Article): Promise<Types.Article> => {
    return apiRequest<Types.Article>(`/article`, `POST`, article);
}

export const getArticleById = async (articleId: number): Promise<Types.Article> => {
    return apiRequest<Types.Article>(`/article/${articleId}`, `GET`, null);
}

export const getLatestArticles = async (): Promise<Types.Article[]> => {
    return apiRequest<Types.Article[]>(`/article/getLatestArticles`, `GET`, null);
}
// ARTICLES CATEGORY
export const getArticleCategories = async (): Promise<Types.ArticleCategory[]> => {
    return apiRequest<Types.ArticleCategory[]>(`/article/category`, `GET`, null);
}

export const addArticleCategory = async (articleCategory: Types.ArticleCategory): Promise<Types.ArticleCategory> => {
    return apiRequest<Types.ArticleCategory>(`/article/category`, `POST`, articleCategory);
}

export const getArticlesByCategory = async (articleCategoryId: number): Promise<Types.Article[]> => {
    return apiRequest<Types.Article[]>(`/article/category/${articleCategoryId}`, `GET`, null);
}

// ARTICLE TAG
export const getArticleTags = async (): Promise<Types.Tag[]> => {
    return apiRequest<Types.Tag[]>(`/article/tags`, `GET`, null);
}