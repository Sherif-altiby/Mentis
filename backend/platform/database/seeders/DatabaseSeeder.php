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

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Insert specific records for users
        User::create([
            'name' => 'Ali Hadhood',
            'email' => 'ali.hadhood@example.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01012345678',
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('johnpassword'),
            'phone_number' => '01098765432',
            'role' => 'student',
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane.smith@example.com',
            'password' => Hash::make('janesmith123'),
            'phone_number' => '01112345678',
            'role' => 'teacher',
        ]);

        User::create([
            'name' => 'Michael Johnson',
            'email' => 'michael.johnson@example.com',
            'password' => Hash::make('michael2024'),
            'phone_number' => '01234567890',
            'role' => 'parent',
        ]);

        User::create([
            'name' => 'Emily Davis',
            'email' => 'emily.davis@example.com',
            'password' => Hash::make('emilydavis'),
            'phone_number' => '01198765432',
            'role' => 'student',
        ]);

        // Insert specific records for courses
        $course = Course::create([
            'teacher_id' => User::where('role', 'teacher')->first()->id,
            'title' => 'Introduction to Laravel',
            'description' => 'A comprehensive guide to learning Laravel.',
            'price' => 49.99,
            'image' => 'https://example.com/images/intro_laravel.jpg',
        ]);

        // Insert specific records for assignments
        Assignment::create([
            'course_id' => $course->id,
            'title' => 'Laravel Basics Assignment',
            'description' => 'Complete the basic Laravel assignment.',
            'due_date' => now()->addWeek(),
            'is_published' => true,
        ]);

        // Insert specific records for course contents
        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'video',
            'title' => 'Introduction to Laravel',
            'image' => 'https://example.com/images/intro_laravel.jpg',
            'file_path' => 'storage/intro_laravel.mp4',
            'content' => 'This video provides an introduction to Laravel framework.',
            'order' => 1,
            'level' => 'first',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'document',
            'title' => 'Laravel Basics',
            'image' => 'https://example.com/images/laravel_basics.jpg',
            'file_path' => 'storage/laravel_basics.pdf',
            'content' => 'A document covering the basics of Laravel.',
            'order' => 2,
            'level' => 'first',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'quiz',
            'title' => 'Laravel Quiz 1',
            'image' => 'https://example.com/images/quiz_laravel.jpg',
            'file_path' => 'storage/laravel_quiz_1.json',
            'content' => 'Quiz to test your knowledge on Laravel basics.',
            'order' => 3,
            'level' => 'first',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'video',
            'title' => 'Advanced Laravel Techniques',
            'image' => 'https://example.com/images/advanced_laravel.jpg',
            'file_path' => 'storage/advanced_laravel.mp4',
            'content' => 'Learn advanced techniques and tips for Laravel.',
            'order' => 4,
            'level' => 'second',
        ]);

        CourseContent::create([
            'course_id' => $course->id,
            'content_type' => 'document',
            'title' => 'Final Project Guidelines',
            'image' => 'https://example.com/images/project_guidelines.jpg',
            'file_path' => 'storage/project_guidelines.pdf',
            'content' => 'Guidelines for completing the final project in this course.',
            'order' => 5,
            'level' => 'third',
        ]);

        // Insert specific records for files
        $file = File::create([
            'user_id' => User::where('role', 'teacher')->first()->id,
            'file_name' => 'course_material.pdf',
            'file_type' => 'application/pdf',
            'file_data' => 'sample binary data',
        ]);

        // Insert specific records for quizzes
        $quiz = Quiz::create([
            'course_id' => $course->id,
            'title' => 'Laravel Basics Quiz',
            'description' => 'Test your knowledge on Laravel basics.',
            'type' => 'multiple_choice',
            'is_published' => true,
            'start_time' => now(),
            'end_time' => now()->addDays(7),
        ]);

        // Insert specific records for quiz questions
        QuizQuestion::create([
            'quiz_id' => $quiz->id,
            'question' => 'What is Laravel?',
            'options' => json_encode(['A PHP framework', 'A JavaScript library', 'A database management system', 'An HTML editor']),
            'correct_answer' => 'A PHP framework',
        ]);

        // Insert specific records for quiz responses
        QuizResponse::create([
            'quiz_question_id' => QuizQuestion::first()->id,
            'student_id' => User::where('role', 'student')->first()->id,
            'answer' => 'A PHP framework',
            'is_correct' => true,
        ]);

        // Insert specific records for assignment submissions
        AssignmentSubmission::create([
            'assignment_id' => Assignment::first()->id,
            'student_id' => User::where('role', 'student')->first()->id,
            'file_id' => $file->id,
            'grade' => 85.5,
            'submission_date' => now(),
        ]);
    }
}
