use college_db;
-- ============================================
-- TASK 1 : SUBQUERIES
-- ============================================

-- 35. Students enrolled in more courses than the average
SELECT
    s.student_id,
    s.first_name,
    s.last_name
FROM students s
JOIN enrollments e
ON s.student_id = e.student_id
GROUP BY s.student_id, s.first_name, s.last_name
HAVING COUNT(*) >
(
    SELECT AVG(course_count)
    FROM
    (
        SELECT COUNT(*) AS course_count
        FROM enrollments
        GROUP BY student_id
    ) avg_table
);

-- 36. Courses where all students received grade A
SELECT c.course_name
FROM courses c
WHERE NOT EXISTS
(
    SELECT *
    FROM enrollments e
    WHERE e.course_id = c.course_id
    AND (e.grade <> 'A' OR e.grade IS NULL)
);

-- 37. Highest paid professor in each department
SELECT
    p.prof_name,
    p.department_id,
    p.salary
FROM professors p
WHERE salary =
(
    SELECT MAX(salary)
    FROM professors p2
    WHERE p2.department_id = p.department_id
);

-- 38. Departments whose average salary exceeds 85000
SELECT *
FROM
(
    SELECT
        department_id,
        AVG(salary) AS avg_salary
    FROM professors
    GROUP BY department_id
) dept_avg
WHERE avg_salary > 85000;
-- ============================================
-- TASK 2 : VIEWS
-- ============================================

-- 39. Student Enrollment Summary View
CREATE VIEW vw_student_enrollment_summary AS
SELECT
    s.student_id,
    CONCAT(s.first_name,' ',s.last_name) AS student_name,
    d.dept_name,
    COUNT(e.course_id) AS total_courses,
    ROUND(AVG(
        CASE
            WHEN e.grade='A' THEN 4
            WHEN e.grade='B' THEN 3
            WHEN e.grade='C' THEN 2
            WHEN e.grade='D' THEN 1
            WHEN e.grade='F' THEN 0
        END
    ),2) AS GPA
FROM students s
LEFT JOIN departments d
ON s.department_id=d.department_id
LEFT JOIN enrollments e
ON s.student_id=e.student_id
GROUP BY s.student_id,s.first_name,s.last_name,d.dept_name;

-- 40. Course Statistics View
CREATE VIEW vw_course_stats AS
SELECT
    c.course_name,
    c.course_code,
    COUNT(e.enrollment_id) AS total_enrollments,
    ROUND(AVG(
        CASE
            WHEN e.grade='A' THEN 4
            WHEN e.grade='B' THEN 3
            WHEN e.grade='C' THEN 2
            WHEN e.grade='D' THEN 1
            WHEN e.grade='F' THEN 0
        END
    ),2) AS avg_gpa
FROM courses c
LEFT JOIN enrollments e
ON c.course_id=e.course_id
GROUP BY c.course_id,c.course_name,c.course_code;

-- 41. Students with GPA greater than 3
SELECT *
FROM vw_student_enrollment_summary
WHERE GPA > 3;

-- 42. Multi-table views are generally not updatable because
-- they are derived from multiple base tables and aggregated data.

-- 43. Drop and recreate the view with CHECK OPTION
DROP VIEW vw_student_enrollment_summary;

CREATE VIEW vw_student_enrollment_summary AS
SELECT
    student_id,
    first_name,
    last_name,
    department_id
FROM students
WHERE department_id = 1
WITH CHECK OPTION;
SELECT * FROM vw_course_stats;
-- ============================================
-- TASK 3 : STORED PROCEDURES & TRANSACTIONS
-- ============================================

DELIMITER $$

CREATE PROCEDURE sp_enroll_student(
    IN p_student_id INT,
    IN p_course_id INT,
    IN p_enrollment_date DATE
)
BEGIN
    IF EXISTS (
        SELECT 1
        FROM enrollments
        WHERE student_id = p_student_id
        AND course_id = p_course_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student is already enrolled in this course';
    ELSE
        INSERT INTO enrollments(student_id, course_id, enrollment_date, grade)
        VALUES (p_student_id, p_course_id, p_enrollment_date, NULL);
    END IF;
END$$

DELIMITER ;
CALL sp_enroll_student(9,2,'2024-07-01');
SELECT * FROM enrollments WHERE student_id = 9;
CALL sp_enroll_student(9,2,'2024-07-01');
-- ============================================
-- QUESTION 45
-- Department Transfer Log
-- ============================================

CREATE TABLE department_transfer_log(
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    old_department INT,
    new_department INT,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

START TRANSACTION;

UPDATE students
SET department_id = 2
WHERE student_id = 1;

INSERT INTO department_transfer_log
(student_id,old_department,new_department)
VALUES(1,1,2);

COMMIT;

-- ============================================
-- QUESTION 46
-- Rollback Example
-- ============================================

START TRANSACTION;

UPDATE students
SET department_id = 3
WHERE student_id = 2;

ROLLBACK;

-- ============================================
-- QUESTION 47
-- Savepoint Example
-- ============================================

START TRANSACTION;

INSERT INTO enrollments
(student_id,course_id,enrollment_date,grade)
VALUES(10,2,'2024-07-02',NULL);

SAVEPOINT sp1;

INSERT INTO enrollments
(student_id,course_id,enrollment_date,grade)
VALUES(999,2,'2024-07-02',NULL);

ROLLBACK TO sp1;

COMMIT;