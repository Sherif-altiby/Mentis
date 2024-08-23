<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Course;
use App\Models\CourseContent;
use App\Models\Quiz;
use App\Models\QuizQuestion;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Insert admin user
        $admin = User::create([
            'name' => 'مدير النظام',
            'email' => 'admin@Menyis.com',
            'password' => Hash::make('admin123'),
            'phone_number' => '01000000001',
            'role' => 'admin',
        ]);
        $student = User::create([
            'name' => 'ahmed',
            'email' => '124456@Menyis.com',
            'password' => Hash::make('admin123'),
            'phone_number' => '010020000001',
            'role' => 'student',
        ]);


        // Define teachers with real names and assign each to one course
        $teachers = [
            ['name' => 'د. أحمد يوسف', 'email' => 'ahmed.youssef@Menyis.com', 'course' => 'الرياضيات'],
            ['name' => 'أ. سارة عبد الرحمن', 'email' => 'sara.abdelrahman@Menyis.com', 'course' => 'الفيزياء'],
            ['name' => 'د. خالد محمد', 'email' => 'khaled.mohamed@Menyis.com', 'course' => 'الكيمياء'],
            ['name' => 'أ. منى حسن', 'email' => 'mona.hassan@Menyis.com', 'course' => 'اللغة العربية'],
            ['name' => 'د. محمود عبد الله', 'email' => 'mahmoud.abdullah@Menyis.com', 'course' => 'العلوم الاجتماعية'],
        ];

        // Define course details
        $courseDetails = [
            'الرياضيات' => [
                'description' => 'فهم الأساسيات وتعلم مهارات الرياضيات المتقدمة، من الحساب إلى الجبر والهندسة.',
                'price' => 150.00,
                'image' => 'https://example.com/images/mathematics.jpg',
            ],
            'الفيزياء' => [
                'description' => 'استكشاف المبادئ الأساسية للفيزياء، بما في ذلك الحركة، الطاقة، والميكانيكا.',
                'price' => 160.00,
                'image' => 'https://example.com/images/physics.jpg',
            ],
            'الكيمياء' => [
                'description' => 'دورة شاملة في علم الكيمياء تغطي المفاهيم الأساسية والتفاعلات الكيميائية.',
                'price' => 170.00,
                'image' => 'https://example.com/images/chemistry.jpg',
            ],
            'اللغة العربية' => [
                'description' => 'تطوير مهارات اللغة العربية في القراءة والكتابة والنحو والأدب.',
                'price' => 140.00,
                'image' => 'https://example.com/images/arabic.jpg',
            ],
            'العلوم الاجتماعية' => [
                'description' => 'فهم التاريخ والجغرافيا والعلوم السياسية من خلال تحليل الأحداث العالمية.',
                'price' => 130.00,
                'image' => 'https://example.com/images/social_sciences.jpg',
            ],
        ];

        // Insert teachers and their courses
        foreach ($teachers as $teacherData) {
            $teacher = User::create([
                'name' => $teacherData['name'],
                'email' => $teacherData['email'],
                'password' => Hash::make('password123'),
                'phone_number' => '0101234567' . rand(1, 9),
                'role' => 'teacher',
            ]);

            $course = Course::create([
                'teacher_id' => $teacher->id,
                'title' => $teacherData['course'],
                'description' => $courseDetails[$teacherData['course']]['description'],
                'price' => $courseDetails[$teacherData['course']]['price'],
                'image' => $courseDetails[$teacherData['course']]['image'],
            ]);

            // Create course contents and quizzes
            foreach (['first', 'second', 'third'] as $level) {
                CourseContent::create([
                    'course_id' => $course->id,
                    'content_type' => 'video',
                    'title' => 'فيديو ' . $teacherData['course'] . ' - ' . $level,
                    'image' => 'https://example.com/images/video_' . strtolower($teacherData['course']) . '.jpg',
                    'file_path' => 'https://www.youtube.com/watch?v=example_video',
                    'content' => 'فيديو تعليمي عن ' . $teacherData['course'] . ' - ' . $level,
                    'order' => 1,
                    'level' => $level,
                ]);

                CourseContent::create([
                    'course_id' => $course->id,
                    'content_type' => 'document',
                    'title' => 'مذكرة ' . $teacherData['course'] . ' - ' . $level,
                    'image' => 'https://example.com/images/note_' . strtolower($teacherData['course']) . '.jpg',
                    'file_path' => 'https://example.com/documents/note_' . strtolower($teacherData['course']) . '.pdf',
                    'content' => 'مذكرة تغطي موضوعات ' . $teacherData['course'] . ' - ' . $level,
                    'order' => 2,
                    'level' => $level,
                ]);

                for ($i = 1; $i <= 3; $i++) {
                    $quiz = Quiz::create([
                        'course_id' => $course->id,
                        'title' => 'اختبار ' . $teacherData['course'] . ' - ' . $level . ' - اختبار ' . $i,
                        'description' => 'اختبار لتقييم معرفتك بـ ' . $teacherData['course'] . ' - ' . $level,
                        'type' => 'multiple_choice',
                        'is_published' => true,
                        'start_time' => now(),
                        'end_time' => now()->addDays(7),
                        'level' => $level,
                    ]);

                    QuizQuestion::create([
                        'quiz_id' => $quiz->id,
                        'question' => 'سؤال اختبار ' . $i . ' لـ ' . $teacherData['course'],
                        'options' => json_encode(['خيار 1', 'خيار 2', 'خيار 3', 'خيار 4']),
                        'correct_answer' => 'خيار 1',
                    ]);
                }
            }
        }
    }
}
