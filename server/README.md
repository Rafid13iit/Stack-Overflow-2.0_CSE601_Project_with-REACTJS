# Stack Overflow 2.0 Backend Microservices

This project implements a microservices architecture for a Stack Overflow-like application. It consists of three main services: User Service, Post Service, and Notification Service.

## Services

### User Service (Port 5000)
- Handles user authentication and profile management
- JWT-based authentication
- MongoDB for data persistence

### Post Service (Port 5001)
- Manages posts and code snippets
- Integrates with MinIO for file storage
- Communicates with notification service for updates

### Notification Service (Port 5002)
- Manages user notifications
- Automated cleanup of old notifications
- Event-driven architecture

## Infrastructure
- MongoDB for data storage
- MinIO for file storage
- Docker Compose for orchestration

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Set up environment variables
- Copy the .env.example files in each service directory to .env
- Update the variables as needed

3. Run the services
```bash
docker-compose up --build
```

## API Documentation

### User Service
- POST /api/users - Register new user
- POST /api/users/login - User login
- POST /api/users/logout - User logout
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Post Service
- GET /api/posts - Get all posts
- POST /api/posts - Create new post
- GET /api/posts/:id - Get post by ID

### Notification Service
- GET /api/notifications - Get user notifications
- GET /api/notifications/unread-count - Get unread notification count
- POST /api/notifications/mark-as-read - Mark notifications as read
- DELETE /api/notifications/:id - Delete notification

## Development

Each service can be developed independently. To run a single service:

1. Navigate to the service directory
```bash
cd user # or post or notification
```

2. Install dependencies
```bash
npm install
```

3. Start the service
```bash
npm run dev
```

## Deployment
The application is containerized and can be deployed to any container orchestration platform.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request