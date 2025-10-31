# 🚀 Quick Start Guide - DevOps Pipeline

## TL;DR - Get CI/CD Running in 15 Minutes

### Step 1: Start CI/CD Services (2 minutes)
```bash
# Start Jenkins and SonarQube
docker-compose -f docker-compose.cicd.yml up -d

# Wait for services to start
sleep 30

# Get Jenkins password
docker exec weather-app-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

**Access**:
- Jenkins: http://localhost:8080
- SonarQube: http://localhost:9000

---

### Step 2: Configure Jenkins (5 minutes)

1. **Initial Setup**:
   - Paste admin password
   - Install suggested plugins
   - Create admin user

2. **Install Required Plugins**:
   - Go to: Manage Jenkins → Manage Plugins → Available
   - Search and install:
     - NodeJS Plugin
     - Docker Pipeline
     - SonarQube Scanner
   - Restart Jenkins

3. **Configure Tools** (Manage Jenkins → Global Tool Configuration):
   
   **NodeJS**:
   - Name: `NodeJS-18`
   - Version: 18.x
   
   **Docker**:
   - Name: `docker`
   - Install automatically: ✅
   
   **SonarQube Scanner**:
   - Name: `SonarQubeScanner`
   - Install automatically: ✅

---

### Step 3: Configure SonarQube (3 minutes)

1. **Login**: http://localhost:9000 (admin/admin)
2. **Change password** when prompted
3. **Create Token**:
   - My Account → Security → Generate Token
   - Name: `jenkins-token`
   - Copy the token

4. **Add to Jenkins**:
   - Manage Jenkins → Manage Credentials → Global → Add Credentials
   - Kind: Secret text
   - Secret: [paste token]
   - ID: `sonarqube-token`

5. **Configure SonarQube Server** in Jenkins:
   - Manage Jenkins → Configure System → SonarQube servers
   - Name: `SonarQube`
   - URL: `http://sonarqube:9000`
   - Token: Select `sonarqube-token`

---

### Step 4: Add Docker Hub Credentials (2 minutes)

1. **Get Docker Hub Token**:
   - Login to hub.docker.com
   - Account Settings → Security → New Access Token
   - Copy token

2. **Add to Jenkins**:
   - Manage Jenkins → Manage Credentials → Global
   - Kind: Username with password
   - Username: [your dockerhub username]
   - Password: [paste token]
   - ID: `dockerhub-credentials`

---

### Step 5: Create Pipeline Job (3 minutes)

1. **New Item** → Name: `Weather-App-Pipeline` → Pipeline → OK

2. **Configure**:
   - Description: "CI/CD for Weather App"
   - GitHub project: `https://github.com/Deep-Dey1/GoodForecast`
   
3. **Build Triggers**:
   - ✅ GitHub hook trigger for GITScm polling
   
4. **Pipeline**:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/Deep-Dey1/GoodForecast.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`

5. **Save**

---

### Step 6: Update Jenkinsfile

Open `Jenkinsfile` and replace:
```groovy
DOCKER_IMAGE_BACKEND = 'your-dockerhub-username/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'your-dockerhub-username/weather-app-frontend'
```

With your actual Docker Hub username:
```groovy
DOCKER_IMAGE_BACKEND = 'deepdey/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'deepdey/weather-app-frontend'
```

Commit and push:
```bash
git add Jenkinsfile
git commit -m "Update Docker Hub username"
git push origin main
```

---

### Step 7: Run Pipeline! 🎉

**Option 1: Manual Trigger**
- Go to Jenkins → Weather-App-Pipeline
- Click "Build Now"

**Option 2: Auto Trigger (Setup GitHub Webhook)**
```bash
# In GitHub repo:
Settings → Webhooks → Add webhook
Payload URL: http://your-jenkins-url:8080/github-webhook/
Content type: application/json
Events: Just the push event
```

---

## ✅ Verification Checklist

After pipeline runs successfully:

- [ ] Jenkins build shows ✅ SUCCESS
- [ ] All stages completed (green)
- [ ] SonarQube analysis passed
- [ ] Docker images pushed to Docker Hub
- [ ] No critical bugs or vulnerabilities
- [ ] Code coverage > 70%

---

## 📊 View Results

### Jenkins:
- Console Output: See logs
- Blue Ocean: Visual pipeline
- Test Results: View test reports
- Code Coverage: Coverage reports

### SonarQube:
- Dashboard: http://localhost:9000
- Project: weather-app
- View: Bugs, Vulnerabilities, Code Smells

### Docker Hub:
- Login to hub.docker.com
- View repositories:
  - weather-app-backend
  - weather-app-frontend

---

## 🐛 Quick Troubleshooting

### Jenkins can't connect to Docker?
```bash
# Add jenkins to docker group
docker exec -u root weather-app-jenkins usermod -aG docker jenkins
docker restart weather-app-jenkins
```

### SonarQube not accessible?
```bash
# Check if running
docker ps | grep sonarqube

# Check logs
docker logs weather-app-sonarqube

# Restart
docker restart weather-app-sonarqube
```

### Pipeline fails at npm install?
```bash
# Check Node.js tool configuration
# Ensure NodeJS-18 is configured correctly
# Verify internet connection for npm registry
```

---

## 🎓 Understanding Pipeline Stages

| Stage | Duration | Purpose |
|-------|----------|---------|
| Git Checkout | ~10s | Clone code |
| Install Dependencies | ~60s | npm ci |
| Lint | ~20s | Code quality |
| Tests | ~30s | Run tests |
| Build | ~45s | Build frontend |
| SonarQube | ~60s | Code analysis |
| Quality Gate | ~30s | Check standards |
| Docker Build | ~120s | Build images |
| Push Images | ~90s | Upload to registry |
| Cleanup | ~10s | Clean workspace |

**Total**: ~8-10 minutes

---

## 📝 Common Commands

```bash
# View all running containers
docker ps

# View logs
docker logs weather-app-jenkins
docker logs weather-app-sonarqube

# Restart services
docker-compose -f docker-compose.cicd.yml restart

# Stop everything
docker-compose -f docker-compose.cicd.yml down

# Start fresh (WARNING: deletes data)
docker-compose -f docker-compose.cicd.yml down -v
docker-compose -f docker-compose.cicd.yml up -d

# Build and run application
docker-compose up -d
```

---

## 🌟 Next Steps

1. **Setup Notifications**:
   - Email on build failure
   - Slack integration

2. **Add More Tests**:
   - Increase coverage
   - Add integration tests

3. **Enhance Pipeline**:
   - Add security scanning
   - Implement deployment stages
   - Add performance tests

4. **Monitor**:
   - Track build metrics
   - Monitor Docker images
   - Review SonarQube trends

---

## 📚 Full Documentation

For detailed information, see:
- [JENKINS_SETUP.md](./JENKINS_SETUP.md) - Complete Jenkins guide
- [DEVOPS_OVERVIEW.md](./DEVOPS_OVERVIEW.md) - DevOps architecture
- [DEPLOY.md](./DEPLOY.md) - Deployment instructions

---

**Need help?** Check [JENKINS_SETUP.md](./JENKINS_SETUP.md) Troubleshooting section!

---

Last Updated: October 31, 2025
