<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\CourseContent;
use App\Models\File;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizResponse;
use App\Models\AssignmentSubmission;
use App\Models\Student;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Insert specific records for users
        $admin = User::create([
            'name' => 'علي هدهود',
            'email' => '123456@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01012345678',
            'role' => 'admin',
        ]);

        $student1 = User::create([
            'name' => 'محمد أحمد',
            'email' => '234567@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01098765432',
            'role' => 'student',
        ]);

        $teacher = User::create([
            'name' => 'أحمد علي',
            'email' => '345678@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01112345678',
            'role' => 'teacher',
        ]);

        $parent = User::create([
            'name' => 'خالد عبد الله',
            'email' => '456789@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01234567890',
            'role' => 'parent',
        ]);

        $student2 = User::create([
            'name' => 'منى حسن',
            'email' => '567890@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01198765432',
            'role' => 'student',
        ]);

        $student1 = User::where('email', '234567@Menyis.com')->first();

        // Now you can access the ID
        $student1Id = $student1->id;

                // Fetch the user based on specific criteria, e.g., role or email
        $student2 = User::where('email', '567890@Menyis.com')->first();

        // Now you can access the ID
        $student2Id = $student2->id;

        Student::create([
            'user_id' => $student1Id,  // This returns a User object, not an ID
            'grade_level' => 'first',
        ]);
        Student::create([
            'user_id' => $student2Id,  // This returns a User object, not an ID
            'grade_level' => 'first',
        ]);
        // Insert specific records for courses
        $course = Course::create([
            'teacher_id' => $teacher->id,
            'title' => 'مقدمة في الرياضيات',
            'description' => 'دورة تعلم أساسيات الرياضيات باللغة العربية.',
            'price' => 99.99,
            'image' => 'https://example.com/images/math_intro.jpg',
        ]);

        // Insert specific records for assignments
        $assignment = Assignment::create([
            'course_id' => $course->id,
            'title' => 'تمارين على أساسيات الرياضيات',
            'description' => 'حل التمارين المعطاة في الدرس.',
            'due_date' => now()->addWeek(),
            'is_published' => true,
        ]);

        // Insert specific records for course contents
        $file = File::create([
            'user_id' => $teacher->id,
            'file_name' => 'course_material.pdf',
            'file_type' => 'application/pdf',
            'file_data' => 'sample binary data',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'video',
            'title' => 'فيديو مقدمة في الرياضيات',
            'image' => 'https://example.com/images/math_video.jpg',
            'file_id' => $file->id,
            'file_path' => 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            'content' => 'هذا الفيديو يقدم أساسيات الرياضيات.',
            'order' => 1,
            'level' => 'first',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'document',
            'title' => 'مذكرة أساسيات الرياضيات',
            'image' => 'https://example.com/images/math_notes.jpg',
            'file_id' => $file->id,
            'file_path' => 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            'content' => 'مذكرة تغطي أساسيات الرياضيات.',
            'order' => 2,
            'level' => 'first',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'quiz',
            'file_id' => $file->id,
            'title' => 'اختبار الرياضيات ١',
            'image' => 'https://example.com/images/math_quiz.jpg',
            'file_path' => 'https://www.youtube.com/watch?v=OmJ-4B-mS-Y',
            'content' => 'اختبار لتقييم معرفتك بأساسيات الرياضيات.',
            'order' => 3,
            'level' => 'first',
        ]);

        // Insert specific records for quizzes
        $quiz = Quiz::create([
            'course_id' => $course->id,
            'title' => 'اختبار أساسيات الرياضيات',
            'description' => 'اختبار لمعرفة مدى فهمك لأساسيات الرياضيات.',
            'type' => 'multiple_choice',
            'is_published' => true,
            'start_time' => now(),
            'end_time' => now()->addDays(7),
            'level' => 'first',
        ]);

        // Insert specific records for quiz questions
        $quizQuestion = QuizQuestion::create([
            'quiz_id' => $quiz->id,
            'question' => 'ما هو العدد 2 + 2؟',
            'options' => json_encode(['3', '4', '5', '6']),
            'correct_answer' => '4',
        ]);

        // Insert specific records for quiz responses
        QuizResponse::create([
            'quiz_question_id' => $quizQuestion->id,
            'student_id' => $student1->id,
            'answer' => '4',
            'is_correct' => true,
        ]);

        // Insert specific records for assignment submissions
        AssignmentSubmission::create([
            'assignment_id' => $assignment->id,
            'student_id' => $student1->id,
            'file_id' => $file->id,
            'grade' => 90,
            'submission_date' => now(),
        ]);
    }
}
