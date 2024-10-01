import axios from "axios";
import { api } from "./api";

//  get teacher courses by level and teacher id
export const getTeacherAllCourses = async (
  teacherId: string | null | number,
  token: string | null,
  level: string | null
) => {
  try {
    const response = await axios.get(
      `${api}/course-contents/teacher/${teacherId}/level/${level}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Check if it's an Axios error
    if (axios.isAxiosError(error)) {
      return "error";
    } else {
      return "error";
    }
  }
};

export const createQuize = async (
  token: string | null,
  course_id: string | undefined,
  title: string,
  level: string
) => {
  const response = await axios.post(
    `${api}/quizzes`,
    {
      course_id: course_id,
      title: title,
      type: "multiple_choice",
      level,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createQuizeQuestion = async (
  token: string | null,
  quiz_id: string,
  question: string,
  a: string,
  b: string,
  c: string,
  d: string
) => {
  const response = await axios.post(
    `${api}/quiz-questions`,
    {
      quiz_id: quiz_id,
      question: question,
      options: {
        a,
        b,
        c,
        d,
      },
      correct_answer: d,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const uploadFile = async (
  token: string | null,
  file_name: string,
  file_type: string,
  file_data: File | Blob,
  user_id: number
) => {
  const formData = new FormData();
  formData.append("user_id", user_id.toString());
  formData.append("file_name", file_name);
  formData.append("file_type", file_type);
  formData.append("file_data", file_data);

  const response = await axios.post(`${api}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSingleFile = async (token: string | null) => {
  const response = await axios.get(`${api}/files/1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// create course
export const createTeacherCourse = async (
  token: string | null,
  courseName: string,
  courseLevel: string,
  courseId: string | number,
  courseLink: string
) => {
  const response = await axios.post(
    `${api}/teachers/courses/contents`,
    {
      title: courseName,
      content_type: "video",
      level: courseLevel,
      course_id: courseId,
      file_path: courseLink,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

// teacher deete the lesson
export const deleteTeacherCourse = async (
  token: string | null,
  id: string | number
) => {
  const response = await axios.delete(
    `${api}/teachers/courses/contents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// teacher update the lesson
export const updateTeacherCourse = async (
  token: string | null,
  id: string | number,
  courseName: string,
  courseLink: string,
  courseLevel: string
) => {
  const response = await axios.put(
    `${api}/teachers/courses/contents/${id}`,
    {
      title: courseName,
      content_type: "video",
      level: courseLevel,
      file_path: courseLink,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

export const uploadNote = async (
  token: string | null,
  id: string | number,
  courseId: string | number | undefined,
  fileName: string,
  fileType: string,
  fileData: File | Blob,
  contentType: string,
  title: string,
  level: string
) => {
  const formData = new FormData();
  formData.append("user_id", id.toString());
  formData.append("course_id", courseId?.toString() || "");
  formData.append("file_name", fileName);
  formData.append("file_type", fileType);
  formData.append("file_data", fileData);
  formData.append("content_type", contentType);
  formData.append("title", title);
  formData.append("level", level);

  const response = await axios.post(`${api}/course-content/store`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllTeacherQuizzes = async (token: string | null) => {
  const response = await axios.get(`${api}/quizzes-with-teacher-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getQuizQuestions = async (
  token: string | null,
  id: string | number
) => {
  const response = await axios.get(`${api}/quiz/${id}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCourseId = async (
  token: string | null,
  id: string | number
) => {
  const response = await axios.get(`${api}/teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
