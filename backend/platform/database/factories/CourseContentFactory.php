<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseContentFactory extends Factory
{
    public function definition()
    {
        return [
            'course_id' => \App\Models\Course::factory(),
            'file_id'=>1,
            'content_type' => $this->faker->randomElement(['video', 'document', 'quiz']),
            'title' => $this->faker->sentence,
            'image' => $this->faker->image(null, 640, 480, null, false),
            'file_path' => $this->faker->filePath(),
            'content' => $this->faker->paragraph,
            'order' => $this->faker->numberBetween(1, 10),
            'level' => $this->faker->randomElement(['first', 'second', 'third']),
        ];
    }
}
