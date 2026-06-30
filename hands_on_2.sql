-- ============================================
-- TASK 1 : INSERT, UPDATE & DELETE
-- ============================================

-- Insert two new students
INSERT INTO students
(first_name, last_name, email, date_of_birth, department_id, enrollment_year)
VALUES
('mayuri','babu','mayuribabu@college.edu','2006-01-05',1,2024),
('rahu','sharma','rahusharma@college.edu','2005-09-15',2,2024);

-- Update grade
UPDATE enrollments
SET grade='B'
WHERE student_id=5
AND course_id=1;

-- Delete enrollments with NULL grades
DELETE FROM enrollments
WHERE grade IS NULL;

-- Verify row counts
SELECT COUNT(*) AS TotalStudents FROM students;
SELECT COUNT(*) AS TotalEnrollments FROM enrollments;
SELECT @@SQL_SAFE_UPDATES;
SELECT * 
FROM enrollments
WHERE grade IS NULL;
use college_db;
-- ============================================
-- TASK 2 : SELECT, WHERE, ORDER BY & LIKE
-- ============================================

-- 20. Retrieve all students enrolled in 2022
SELECT *
FROM students
WHERE enrollment_year = 2022
ORDER BY last_name ASC;

-- 21. Find all courses with more than 3 credits
SELECT *
FROM courses
WHERE credits > 3
ORDER BY credits DESC;

-- 22. List professors with salary between 80000 and 95000
SELECT *
FROM professors
WHERE salary BETWEEN 80000 AND 95000;

-- 23. Students whose email ends with @college.edu
SELECT *
FROM students
WHERE email LIKE '%@college.edu';

-- 24. Count students per enrollment year
SELECT enrollment_year,
COUNT(*) AS total_students
FROM students
GROUP BY enrollment_year;
-- ============================================
-- TASK 3 : JOINS
-- ============================================

-- 25. Student name with department
SELECT
    CONCAT(s.first_name, ' ', s.last_name) AS Student_Name,
    d.dept_name AS Department
FROM students s
INNER JOIN departments d
ON s.department_id = d.department_id;

-- 26. Student name with enrolled course
SELECT
    CONCAT(s.first_name, ' ', s.last_name) AS Student_Name,
    c.course_name
FROM enrollments e
INNER JOIN students s
ON e.student_id = s.student_id
INNER JOIN courses c
ON e.course_id = c.course_id;

-- 27. Students not enrolled in any course
SELECT
    s.student_id,
    s.first_name,
    s.last_name
FROM students s
LEFT JOIN enrollments e
ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

-- 28. Every course with number of students enrolled
SELECT
    c.course_name,
    COUNT(e.student_id) AS Total_Students
FROM courses c
LEFT JOIN enrollments e
ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name;

-- 29. Department with professors and salary
SELECT
    d.dept_name,
    p.prof_name,
    p.salary
FROM departments d
LEFT JOIN professors p
ON d.department_id = p.department_id;
-- ============================================
-- TASK 4 : AGGREGATIONS & GROUP BY
-- ============================================

-- 30. Total enrollments per course
SELECT
    c.course_name,
    COUNT(e.enrollment_id) AS enrollment_count
FROM courses c
LEFT JOIN enrollments e
ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name;

-- 31. Average professor salary per department
SELECT
    d.dept_name,
    ROUND(AVG(p.salary),2) AS average_salary
FROM departments d
LEFT JOIN professors p
ON d.department_id = p.department_id
GROUP BY d.department_id, d.dept_name;

-- 32. Departments with budget greater than 600000
SELECT
    dept_name,
    budget
FROM departments
WHERE budget > 600000;

-- 33. Grade distribution for CS101
SELECT
    e.grade,
    COUNT(*) AS total_students
FROM enrollments e
JOIN courses c
ON e.course_id = c.course_id
WHERE c.course_code='CS101'
GROUP BY e.grade;

-- 34. Departments having more than 2 students
SELECT
    d.dept_name,
    COUNT(s.student_id) AS total_students
FROM departments d
JOIN students s
ON d.department_id=s.department_id
GROUP BY d.department_id,d.dept_name
HAVING COUNT(s.student_id)>2;
