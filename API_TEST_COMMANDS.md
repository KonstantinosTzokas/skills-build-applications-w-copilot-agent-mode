# OctoFit Tracker API Test Commands

## Environment Setup
- **Codespace Name**: `${CODESPACE_NAME}` (currently: orange-space-goggles-p975r9p75vqcrxq)
- **Local URL**: `http://localhost:8000`
- **Codespace URL**: `https://${CODESPACE_NAME}-8000.app.github.dev`
- **API Prefix**: `/api/`

## Test Commands

### 1. Test API Root Endpoint (Localhost)
```bash
curl http://localhost:8000/api/
```

### 2. Test API Root Endpoint (Codespace)
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/
```

### 3. Get All Activities
```bash
curl http://localhost:8000/api/activities/
```

### 4. Get All Teams
```bash
curl http://localhost:8000/api/teams/
```

### 5. Get All Users
```bash
curl http://localhost:8000/api/users/
```

### 6. Get All Leaderboard Entries
```bash
curl http://localhost:8000/api/leaderboard/
```

### 7. Get All Workouts
```bash
curl http://localhost:8000/api/workouts/
```

### 8. Test with Pretty-Printed JSON
```bash
curl http://localhost:8000/api/activities/ | jq
```

### 9. Get Specific Activity (ID=1)
```bash
curl http://localhost:8000/api/activities/1/
```

### 10. Test with Codespace URL
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/
```

## Troubleshooting

### SSL/TLS Certificate Errors
Codespace endpoints have valid certificates and `curl` should work without any special flags. If you encounter an SSL certificate error (e.g., in unusual network environments), you can temporarily disable TLS verification as a last resort:

> ⚠️ **Warning**: The `-k` / `--insecure` flag disables TLS certificate verification and should **never** be used in production or as a habit. It exposes you to man-in-the-middle attacks. Only use it for local debugging when you understand the risks.

```bash
# Last resort only — not recommended
curl -k https://${CODESPACE_NAME}-8000.app.github.dev/api/
```

## How to Run Tests

Replace `${CODESPACE_NAME}` with the actual codespace name if needed: `orange-space-goggles-p975r9p75vqcrxq`

### Quick Test
Copy and paste this to test all endpoints on localhost:
```bash
echo "=== API Root ===" && curl http://localhost:8000/api/
echo -e "\n\n=== Activities ===" && curl http://localhost:8000/api/activities/
echo -e "\n\n=== Teams ===" && curl http://localhost:8000/api/teams/
echo -e "\n\n=== Users ===" && curl http://localhost:8000/api/users/
echo -e "\n\n=== Leaderboard ===" && curl http://localhost:8000/api/leaderboard/
echo -e "\n\n=== Workouts ===" && curl http://localhost:8000/api/workouts/
```

## Server Status
- Django server running on `0.0.0.0:8000`
- MongoDB connection configured for `octofit_db`
- All models created and database populated with test data

## Configuration Summary

### Updated Files
1. **settings.py**: Updated ALLOWED_HOSTS to support both localhost and codespace environment
2. **urls.py**: Added environment variable support for base URL construction
3. **populate_db.py**: Fixed model imports to use models from models.py

### API Endpoints Available
- `/api/` - API root
- `/api/users/` - User management
- `/api/teams/` - Team management  
- `/api/activities/` - Activity tracking
- `/api/leaderboard/` - Leaderboard
- `/api/workouts/` - Workout management
- `/admin/` - Django admin panel
