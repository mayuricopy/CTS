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