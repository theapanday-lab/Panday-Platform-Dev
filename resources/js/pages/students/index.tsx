import { Head, useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    gender: string;
    birthdate: string;
    year_level: number;
    age: number | null;
};

type Props = {
    students: Student[];
};

export default function Index({ students }: Props) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

   const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        program: '',
        gender: '',
        birthdate: '',
        year_level: '',
    });

    // ADD STUDENT
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/students', {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    // OPEN EDIT DIALOG
    const editStudent = (student: Student) => {
        setEditingStudent(student);

        setData({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            program: student.program,
            gender: student.gender,
            birthdate: student.birthdate.substring(0, 10),
            year_level: String(student.year_level),
        });

        setEditOpen(true);
    };


const deleteStudent = (student: Student) => {
    if (
        confirm(
            `Are you sure you want to delete ${student.first_name} ${student.last_name}?`,
        )
    ) {
        destroy(`/students/${student.id}`);
    }
};

    // UPDATE STUDENT
    const updateStudent = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingStudent) return;

        put(`/students/${editingStudent.id}`, {
            onSuccess: () => {
                setEditOpen(false);
                setEditingStudent(null);
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Students" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Student Management
                        </h1>

                        <p className="text-muted-foreground">
                            Manage your students.
                        </p>
                    </div>

                    {/* ADD STUDENT DIALOG */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Add Student</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[500px]">
                            <form onSubmit={submit}>
                                <DialogHeader>
                                    <DialogTitle>
                                        Add Student
                                    </DialogTitle>

                                    <DialogDescription>
                                        Enter the student's information below.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name">
                                            First Name
                                        </Label>

                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    'first_name',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {errors.first_name && (
                                            <p className="text-sm text-red-500">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name">
                                            Last Name
                                        </Label>

                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    'last_name',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {errors.last_name && (
                                            <p className="text-sm text-red-500">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email
                                        </Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {errors.email && (
                                            <p className="text-sm text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="program">
                                            Program
                                        </Label>

                                        <Input
                                            id="program"
                                            placeholder="e.g. BSIS"
                                            value={data.program}
                                            onChange={(e) =>
                                                setData(
                                                    'program',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {errors.program && (
                                            <p className="text-sm text-red-500">
                                                {errors.program}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Gender</Label>

                                        <Select
                                            value={data.gender}
                                            onValueChange={(value) =>
                                                setData('gender', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Male">
                                                    Male
                                                </SelectItem>

                                                <SelectItem value="Female">
                                                    Female
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {errors.gender && (
                                            <p className="text-sm text-red-500">
                                                {errors.gender}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="birthdate">
                                            Birthdate
                                        </Label>

                                        <Input
                                            id="birthdate"
                                            type="date"
                                            value={data.birthdate}
                                            onChange={(e) =>
                                                setData(
                                                    'birthdate',
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        {errors.birthdate && (
                                            <p className="text-sm text-red-500">
                                                {errors.birthdate}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Year Level</Label>

                                        <Select
                                            value={data.year_level}
                                            onValueChange={(value) =>
                                                setData(
                                                    'year_level',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year level" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1st Year
                                                </SelectItem>

                                                <SelectItem value="2">
                                                    2nd Year
                                                </SelectItem>

                                                <SelectItem value="3">
                                                    3rd Year
                                                </SelectItem>

                                                <SelectItem value="4">
                                                    4th Year
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {errors.year_level && (
                                            <p className="text-sm text-red-500">
                                                {errors.year_level}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Student'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* STUDENTS TABLE */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Birthdate</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        {student.first_name}{' '}
                                        {student.last_name}
                                    </TableCell>

                                    <TableCell>
                                        {student.email}
                                    </TableCell>

                                    <TableCell>
                                        {student.program}
                                    </TableCell>

                                    <TableCell>
                                        {student.gender}
                                    </TableCell>

                                    <TableCell>
                                        {student.birthdate}
                                    </TableCell>

                                    <TableCell>
                                        {student.year_level}
                                    </TableCell>

                                        <TableCell>
                                            {student.age ?? 'N/A'}
                                        </TableCell>

                                        <TableCell className="space-x-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => editStudent(student)}
        >
            Edit
        </Button>

        <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteStudent(student)}
        >
            Delete
        </Button>
    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {students.length === 0 && (
                    <p className="py-8 text-center text-muted-foreground">
                        No students found.
                    </p>
                )}

                {/* EDIT STUDENT DIALOG */}
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={updateStudent}>
                            <DialogHeader>
                                <DialogTitle>
                                    Edit Student
                                </DialogTitle>

                                <DialogDescription>
                                    Update the student's information below.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit_first_name">
                                        First Name
                                    </Label>

                                    <Input
                                        id="edit_first_name"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                'first_name',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.first_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.first_name}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit_last_name">
                                        Last Name
                                    </Label>

                                    <Input
                                        id="edit_last_name"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData(
                                                'last_name',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.last_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.last_name}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit_email">
                                        Email
                                    </Label>

                                    <Input
                                        id="edit_email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit_program">
                                        Program
                                    </Label>

                                    <Input
                                        id="edit_program"
                                        value={data.program}
                                        onChange={(e) =>
                                            setData(
                                                'program',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.program && (
                                        <p className="text-sm text-red-500">
                                            {errors.program}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label>Gender</Label>

                                    <Select
                                        value={data.gender}
                                        onValueChange={(value) =>
                                            setData('gender', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Male">
                                                Male
                                            </SelectItem>

                                            <SelectItem value="Female">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.gender && (
                                        <p className="text-sm text-red-500">
                                            {errors.gender}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit_birthdate">
                                        Birthdate
                                    </Label>

                                    <Input
                                        id="edit_birthdate"
                                        type="date"
                                        value={data.birthdate}
                                        onChange={(e) =>
                                            setData(
                                                'birthdate',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.birthdate && (
                                        <p className="text-sm text-red-500">
                                            {errors.birthdate}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label>Year Level</Label>

                                    <Select
                                        value={data.year_level}
                                        onValueChange={(value) =>
                                            setData(
                                                'year_level',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select year level" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="1">
                                                1st Year
                                            </SelectItem>

                                            <SelectItem value="2">
                                                2nd Year
                                            </SelectItem>

                                            <SelectItem value="3">
                                                3rd Year
                                            </SelectItem>

                                            <SelectItem value="4">
                                                4th Year
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.year_level && (
                                        <p className="text-sm text-red-500">
                                            {errors.year_level}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Student'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
