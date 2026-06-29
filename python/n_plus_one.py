import mysql.connector
import time

# Database Connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mayu@2005",   # <-- Replace with your MySQL password
    database="college_db"
)

cursor = conn.cursor()

# -----------------------------
# Version 1 : N+1 Query Problem
# -----------------------------
print("Version 1 : N+1 Query")

start = time.time()

query_count = 1

cursor.execute("SELECT * FROM enrollments")
enrollments = cursor.fetchall()

for row in enrollments:
    student_id = row[1]

    cursor.execute(
        "SELECT first_name,last_name FROM students WHERE student_id=%s",
        (student_id,)
    )

    cursor.fetchone()
    query_count += 1

end = time.time()

print("Queries Executed :", query_count)
print("Execution Time :", round(end-start,5), "seconds")


# -----------------------------
# Version 2 : Single JOIN Query
# -----------------------------
print("\nVersion 2 : JOIN")

start = time.time()

cursor.execute("""
SELECT
s.first_name,
s.last_name,
c.course_name
FROM enrollments e
JOIN students s
ON e.student_id=s.student_id
JOIN courses c
ON e.course_id=c.course_id
""")

cursor.fetchall()

end = time.time()

print("Queries Executed : 1")
print("Execution Time :", round(end-start,5), "seconds")

cursor.close()
conn.close()