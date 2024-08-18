<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;


class FileFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => 2, // John Doe
            'file_name' => 'assignment1.pdf',
            'file_type' => 'application/pdf',
            'file_data' => base64_encode('Sample PDF content'),
        ];
    }
}

\App\Models\File::factory()->createMany([
    ['user_id' => 3, 'file_name' => 'lecture_notes.docx', 'file_type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'file_data' => base64_encode('Lecture notes content')],
    ['user_id' => 4, 'file_name' => 'presentation.pptx', 'file_type' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'file_data' => base64_encode('Presentation content')],
    ['user_id' => 5, 'file_name' => 'research_paper.pdf', 'file_type' => 'application/pdf', 'file_data' => base64_encode('Research paper content')],
    ['user_id' => 1, 'file_name' => 'syllabus.pdf', 'file_type' => 'application/pdf', 'file_data' => base64_encode('Course syllabus content')],
]);
