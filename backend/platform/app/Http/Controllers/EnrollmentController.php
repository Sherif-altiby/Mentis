<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends Controller
{
    // Admin-only: Set the enrollment price for a course
    public function setCoursePrice(Request $request, $course_id)
    {
        // $this->authorize('admin'); // Ensure the user has admin privileges

        $validator = Validator::make($request->all(), [
            'enrollment_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $course = Course::find($course_id);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        $course->update(['price' => $request->enrollment_price]);

        return response()->json(['message' => 'Course price updated successfully', 'course' => $course]);
    }

    // Student: Enroll in a course
    public function enroll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $course = Course::find($request->course_id);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        $status = $course->price == 0 ? 'active' : 'pending_payment';

        $enrollment = Enrollment::firstOrCreate(
            [
                'student_id' => $request->student_id,
                'course_id' => $request->course_id,
            ],
            [
                'status' => $status,
                'enrollment_date' => now(),
            ]
        );

        if ($course->price == 0) {
            return response()->json(['message' => 'Enrollment activated automatically as the course is free.', 'enrollment' => $enrollment], 201);
        }

        return response()->json(['message' => 'Enrollment created. Awaiting payment.', 'enrollment' => $enrollment], 201);
    }

    // Student: Make a payment for an enrollment
    public function makePayment(Request $request, $id)
    {
        $enrollment = Enrollment::find($id);

        if (!$enrollment) {
            return response()->json(['error' => 'Enrollment not found'], 404);
        }

        if ($enrollment->status == 'active') {
            return response()->json(['message' => 'Enrollment is already active and does not require payment.'], 200);
        }

        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric',
            'currency' => 'required|string|size:3',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string|unique:payments,transaction_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if the payment amount matches the course price
        if ($request->amount != $enrollment->course->price) {
            return response()->json(['error' => 'Payment amount does not match the course price'], 400);
        }

        $payment = Payment::create([
            'enrollment_id' => $enrollment->id,
            'amount' => $request->amount,
            'currency' => $request->currency,
            'payment_method' => $request->payment_method,
            'transaction_id' => $request->transaction_id,
            'status' => 'pending_admin_approval',
            'payment_date' => now(),
        ]);

        return response()->json(['message' => 'Payment created. Awaiting admin approval.', 'payment' => $payment]);
    }

    // Admin: Approve payment and activate enrollment
    public function approvePayment($payment_id)
    {
        // $this->authorize('admin'); // Uncomment when using authorization

        $payment = Payment::find($payment_id);

        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        if ($payment->status !== 'pending_admin_approval') {
            return response()->json(['error' => 'Payment cannot be approved'], 400);
        }

        try {
            $payment->update(['status' => 'completed']);
            $payment->enrollment->update(['status' => 'active']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to approve payment: ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Payment approved and enrollment activated']);
    }

    // Admin: CRUD operations for enrollments
    public function index()
    {
        $enrollments = Enrollment::with(['student', 'course', 'payment'])->get();
        return response()->json($enrollments);
    }

    public function destroy($id)
    {
        // $this->authorize('admin');

        $enrollment = Enrollment::find($id);

        if (!$enrollment) {
            return response()->json(['error' => 'Enrollment not found'], 404);
        }

        $enrollment->payment()->delete();
        $enrollment->delete();

        return response()->json(['message' => 'Enrollment and associated payment deleted successfully']);
    }
}
