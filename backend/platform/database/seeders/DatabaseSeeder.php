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

        $teacher = User::create([
            'name' => 'أحمد علي',
            'email' => '345678@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01112345678',
            'role' => 'teacher',
        ]);

        $student1 = User::create([
            'name' => 'محمد أحمد',
            'email' => '234567@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01098765432',
            'role' => 'student',
        ]);

        $student2 = User::create([
            'name' => 'منى حسن',
            'email' => '567890@Menyis.com',
            'password' => Hash::make('password123'),
            'phone_number' => '01198765432',
            'role' => 'student',
        ]);

        Student::create([
            'user_id' => $student1->id,
            'grade_level' => 'first',
        ]);

        Student::create([
            'user_id' => $student2->id,
            'grade_level' => 'first',
        ]);

        // Insert specific records for courses in Arabic
        $courses = [
            [
                'title' => 'الكيمياء',
                'description' => 'دورة شاملة في علم الكيمياء تغطي أساسيات العناصر والتفاعلات الكيميائية.',
                'price' => 120.00,
                'image' => 'https://example.com/images/chemistry.jpg',
                'levels' => ['first', 'second', 'third'],
            ],
            [
                'title' => 'الفيزياء',
                'description' => 'تعلم المبادئ الأساسية للفيزياء بما في ذلك الحركة، الطاقة، والموجات.',
                'price' => 130.00,
                'image' => 'https://example.com/images/physics.jpg',
                'levels' => ['first', 'second', 'third'],
            ],
            [
                'title' => 'اللغة العربية',
                'description' => 'دورة متكاملة لتعلم اللغة العربية من النحو إلى الأدب.',
                'price' => 100.00,
                'image' => 'https://example.com/images/arabic.jpg',
                'levels' => ['first', 'second', 'third'],
            ],
            [
                'title' => 'الفنون',
                'description' => 'استكشاف الفنون الجميلة، الرسم، والنحت في دورة شاملة.',
                'price' => 150.00,
                'image' => 'https://example.com/images/arts.jpg',
                'levels' => ['first', 'second', 'third'],
            ],
        ];

        foreach ($courses as $courseData) {
            $course = Course::create([
                'teacher_id' => $teacher->id,
                'title' => $courseData['title'],
                'description' => $courseData['description'],
                'price' => $courseData['price'],
                'image' => $courseData['image'],
            ]);

            foreach ($courseData['levels'] as $level) {
                // Insert specific records for course contents
                CourseContent::create([
                    'course_id' => $course->id,
                    'content_type' => 'video',
                    'title' => 'فيديو ' . $courseData['title'] . ' - المستوى ' . $level,
                    'image' => 'https://example.com/images/video_' . strtolower($courseData['title']) . '.jpg',
                    'file_path' => 'https://www.youtube.com/watch?v=example_video',
                    'content' => 'فيديو تعليمي عن ' . $courseData['title'] . ' - المستوى ' . $level,
                    'order' => 1,
                    'level' => $level,
                ]);

                CourseContent::create([
                    'course_id' => $course->id,
                    'content_type' => 'document',
                    'title' => 'مذكرة ' . $courseData['title'] . ' - المستوى ' . $level,
                    'image' => 'https://example.com/images/note_' . strtolower($courseData['title']) . '.jpg',
                    'file_path' => 'https://example.com/documents/note_' . strtolower($courseData['title']) . '.pdf',
                    'content' => 'مذكرة تغطي موضوعات ' . $courseData['title'] . ' - المستوى ' . $level,
                    'order' => 2,
                    'level' => $level,
                ]);

                $quiz = Quiz::create([
                    'course_id' => $course->id,
                    'title' => 'اختبار ' . $courseData['title'] . ' - المستوى ' . $level,
                    'description' => 'اختبار لتقييم معرفتك بـ' . $courseData['title'] . ' - المستوى ' . $level,
                    'type' => 'multiple_choice',
                    'is_published' => true,
                    'start_time' => now(),
                    'end_time' => now()->addDays(7),
                    'level' => $level,
                ]);

                QuizQuestion::create([
                    'quiz_id' => $quiz->id,
                    'question' => 'ما هو العنصر الكيميائي للماء؟',
                    'options' => json_encode(['H2O', 'O2', 'CO2', 'N2']),
                    'correct_answer' => 'H2O',
                ]);
            }
        }
    }
}
