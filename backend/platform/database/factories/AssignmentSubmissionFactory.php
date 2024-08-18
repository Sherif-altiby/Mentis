<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentSubmissionFactory extends Factory
{
    public function definition()
    {
        return [
            'assignment_id' => 1,
            'student_id' => 2, // John Doe
            'submitted_content' => 'This is the content of the assignment.',
            'grade' => 85,
        ];
    }
}

\App\Models\AssignmentSubmission::factory()->createMany([
    ['assignment_id' => 1, 'student_id' => 2, 'submitted_content' => 'Another submission content.', 'grade' => 90],
    ['assignment_id' => 2, 'student_id' => 2, 'submitted_content' => 'More assignment content.', 'grade' => 75],
    ['assignment_id' => 2, 'student_id' => 5, 'submitted_content' => 'Some other content.', 'grade' => 80],
    ['assignment_id' => 3, 'student_id' => 5, 'submitted_content' => 'Different assignment content.', 'grade' => 88],
    ['assignment_id' => 3, 'student_id' => 5, 'submitted_content' => 'Final submission content.', 'grade' => 92],
]);
