export interface Lesson {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  lessons: Lesson[];
  link: string;
}

export interface CourseContent {
  id: string;
  title: string;
  lessons: Lesson[];
}
