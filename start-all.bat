@echo off
echo =======================================================
echo     Starting Scalable Movie Booking Architecture...
echo =======================================================

echo [1/4] Starting Docker Infrastructure (MySQL, Redis, RabbitMQ)...
docker-compose up -d
:: Wait 15 seconds for databases to fully initialize
timeout /t 15 /nobreak >nul

echo [2/4] Starting Eureka Discovery Server...
start "Eureka Server" cmd /k "cd discovery-server && mvnw spring-boot:run"
:: Wait 15 seconds for Eureka to be ready to accept registrations
timeout /t 15 /nobreak >nul

echo [3/4] Starting Core Microservices...
start "API Gateway" cmd /k "cd api-gateway && mvnw spring-boot:run"
start "Identity Service" cmd /k "cd identity-service && mvnw spring-boot:run"
start "Catalog Service" cmd /k "cd catalog-service && mvnw spring-boot:run"
start "Booking Service" cmd /k "cd booking-service && mvnw spring-boot:run"
start "Payment Service" cmd /k "cd payment-service && mvnw spring-boot:run"
start "Notification Service" cmd /k "cd notification-service && mvnw spring-boot:run"

echo [4/4] Starting React Frontend...
start "React Frontend" cmd /k "cd frontend-react && npm run dev"

echo =======================================================
echo All services have been launched in separate windows!
echo It may take another minute for all of them to fully boot.
echo =======================================================
pause