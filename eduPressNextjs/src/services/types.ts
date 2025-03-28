export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  number: number;
  size: number;
  totalElements: number;
}


export interface User extends BaseEntity {
  username: string;
  email: string;
  userBio: string;
  joinDate: string;
  role: string;
  emailVerified?: boolean;
  avatarUrl?: string;
}
export interface UserUpdateDTO {
  email?: string;
  username?: string;
  userBio?: string;
  password?: string;
}
export interface UserStats {
  completedLessons:number;
  completedModules: number;
  completedCourses: number;
  lastLessonCompletion:Date;
  lastModuleCompletion: Date;
  lastCourseCompletion:Date;
}
export interface UserDailyCompletions {
  date:string;
  lessonCompletions:number;
  moduleCompletions:number;
  courseCompletions:number;
  totalCompletions:number;
}
export interface UserAchievements {
  userId: number,
  achievementId: number,
  level:string;
  name: string,
  description: string;
  awardedAt: string;
}


export interface UpdateUserResponseDTO {
  user: User;
  message: string;
}
export interface SocialMediaData {
  name: string;
  link: string;
}

export interface InstructorNewApplicationData {
  userId: number;
  title: string;
  bio: string;
  age: number;
  specialization: string;
  socialMedia: SocialMediaData[];
  firstName: string;
  lastName: string;
}

export interface InstructorApplication {
  applicationId: number;
  title: string;
  status: string;
  createdAt: string;
  username: string;
  userId: number;
  age: number;
  specialization: string;
  socialMedia: { name: string; link: string }[];
  bio: string;
}

export interface InstructorApplicationUpdateData {
  applicationId: number;
  status: string;
}

export interface AddApplicationModalProps {
  visible: boolean;
  onClose: () => void;
  userId?: string;
}
export interface Admin extends User {
  aye?: string;
}

export interface SocialMedia {
  name: string;
  link: string;
}

export enum SocialMediaType {
  GITHUB = "GITHUB",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  LINKEDIN = "LINKEDIN",
  INSTAGRAM = "INSTAGRAM",
  TELEGRAM = "TELEGRAM",
  YOUTUBE = "YOUTUBE",
}

export interface NewLesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  requirements?: string[];
  lessonOrder?: number;
  moduleId: number;
}

export interface Lesson {
  lessonId: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  requirements?: string[];
  completed: boolean;
  locked: boolean;
}

export interface FAQs extends BaseEntity {
  courseId: number;
  question: string;
  answer: string;
}

export interface NewFAQs {
  courseId: number;
  question: string;
  answer: string;
}

export interface Module extends BaseEntity {
  title: string;
  duration?: string;
  lessonsCount?: number;
  description?: string;
  moduleOrder?: number;
  courseId?: number;
  lessons?: Lesson[];
}
export interface NewModule {
  title: string;
  duration?: string;
  description?: string;
  lessonCount?: number;
  courseId?: number;
  lessons?: Lesson[];
}
export interface UpdateModuleData {
  title: string;
  duration?: string;
  description?: string;
  moduleOrder?: number;
}

export interface Course extends BaseEntity {
  title: string;
  description: string;
  price: number;
  duration: number;
  discount?: number;
  categoryId: number;
  instructorId: number;
  averageRating?: number;
  instructorName?: string;
  categoryName?:string;
  imageUrl?: string;
  freeCourse?: boolean;
  difficulty?: string;
  modulesCount?: number;
  studentsCount?: number;
  userEnrolled?: boolean;
  hasPendingPayment?:boolean;
  modules?: Module[];
}
export interface CourseRating {
  courseId: number;
  rating:number
}
export interface CourseRatingData {
  averageRating: number;
  totalRatings: number;
  ratingCounts: { [key: number]: number };
}
export interface NewCourseData {
  title: string;
  description: string;
  categoryId: number;
  instructorId: number;
  price: number | null;
  duration: number | null;
  discount?: number | null;
  freeCourse: boolean;
  difficulty?: string;
}
export enum Difficult {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}


export interface UpdateCourseData {
  id: number;
  title: string;
  difficult?: Difficult;
  freeCourse: boolean;
  description: string;
  price: number;
  discount: number;
}
export interface CourseOverview {
  description?: string;
  certification?: string;
  learningOutcomes?: string[];
  requirements?: string[];
  features?: string[];
  targetAudience?: string[];
}

export interface Article extends BaseEntity {
  title: string;
  content: string;
  articlePreviewUrl?: string;
  publishedAt?: Date;
  authorId: number;
  comments?: Comment[];
  category?: ArticleCategory;
  tags?: Tag[];
}

export interface Comment extends BaseEntity {
  authorId: number;
  content: string;
}

export interface Tag extends BaseEntity {
  name: string;
}

export interface ArticleCategory  {
  id?: number;
  name: string;
  countOfArticles?: number;
}

export interface Instructor extends User {
  specialization: string;
  age: number;
  bio: string;
  socialMedia: SocialMedia[];
}

export interface InstructorApplication extends BaseEntity {
  title: string;
  age: number;
  specialization: string;
  socialMedia: SocialMedia[];
  bio: string;
  description: string;
  status: string;
  userId: number;
  userName?: string;
}

export interface Category extends BaseEntity {
  name: string;
  description: string;
  iconName?: string;
  countOfCourses: number;
}
export interface NewCategoryData {
  name: string;
  description: string;
  iconName: string;
}
export interface CommentData extends Comment {
  studentUsername?: string;
  studentAvatar?: string;
}

export interface NewCommentData {
  courseId: number;
  content: string;
  studentId: number;
}

export interface EnrollCourseData {
  userId: number;
  courseId: number;
}