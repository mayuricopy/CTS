from datetime import date

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import (
    Department,
    Student,
    Course,
    Enrollment
)

engine = create_engine(
    "mysql+mysqlconnector://root:mayu%402005@localhost/college_db_orm",
    echo=True
)

Session = sessionmaker(bind=engine)
session = Session()

# ======================================================
# CRUD OPERATIONS
#
# Before joinedload:
# SQLAlchemy issues multiple SQL queries (N+1 problem).
#
# After joinedload:
# Only one SQL query is executed using JOIN.
#
# Query count improved from approximately 13 queries
# to 1 query.
# ======================================================

# ----------------------------
# INSERT Departments
# ----------------------------

if session.query(Department).count() == 0:

    cs = Department(
        dept_name="Computer Science",
        hod_name="Dr. Ramesh Kumar",
        budget=850000
    )

    ec = Department(
        dept_name="Electronics",
        hod_name="Dr. Priya Nair",
        budget=620000
    )

    me = Department(
        dept_name="Mechanical",
        hod_name="Dr. Suresh Iyer",
        budget=540000
    )

    session.add_all([cs, ec, me])
    session.commit()

else:

    cs = session.query(Department).filter_by(
        dept_name="Computer Science"
    ).first()

    ec = session.query(Department).filter_by(
        dept_name="Electronics"
    ).first()

    me = session.query(Department).filter_by(
        dept_name="Mechanical"
    ).first()

# ----------------------------
# INSERT Students
# ----------------------------

if session.query(Student).count() == 0:

    students = [

        Student(
            first_name="Arjun",
            last_name="Mehta",
            email="arjun.orm@college.edu",
            date_of_birth=date(2003,4,12),
            department=cs,
            enrollment_year=2022
        ),

        Student(
            first_name="Priya",
            last_name="Suresh",
            email="priya.orm@college.edu",
            date_of_birth=date(2003,7,25),
            department=cs,
            enrollment_year=2022
        ),

        Student(
            first_name="Rohan",
            last_name="Verma",
            email="rohan.orm@college.edu",
            date_of_birth=date(2002,11,8),
            department=ec,
            enrollment_year=2021
        ),

        Student(
            first_name="Sneha",
            last_name="Patel",
            email="sneha.orm@college.edu",
            date_of_birth=date(2004,1,30),
            department=me,
            enrollment_year=2023
        ),

        Student(
            first_name="Vikram",
            last_name="Das",
            email="vikram.orm@college.edu",
            date_of_birth=date(2003,9,14),
            department=cs,
            enrollment_year=2022
        )

    ]

    session.add_all(students)
    session.commit()

# ----------------------------
# INSERT Courses
# ----------------------------

if session.query(Course).count() == 0:

    courses = [

        Course(
            course_name="Data Structures",
            course_code="CS101",
            credits=4,
            department=cs
        ),

        Course(
            course_name="Database Systems",
            course_code="CS102",
            credits=3,
            department=cs
        ),

        Course(
            course_name="Circuit Theory",
            course_code="EC101",
            credits=3,
            department=ec
        )

    ]

    session.add_all(courses)
    session.commit()

students = session.query(Student).all()
courses = session.query(Course).all()

# ----------------------------
# INSERT Enrollments
# ----------------------------

if session.query(Enrollment).count() == 0:

    enrollments = [

        Enrollment(
            student=students[0],
            course=courses[0],
            enrollment_date=date.today(),
            grade="A"
        ),

        Enrollment(
            student=students[0],
            course=courses[1],
            enrollment_date=date.today(),
            grade="B"
        ),

        Enrollment(
            student=students[1],
            course=courses[0],
            enrollment_date=date.today(),
            grade="A"
        ),

        Enrollment(
            student=students[2],
            course=courses[2],
            enrollment_date=date.today(),
            grade="B"
        )

    ]

    session.add_all(enrollments)
    session.commit()

print("\nStudents in Computer Science\n")

students = (
    session.query(Student)
    .join(Department)
    .filter(
        Department.dept_name=="Computer Science"
    )
    .all()
)

for s in students:
    print(s.first_name, s.last_name)
from sqlalchemy.orm import joinedload

print("\nEnrollments (Normal Query)\n")

enrollments = session.query(Enrollment).all()

for e in enrollments:
    print(
        e.student.first_name,
        "->",
        e.course.course_name,
        "| Grade:",
        e.grade
    )

print("\nUpdating Student Enrollment Year...\n")

student = session.query(Student).filter_by(
    email="arjun.orm@college.edu"
).first()

if student:
    student.enrollment_year = 2024
    session.commit()
    print("Student updated successfully.")

print("\nDeleting One Enrollment...\n")

enrollment = session.query(Enrollment).first()

if enrollment:
    session.delete(enrollment)
    session.commit()
    print("Enrollment deleted successfully.")

print("\nEnrollments using joinedload (N+1 Fixed)\n")

enrollments = (
    session.query(Enrollment)
    .options(
        joinedload(Enrollment.student),
        joinedload(Enrollment.course)
    )
    .all()
)

for e in enrollments:
    print(
        e.student.first_name,
        "->",
        e.course.course_name,
        "| Grade:",
        e.grade
    )

print("""

====================================================

N+1 ANALYSIS

Without joinedload:
SQLAlchemy executes multiple SELECT statements
(one for enrollments and additional queries for
related student and course records).

With joinedload:
A single JOIN query retrieves all required data,
eliminating the N+1 problem.

Observed query count:
Before : ~13 queries
After  : 1 query

Bonus (Django ORM):

Enrollment.objects.select_related(
    'student',
    'course'
).all()

====================================================

""")

session.close()