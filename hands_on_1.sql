USE college_db;

-- ===========================
-- DEPARTMENTS TABLE
-- ===========================
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2)
);

-- ===========================
-- STUDENTS TABLE
-- ===========================
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

-- ===========================
-- COURSES TABLE
-- ===========================
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

-- ===========================
-- ENROLLMENTS TABLE
-- ===========================
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id)
        REFERENCES students(student_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);

-- ===========================
-- PROFESSORS TABLE
-- ===========================
CREATE TABLE professors (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);
show tables;
-- ===========================
-- INSERT INTO DEPARTMENTS
-- ===========================
INSERT INTO departments (dept_name, hod_name, budget) VALUES
('Computer Science', 'Dr. Ramesh Kumar', 850000.00),
('Electronics', 'Dr. Priya Nair', 620000.00),
('Mechanical', 'Dr. Suresh Iyer', 540000.00),
('Civil', 'Dr. Ananya Sharma', 430000.00);

-- ===========================
-- INSERT INTO STUDENTS
-- ===========================
INSERT INTO students
(first_name,last_name,email,date_of_birth,department_id,enrollment_year)
VALUES
('Arjun','Mehta','arjun.mehta@college.edu','2003-04-12',1,2022),
('Priya','Suresh','priya.suresh@college.edu','2003-07-25',1,2022),
('Rohan','Verma','rohan.verma@college.edu','2002-11-08',2,2021),
('Sneha','Patel','sneha.patel@college.edu','2004-01-30',3,2023),
('Vikram','Das','vikram.das@college.edu','2003-09-14',1,2022),
('Kavya','Menon','kavya.menon@college.edu','2002-05-17',2,2021),
('Aditya','Singh','aditya.singh@college.edu','2004-03-22',4,2023),
('Deepika','Rao','deepika.rao@college.edu','2003-08-09',1,2022);

-- ===========================
-- INSERT INTO COURSES
-- ===========================
INSERT INTO courses
(course_name,course_code,credits,department_id)
VALUES
('Data Structures & Algorithms','CS101',4,1),
('Database Management Systems','CS102',3,1),
('Object Oriented Programming','CS103',4,1),
('Circuit Theory','EC101',3,2),
('Thermodynamics','ME101',3,3);

-- ===========================
-- INSERT INTO ENROLLMENTS
-- ===========================
INSERT INTO enrollments
(student_id,course_id,enrollment_date,grade)
VALUES
(1,1,'2022-07-01','A'),
(1,2,'2022-07-01','B'),
(2,1,'2022-07-01','B'),
(2,3,'2022-07-01','A'),
(3,4,'2021-07-01','A'),
(4,5,'2023-07-01',NULL),
(5,1,'2022-07-01','C'),
(5,2,'2022-07-01','A'),
(6,4,'2021-07-01','B'),
(7,5,'2023-07-01',NULL),
(8,1,'2022-07-01','A'),
(8,3,'2022-07-01','B');

-- ===========================
-- INSERT INTO PROFESSORS
-- ===========================
INSERT INTO professors
(prof_name,email,department_id,salary)
VALUES
('Dr. Anand Krishnan','anand.k@college.edu',1,95000.00),
('Dr. Meena Pillai','meena.p@college.edu',1,88000.00),
('Dr. Sunil Rajan','sunil.r@college.edu',2,82000.00),
('Dr. Latha Gopal','latha.g@college.edu',3,79000.00),
('Dr. Kartik Bose','kartik.b@college.edu',4,76000.00);
SELECT COUNT(*) FROM departments;
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM courses;
SELECT COUNT(*) FROM enrollments;
SELECT COUNT(*) FROM professors;
-- =====================================================
-- NORMALIZATION ANALYSIS
-- =====================================================

-- 1NF (First Normal Form)
-- Every table contains atomic values.
-- Each column stores a single value only.
-- Example: Multiple phone numbers are NOT stored in one field.

-- 2NF (Second Normal Form)
-- All non-key attributes are fully dependent on the primary key.
-- In the enrollments table, student_id and course_id identify
-- each enrollment, while enrollment_date and grade depend on
-- that enrollment.

-- 3NF (Third Normal Form)
-- There are no transitive dependencies.
-- Department information is stored only in the departments table.
-- The students table stores only department_id instead of dept_name.
-- This avoids redundancy and maintains data consistency.

-- 3NF Analysis for Enrollments Table
-- The enrollments table satisfies 3NF because grade and
-- enrollment_date depend only on the enrollment record.
-- No non-key attribute depends on another non-key attribute.
-- =====================================================
-- HANDS-ON 1 : TASK 3 - ALTER TABLE
-- =====================================================

-- Add phone_number column
ALTER TABLE students
ADD phone_number VARCHAR(15);

-- Add max_seats column
ALTER TABLE courses
ADD max_seats INT DEFAULT 60;

-- Add CHECK constraint
ALTER TABLE enrollments
ADD CONSTRAINT chk_grade
CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL);

-- Rename hod_name column
ALTER TABLE departments
RENAME COLUMN hod_name TO head_of_dept;

-- Drop phone_number column
ALTER TABLE students
DROP COLUMN phone_number;