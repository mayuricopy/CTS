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