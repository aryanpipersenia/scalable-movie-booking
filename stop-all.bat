@echo off
echo =======================================================
echo     Shutting down Scalable Movie Booking...
echo =======================================================

echo [1/3] Stopping Docker Infrastructure...
docker-compose stop

echo [2/3] Closing Microservice Terminal Windows...
:: This looks for windows with the exact titles we gave them in start-all.bat and forcefully closes them
taskkill /F /FI "WINDOWTITLE eq Eureka Server*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq API Gateway*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Identity Service*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Catalog Service*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Booking Service*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Payment Service*" /T >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Notification Service*" /T >nul 2>&1

echo [3/3] Closing React Frontend...
taskkill /F /FI "WINDOWTITLE eq React Frontend*" /T >nul 2>&1

echo =======================================================
echo Architecture successfully shut down!
echo =======================================================
pause