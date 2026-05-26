# Student Management System using Node.js Microservices

## Project Overview
A production-style microservices architecture for managing students, courses, and enrollments.

### Architecture Diagram
```text
[ Client ] -> [ API Gateway (5050 -> 5000 internal) ]
                    |
      -------------------------------------
      |             |             |       |
[ Auth (5001) ] [ Student (5002) ] [ Course (5003) ] [ Enrollment (5004) ]
      |             |             |       |
      -------------------------------------
                    |
               [ MongoDB ]
```

## Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Communication**: REST APIs, GraphQL
- **Security**: JWT, bcrypt
- **Documentation**: Swagger UI
- **Deployment**: Docker, Docker Compose

## Installation & Running

### Prerequisites
- Docker & Docker Compose

### Running with Docker Compose
```bash
docker-compose up --build
```

### API Endpoints
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Students**: `GET /api/students`, `POST /api/students`, `PUT /api/students/:id`, `DELETE /api/students/:id`
- **Courses**: `GET /api/courses`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`
- **Enrollments**: `POST /api/enrollments`, `GET /api/enrollments`, `DELETE /api/enrollments/:id`

### Documentation
- **Gateway API base URL**: `http://localhost:5050/api`
- **Swagger UI (per service)**:
  - Auth: `http://localhost:5001/api-docs`
  - Student: `http://localhost:5002/api-docs`
  - Course: `http://localhost:5003/api-docs`
  - Enrollment: `http://localhost:5004/api-docs`
- **GraphQL (per service)**:
  - Auth: `http://localhost:5001/graphql`
  - Student: `http://localhost:5002/graphql`
  - Course: `http://localhost:5003/graphql`
  - Enrollment: `http://localhost:5004/graphql`

## License
MIT
