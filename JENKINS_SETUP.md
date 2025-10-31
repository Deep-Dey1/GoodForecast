# Jenkins CI/CD Pipeline Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Jenkins Installation](#jenkins-installation)
3. [Required Plugins](#required-plugins)
4. [Tool Configuration](#tool-configuration)
5. [SonarQube Setup](#sonarqube-setup)
6. [Pipeline Configuration](#pipeline-configuration)
7. [Docker Hub Integration](#docker-hub-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS**: Linux (Ubuntu 20.04+), Windows Server, or macOS
- **RAM**: Minimum 2GB (4GB+ recommended)
- **Java**: OpenJDK 11 or 17
- **Docker**: Docker Engine 20.10+
- **Node.js**: v18+
- **Git**: Latest version

### Required Accounts
- GitHub account with repository access
- Docker Hub account (for image registry)
- SonarQube server or SonarCloud account

---

## Jenkins Installation

### Option 1: Docker Installation (Recommended)

```bash
# Pull Jenkins LTS image
docker pull jenkins/jenkins:lts

# Create volume for Jenkins data
docker volume create jenkins-data

# Run Jenkins container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart unless-stopped \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Option 2: Ubuntu/Debian Installation

```bash
# Add Jenkins repository
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Install Jenkins
sudo apt-get update
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Option 3: Windows Installation

1. Download Jenkins WAR file or Windows installer from: https://www.jenkins.io/download/
2. Install Java 11 or 17 if not already installed
3. Run the installer and follow the wizard
4. Access Jenkins at http://localhost:8080

---

## Required Plugins

### Install from Jenkins UI:
**Manage Jenkins → Manage Plugins → Available**

1. **Essential Plugins** (install these first):
   - Git Plugin
   - Pipeline
   - Pipeline: Stage View
   - Credentials Binding Plugin
   - Docker Pipeline
   - Docker Plugin

2. **Build Tools**:
   - NodeJS Plugin
   - npm Integration

3. **Code Quality**:
   - SonarQube Scanner
   - Warnings Next Generation Plugin

4. **Notifications** (optional):
   - Email Extension Plugin
   - Slack Notification Plugin

5. **Additional Utilities**:
   - Blue Ocean (modern UI)
   - Build Timeout Plugin
   - Timestamper
   - Workspace Cleanup Plugin

### Install via Jenkins CLI:

```bash
# List of plugins to install
plugins=(
  "git"
  "workflow-aggregator"
  "docker-workflow"
  "docker-plugin"
  "nodejs"
  "sonar"
  "email-ext"
  "blueocean"
)

# Install plugins
for plugin in "${plugins[@]}"; do
  java -jar jenkins-cli.jar -s http://localhost:8080/ install-plugin $plugin
done

# Restart Jenkins
java -jar jenkins-cli.jar -s http://localhost:8080/ safe-restart
```

---

## Tool Configuration

### 1. Configure Node.js

**Manage Jenkins → Global Tool Configuration → NodeJS**

- Click "Add NodeJS"
- Name: `NodeJS-18`
- Version: Select `NodeJS 18.x`
- Global npm packages to install: `npm@latest`
- Click "Save"

### 2. Configure Git

**Manage Jenkins → Global Tool Configuration → Git**

- Name: `Default`
- Path to Git executable: `/usr/bin/git` (or `C:\Program Files\Git\bin\git.exe` on Windows)
- Click "Save"

### 3. Configure Docker

**Manage Jenkins → Global Tool Configuration → Docker**

- Click "Add Docker"
- Name: `docker`
- Install automatically: Check
- Click "Save"

### 4. Configure SonarQube Scanner

**Manage Jenkins → Global Tool Configuration → SonarQube Scanner**

- Click "Add SonarQube Scanner"
- Name: `SonarQubeScanner`
- Install automatically: Check
- Version: Select latest
- Click "Save"

---

## SonarQube Setup

### Option 1: SonarQube with Docker

```bash
# Run SonarQube container
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_logs:/opt/sonarqube/logs \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  --restart unless-stopped \
  sonarqube:lts-community

# Access SonarQube at http://localhost:9000
# Default credentials: admin/admin (change on first login)
```

### Option 2: SonarCloud (Cloud-based)

1. Go to https://sonarcloud.io
2. Sign up with GitHub
3. Create new project
4. Generate token

### Configure SonarQube in Jenkins

**Manage Jenkins → Configure System → SonarQube servers**

1. Click "Add SonarQube"
2. Name: `SonarQube`
3. Server URL: `http://localhost:9000` (or SonarCloud URL: `https://sonarcloud.io`)
4. Server authentication token:
   - Create token in SonarQube: **Administration → Security → Users → Tokens**
   - Add token to Jenkins credentials
   - Select the credential
5. Click "Save"

### Generate SonarQube Token:

```bash
# In SonarQube UI:
# 1. Go to My Account → Security → Generate Token
# 2. Name: jenkins-token
# 3. Copy the token

# Add to Jenkins:
# Manage Jenkins → Manage Credentials → Global → Add Credentials
# Kind: Secret text
# Secret: <paste-token>
# ID: sonarqube-token
```

---

## Pipeline Configuration

### 1. Create New Pipeline Job

1. **Jenkins Dashboard → New Item**
2. Enter name: `Weather-App-Pipeline`
3. Select: **Pipeline**
4. Click "OK"

### 2. Configure Pipeline

#### General Settings:
- Description: `CI/CD pipeline for Good Forecast Weather Application`
- ✅ Discard old builds: Keep last 10 builds

#### Build Triggers:
- ✅ GitHub hook trigger for GITScm polling
- ✅ Poll SCM: `H/5 * * * *` (every 5 minutes)

#### Pipeline Definition:
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/Deep-Dey1/GoodForecast.git`
- Credentials: Add GitHub credentials
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

### 3. Configure GitHub Webhook

1. Go to GitHub repository → Settings → Webhooks
2. Click "Add webhook"
3. Payload URL: `http://your-jenkins-url:8080/github-webhook/`
4. Content type: `application/json`
5. Events: ✅ Just the push event
6. Click "Add webhook"

---

## Docker Hub Integration

### 1. Create Docker Hub Access Token

1. Go to https://hub.docker.com
2. Account Settings → Security → New Access Token
3. Description: `Jenkins CI`
4. Copy the token

### 2. Add Docker Hub Credentials to Jenkins

**Manage Jenkins → Manage Credentials → Global → Add Credentials**

- Kind: **Username with password**
- Username: Your Docker Hub username
- Password: Access token (from step 1)
- ID: `dockerhub-credentials`
- Description: `Docker Hub Credentials`
- Click "OK"

### 3. Update Jenkinsfile

Replace placeholders in `Jenkinsfile`:

```groovy
DOCKER_IMAGE_BACKEND = 'your-dockerhub-username/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'your-dockerhub-username/weather-app-frontend'
```

With your actual Docker Hub username:

```groovy
DOCKER_IMAGE_BACKEND = 'deepdey/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'deepdey/weather-app-frontend'
```

---

## Environment Variables

### Configure in Jenkins Job

**Pipeline → Configure → This project is parameterized**

Add the following parameters:

1. **OPENWEATHER_API_KEY** (Secret)
   - Type: Password Parameter
   - Name: `OPENWEATHER_API_KEY`
   - Default Value: Your API key

2. **NODE_ENV** (String)
   - Type: String Parameter
   - Name: `NODE_ENV`
   - Default Value: `production`

3. **DOCKER_REGISTRY** (String)
   - Type: String Parameter
   - Name: `DOCKER_REGISTRY`
   - Default Value: `docker.io`

---

## Running the Pipeline

### Manual Trigger:
1. Go to Pipeline job
2. Click "Build Now"
3. Monitor in Blue Ocean or Console Output

### Automatic Trigger:
- Push to `main` branch triggers build
- Pull requests can be configured to trigger build

---

## Pipeline Stages Explained

| Stage | Purpose | Output |
|-------|---------|--------|
| **Git Checkout** | Clone repository from GitHub | Source code in workspace |
| **Install Dependencies** | Run `npm ci` for backend & frontend | node_modules installed |
| **Code Quality & Linting** | Run ESLint and code style checks | Lint reports |
| **Unit Testing** | Execute Jest/Mocha tests | Test reports, coverage |
| **Build Application** | Build frontend with Vite | dist/ folder with assets |
| **SonarQube Analysis** | Static code analysis | Quality metrics |
| **Quality Gate** | Check if code meets standards | Pass/Fail decision |
| **Build Docker Images** | Create Docker images | Docker images tagged |
| **Push Docker Images** | Push to Docker Hub | Images in registry |
| **Clean Up** | Remove temporary files | Clean workspace |

---

## Monitoring and Logs

### View Build Logs:
- **Console Output**: Traditional text logs
- **Blue Ocean**: Modern visual pipeline
- **Stage View**: See stage-by-stage progress

### SonarQube Dashboard:
- Navigate to: http://localhost:9000
- View project: `weather-app`
- Check metrics: Bugs, Vulnerabilities, Code Smells, Coverage

---

## Troubleshooting

### Issue: Docker permission denied

**Solution (Linux)**:
```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue: Node.js not found

**Solution**:
- Verify NodeJS tool is configured in Global Tool Configuration
- Ensure tool name matches Jenkinsfile (`NodeJS-18`)

### Issue: SonarQube Quality Gate failing

**Solution**:
1. Check SonarQube dashboard for specific issues
2. Review code coverage (should be > 80%)
3. Fix reported bugs and vulnerabilities
4. Re-run pipeline

### Issue: Docker build fails

**Solution**:
```bash
# Check Dockerfile syntax
docker build -t test-image .

# View build logs
docker build --progress=plain -t test-image .

# Check disk space
df -h
docker system prune -a
```

### Issue: GitHub webhook not triggering

**Solution**:
1. Check webhook delivery in GitHub Settings
2. Verify Jenkins URL is accessible from internet
3. Check firewall rules
4. Test with `curl`:
   ```bash
   curl -X POST http://your-jenkins:8080/github-webhook/
   ```

---

## Best Practices

1. **Security**:
   - Never commit credentials in code
   - Use Jenkins credentials store
   - Rotate tokens regularly
   - Enable CSRF protection

2. **Pipeline**:
   - Use parallel stages for speed
   - Implement proper error handling
   - Add timeouts to prevent hanging builds
   - Archive artifacts and test reports

3. **Docker**:
   - Use multi-stage builds
   - Tag images with build numbers
   - Implement image scanning (Trivy, Clair)
   - Clean up old images regularly

4. **Monitoring**:
   - Set up build notifications (Email/Slack)
   - Monitor disk space
   - Review failed builds daily
   - Track build duration trends

---

## Additional Resources

- **Jenkins Documentation**: https://www.jenkins.io/doc/
- **Pipeline Syntax**: https://www.jenkins.io/doc/book/pipeline/syntax/
- **Docker Documentation**: https://docs.docker.com/
- **SonarQube Docs**: https://docs.sonarqube.org/
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/Deep-Dey1/GoodForecast/issues
- Jenkins Community: https://www.jenkins.io/participate/
- Stack Overflow: Tag with `jenkins`, `docker`, `sonarqube`

---

**Last Updated**: October 31, 2025
**Version**: 1.0
**Author**: DevOps Team
