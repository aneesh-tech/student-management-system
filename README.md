# Student Management System using Node.js Microservices

## Project Overview
A production-style microservices architecture for managing students, courses, and enrollments.

### Architecture Diagram
```text
[ Client ] -> [ API Gateway (5000) ]
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
- **Swagger UI**: `http://localhost:5000/api-docs` (via Gateway) or individual service ports.
- **GraphQL**: `http://localhost:5000/graphql` (needs further federation or individual access).
  - Auth: `http://localhost:5001/graphql`
  - Student: `http://localhost:5002/graphql`
  - Course: `http://localhost:5003/graphql`
  - Enrollment: `http://localhost:5004/graphql`

## License
MIT
