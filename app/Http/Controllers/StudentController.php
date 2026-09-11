<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display all students.
     */
    public function index()
    {
        $students = Student::all();

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    /**
     * Store a new student.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'program' => 'required|string|max:255',
            'gender' => 'required|string',
            'birthdate' => 'required|date',
            'year_level' => 'required|integer|min:1|max:4',
        ]);

        Student::create($validated);

        return redirect()->route('students.index');
    }

    /**
     * Update an existing student.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'program' => 'required|string|max:255',
            'gender' => 'required|string',
            'birthdate' => 'required|date',
            'year_level' => 'required|integer|min:1|max:4',
        ]);

        $student->update($validated);

        return redirect()->route('students.index');
    }

    /**
     * Delete a student.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index');
    }
}