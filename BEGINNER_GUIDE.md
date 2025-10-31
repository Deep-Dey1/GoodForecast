# 🎓 Complete Beginner's Guide - From Zero to CI/CD Hero

## 👋 Welcome!

This guide assumes you've **NEVER** used Docker, Jenkins, SonarQube, or Jest before. We'll install everything step by step.

---

## 📋 Table of Contents

1. [What You'll Learn](#what-youll-learn)
2. [Prerequisites](#prerequisites)
3. [Part 1: Install Docker](#part-1-install-docker)
4. [Part 2: Understanding the Tools](#part-2-understanding-the-tools)
5. [Part 3: Start Your First Containers](#part-3-start-your-first-containers)
6. [Part 4: Setup Jenkins](#part-4-setup-jenkins)
7. [Part 5: Setup SonarQube](#part-5-setup-sonarqube)
8. [Part 6: Configure Your Pipeline](#part-6-configure-your-pipeline)
9. [Part 7: Run Your First Build](#part-7-run-your-first-build)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 What You'll Learn

By the end of this guide, you'll be able to:
- ✅ Install and use Docker
- ✅ Understand what containers are
- ✅ Run Jenkins for CI/CD
- ✅ Use SonarQube for code quality
- ✅ Create automated pipelines
- ✅ Build and deploy your app automatically

**Estimated Time**: 1-2 hours (first time)

---

## 📦 Prerequisites

### What You Need:
- ✅ Windows 10/11 (64-bit) or Linux or macOS
- ✅ At least 8GB RAM (16GB recommended)
- ✅ 20GB free disk space
- ✅ Admin/Administrator access
- ✅ Internet connection
- ✅ Your Weather App code (already have it!)

### Accounts You'll Create (Free):
1. Docker Hub account - https://hub.docker.com (for storing images)

That's it! Everything else runs on your computer.

---

## 🐳 Part 1: Install Docker

### What is Docker?
Docker is like a "shipping container" for your applications. It packages your app with everything it needs to run.

### For Windows 10/11:

#### Step 1.1: Check Your Windows Version
```bash
# Open PowerShell and run:
winver

# You need: Windows 10 64-bit (version 1903+) or Windows 11
```

#### Step 1.2: Enable WSL 2 (Windows Subsystem for Linux)
```bash
# Open PowerShell as Administrator and run:
wsl --install

# Restart your computer when prompted
```

#### Step 1.3: Download Docker Desktop
1. Go to: https://www.docker.com/products/docker-desktop/
2. Click "Download for Windows"
3. Run the installer `Docker Desktop Installer.exe`
4. Follow the installation wizard
5. **Important**: Check "Use WSL 2 instead of Hyper-V"
6. Restart your computer

#### Step 1.4: Verify Docker Installation
```bash
# Open Command Prompt or PowerShell and run:
docker --version
# Should show: Docker version 24.x.x or higher

docker run hello-world
# Should download and run a test container
```

### For macOS:

#### Step 1.1: Download Docker Desktop
1. Go to: https://www.docker.com/products/docker-desktop/
2. Download for Mac (Intel or Apple Silicon)
3. Open the .dmg file
4. Drag Docker to Applications folder
5. Open Docker from Applications

#### Step 1.2: Verify Installation
```bash
# Open Terminal and run:
docker --version
docker run hello-world
```

### For Linux (Ubuntu/Debian):

```bash
# Update package list
sudo apt-get update

# Install prerequisites
sudo apt-get install ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group (so you don't need sudo)
sudo usermod -aG docker $USER

# Log out and log back in, then verify:
docker --version
docker run hello-world
```

---

## 📚 Part 2: Understanding the Tools

### What is Jenkins?
**Simple Explanation**: Jenkins is like a robot that automatically tests and builds your code every time you make changes.

**What it does**:
- Runs tests automatically
- Builds your application
- Tells you if something broke
- Can deploy your app

### What is SonarQube?
**Simple Explanation**: SonarQube is like a code reviewer that checks if your code is good quality.

**What it checks**:
- Bugs in your code
- Security vulnerabilities
- Code smells (bad practices)
- Test coverage
- Code duplication

### What is Jest?
**Simple Explanation**: Jest is a tool that runs tests on your JavaScript code.

**What it does**:
- Runs unit tests
- Checks if functions work correctly
- Measures code coverage
- Generates test reports

### What is a Quality Gate?
**Simple Explanation**: It's like a checkpoint. Your code must pass certain standards before it's allowed to proceed.

**Example standards**:
- Must have 80% test coverage
- No critical bugs
- No security vulnerabilities

### What is Docker Compose?
**Simple Explanation**: Instead of running one container, Docker Compose lets you run multiple containers together (like Jenkins + SonarQube + Database).

---

## 🚀 Part 3: Start Your First Containers

### Step 3.1: Understand the Files

In your project, you have these files:
```
weatherApp/
├── docker-compose.cicd.yml    # This starts Jenkins, SonarQube, etc.
├── docker-compose.yml          # This starts your Weather App
```

### Step 3.2: Navigate to Your Project

```bash
# Open Command Prompt or Terminal
cd C:\Users\deepd\home-dir-6\programming\weatherApp

# Or on Mac/Linux:
# cd /path/to/your/weatherApp
```

### Step 3.3: Start CI/CD Services

```bash
# This command starts Jenkins and SonarQube
docker-compose -f docker-compose.cicd.yml up -d

# Wait 2-3 minutes for services to start...
```

**What's happening?**
- Docker is downloading images (like installing software)
- Jenkins is starting on port 8080
- SonarQube is starting on port 9000
- PostgreSQL database is starting for SonarQube

### Step 3.4: Check if Services are Running

```bash
# See all running containers
docker ps

# You should see:
# - weather-app-jenkins
# - weather-app-sonarqube
# - weather-app-sonarqube-db
```

**If you see errors**, see [Troubleshooting](#troubleshooting) section below.

---

## 🛠️ Part 4: Setup Jenkins

### Step 4.1: Access Jenkins

1. Open your browser
2. Go to: **http://localhost:8080**
3. You'll see a "Getting Started" page

### Step 4.2: Get Initial Password

```bash
# Run this command to get the password:
docker exec weather-app-jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Copy the password (it's a long string like: 1a2b3c4d5e6f7g8h9i0j...)
```

### Step 4.3: Initial Setup Wizard

1. **Paste the password** you copied
2. Click "Continue"
3. Select **"Install suggested plugins"**
4. Wait for plugins to install (5-10 minutes)

### Step 4.4: Create Admin User

1. Fill in the form:
   - Username: `admin` (or your choice)
   - Password: `your-password` (remember this!)
   - Full name: `Your Name`
   - Email: `your@email.com`
2. Click "Save and Continue"
3. Keep the default Jenkins URL
4. Click "Save and Finish"
5. Click "Start using Jenkins"

**🎉 Congratulations! Jenkins is now running!**

### Step 4.5: Install Required Plugins

1. Click **"Manage Jenkins"** (left sidebar)
2. Click **"Manage Plugins"**
3. Click **"Available"** tab
4. In the search box, type: `NodeJS`
   - ✅ Check "NodeJS Plugin"
5. Search: `Docker`
   - ✅ Check "Docker Pipeline"
   - ✅ Check "Docker Plugin"
6. Search: `SonarQube`
   - ✅ Check "SonarQube Scanner"
7. Click **"Install without restart"**
8. Wait for installation to complete
9. ✅ Check "Restart Jenkins when installation is complete"

**Wait for Jenkins to restart** (2-3 minutes)

### Step 4.6: Configure Node.js Tool

1. Go to **Manage Jenkins → Global Tool Configuration**
2. Scroll down to **NodeJS** section
3. Click **"Add NodeJS"**
4. Fill in:
   - Name: `NodeJS-18`
   - ✅ Check "Install automatically"
   - Version: Select `NodeJS 18.x.x` (latest 18 version)
5. Click **"Save"**

### Step 4.7: Configure Docker

1. Still in **Global Tool Configuration**
2. Scroll to **Docker** section
3. Click **"Add Docker"**
4. Fill in:
   - Name: `docker`
   - ✅ Check "Install automatically"
   - Select latest version
5. Click **"Save"**

---

## 🔍 Part 5: Setup SonarQube

### Step 5.1: Access SonarQube

1. Open browser
2. Go to: **http://localhost:9000**
3. Wait if it says "SonarQube is starting..." (2-3 minutes)

### Step 5.2: First Login

1. Username: `admin`
2. Password: `admin`
3. Click "Log in"
4. **You'll be forced to change password**
5. New password: `your-new-password` (remember this!)
6. Confirm password
7. Click "Update"

### Step 5.3: Create a Project

1. Click **"Create Project"** (or "Manually")
2. Fill in:
   - Project key: `weather-app`
   - Display name: `Weather App`
3. Click **"Set Up"**
4. Select **"Locally"**
5. Generate a token:
   - Token name: `jenkins-token`
   - Click **"Generate"**
   - **COPY THIS TOKEN!** (You'll need it in next step)
   - It looks like: `sqp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8`
6. Click "Continue"

### Step 5.4: Add SonarQube Token to Jenkins

1. Go back to **Jenkins** (http://localhost:8080)
2. Click **Manage Jenkins → Manage Credentials**
3. Click **"(global)"** domain
4. Click **"Add Credentials"** (left sidebar)
5. Fill in:
   - Kind: **Secret text**
   - Scope: **Global**
   - Secret: **[Paste the SonarQube token you copied]**
   - ID: `sonarqube-token`
   - Description: `SonarQube Token`
6. Click **"Create"**

### Step 5.5: Configure SonarQube Server in Jenkins

1. **Manage Jenkins → Configure System**
2. Scroll down to **SonarQube servers** section
3. ✅ Check "Environment variables"
4. Click **"Add SonarQube"**
5. Fill in:
   - Name: `SonarQube`
   - Server URL: `http://sonarqube:9000`
   - Server authentication token: Select `sonarqube-token`
6. Click **"Save"**

---

## 🔑 Part 6: Configure Your Pipeline

### Step 6.1: Create Docker Hub Account

1. Go to: https://hub.docker.com
2. Click **"Sign Up"**
3. Create account (it's free!)
4. Verify your email

### Step 6.2: Create Docker Hub Access Token

1. Login to Docker Hub
2. Click your **username** (top right) → **Account Settings**
3. Click **"Security"** → **"New Access Token"**
4. Description: `Jenkins CI`
5. Access permissions: **Read, Write, Delete**
6. Click **"Generate"**
7. **COPY THE TOKEN!** (You can't see it again)
8. Click "Copy and Close"

### Step 6.3: Add Docker Hub Credentials to Jenkins

1. Go to **Jenkins** (http://localhost:8080)
2. **Manage Jenkins → Manage Credentials**
3. Click **(global)**
4. Click **"Add Credentials"**
5. Fill in:
   - Kind: **Username with password**
   - Scope: **Global**
   - Username: `your-dockerhub-username`
   - Password: **[Paste the Docker Hub token]**
   - ID: `dockerhub-credentials`
   - Description: `Docker Hub Credentials`
6. Click **"Create"**

### Step 6.4: Update Jenkinsfile with Your Docker Hub Username

```bash
# In your terminal, open the Jenkinsfile:
# Windows:
notepad Jenkinsfile

# Mac/Linux:
nano Jenkinsfile
# or
code Jenkinsfile
```

Find these lines (around line 6-7):
```groovy
DOCKER_IMAGE_BACKEND = 'your-dockerhub-username/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'your-dockerhub-username/weather-app-frontend'
```

**Replace with YOUR Docker Hub username**:
```groovy
DOCKER_IMAGE_BACKEND = 'deepdey/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'deepdey/weather-app-frontend'
```

Save the file!

### Step 6.5: Commit Changes

```bash
git add Jenkinsfile
git commit -m "Update Docker Hub username"
git push origin main
```

---

## 🎬 Part 7: Run Your First Build

### Step 7.1: Create Pipeline Job in Jenkins

1. Go to **Jenkins Dashboard** (http://localhost:8080)
2. Click **"New Item"** (left sidebar)
3. Enter name: `Weather-App-Pipeline`
4. Select **"Pipeline"**
5. Click **"OK"**

### Step 7.2: Configure the Pipeline

#### General Section:
- Description: `CI/CD Pipeline for Weather Application`
- ✅ Check "GitHub project"
- Project url: `https://github.com/Deep-Dey1/GoodForecast/`

#### Build Triggers:
- ✅ Check "Poll SCM"
- Schedule: `H/5 * * * *` (checks every 5 minutes)

#### Pipeline Section:
- Definition: Select **"Pipeline script from SCM"**
- SCM: Select **"Git"**
- Repository URL: `https://github.com/Deep-Dey1/GoodForecast.git`
- Credentials: (Leave as "none" for public repo)
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

Click **"Save"**

### Step 7.3: Run Your First Build! 🎉

1. You're now on the pipeline page
2. Click **"Build Now"** (left sidebar)
3. You'll see a build starting in "Build History"
4. Click on **#1** (the build number)
5. Click **"Console Output"** to see logs

**What's happening:**
```
Stage 1: Git Checkout       ✓ (Cloning your code)
Stage 2: Install Deps       ⏳ (Installing npm packages)
Stage 3: Lint              ⏳ (Checking code quality)
Stage 4: Tests             ⏳ (Running tests)
Stage 5: Build             ⏳ (Building frontend)
Stage 6: SonarQube         ⏳ (Analyzing code)
Stage 7: Quality Gate      ⏳ (Checking standards)
Stage 8: Docker Build      ⏳ (Creating images)
Stage 9: Push Images       ⏳ (Uploading to Docker Hub)
Stage 10: Cleanup          ⏳ (Cleaning up)
```

**First build takes 15-20 minutes** (downloading dependencies)

### Step 7.4: Check Results

#### In Jenkins:
- ✅ Green = Success
- ❌ Red = Failed
- Click on build → "Console Output" to see logs

#### In SonarQube:
1. Go to http://localhost:9000
2. You should see your project with analysis results
3. Click on it to see:
   - Bugs found
   - Code smells
   - Security vulnerabilities
   - Code coverage

#### In Docker Hub:
1. Login to https://hub.docker.com
2. Go to "Repositories"
3. You should see:
   - `your-username/weather-app-backend`
   - `your-username/weather-app-frontend`

---

## 🎓 Understanding What Just Happened

### The Pipeline Flow:

```
1. You clicked "Build Now"
   ↓
2. Jenkins cloned your GitHub repository
   ↓
3. Jenkins installed all npm packages
   ↓
4. Jenkins ran your tests
   ↓
5. Jenkins built your frontend
   ↓
6. SonarQube analyzed your code for quality
   ↓
7. Jenkins created Docker images
   ↓
8. Jenkins pushed images to Docker Hub
   ↓
9. Done! Your app is ready to deploy
```

### Benefits You Now Have:

✅ **Automatic Testing**: Every code change is tested
✅ **Quality Checks**: SonarQube ensures good code
✅ **Containerization**: Your app works anywhere
✅ **Automated Deployment**: Ready to deploy automatically
✅ **Visibility**: See exactly what's happening

---

## 🐛 Troubleshooting

### Problem: Docker Desktop won't start

**Solution for Windows**:
```bash
# 1. Enable virtualization in BIOS
# 2. Enable Hyper-V or WSL 2
# 3. Run as Administrator:
wsl --update
wsl --set-default-version 2
```

**Solution for Mac**:
```bash
# Give Docker full disk access:
# System Preferences → Security & Privacy → Privacy → Full Disk Access
# Add Docker.app
```

### Problem: Port 8080 already in use

**Find what's using the port**:
```bash
# Windows:
netstat -ano | findstr :8080

# Mac/Linux:
lsof -i :8080

# Kill the process or change Jenkins port in docker-compose.cicd.yml
```

### Problem: Jenkins container won't start

```bash
# Check logs:
docker logs weather-app-jenkins

# Restart container:
docker restart weather-app-jenkins

# If still failing, recreate:
docker-compose -f docker-compose.cicd.yml down
docker-compose -f docker-compose.cicd.yml up -d
```

### Problem: SonarQube says "Not enough memory"

```bash
# Give Docker more memory:
# Docker Desktop → Settings → Resources → Memory
# Increase to at least 6GB
```

### Problem: Pipeline fails at "npm install"

**Solution**:
```bash
# Check internet connection
# Check if Node.js tool is configured correctly
# In Jenkins: Manage Jenkins → Global Tool Configuration → NodeJS
# Ensure "NodeJS-18" is configured
```

### Problem: Docker build fails with "permission denied"

**Windows**:
```bash
# Run Docker Desktop as Administrator
```

**Linux**:
```bash
# Add user to docker group:
sudo usermod -aG docker $USER
# Log out and log back in
```

### Problem: Can't access localhost:8080

**Check if Jenkins is running**:
```bash
docker ps | grep jenkins

# If not running:
docker-compose -f docker-compose.cicd.yml up -d jenkins
```

### Problem: Build hangs at Quality Gate

**Solution**:
```bash
# Check if SonarQube is responding:
curl http://localhost:9000

# Restart SonarQube:
docker restart weather-app-sonarqube

# In Jenkins, go to Configure → SonarQube servers
# Test connection
```

---

## 📝 Useful Commands to Remember

### Docker Commands:
```bash
# See all running containers
docker ps

# See all containers (including stopped)
docker ps -a

# Stop a container
docker stop weather-app-jenkins

# Start a container
docker start weather-app-jenkins

# View container logs
docker logs weather-app-jenkins
docker logs -f weather-app-jenkins  # Follow logs live

# Remove a container
docker rm weather-app-jenkins

# See all images
docker images

# Remove an image
docker rmi image-name

# Clean up unused resources
docker system prune -a

# Restart all services
docker-compose -f docker-compose.cicd.yml restart
```

### Docker Compose Commands:
```bash
# Start all services in background
docker-compose -f docker-compose.cicd.yml up -d

# Stop all services
docker-compose -f docker-compose.cicd.yml down

# View logs of all services
docker-compose -f docker-compose.cicd.yml logs

# Restart a specific service
docker-compose -f docker-compose.cicd.yml restart jenkins
```

---

## 🎯 What to Do Next

### Day 1 (Today): ✅ Done!
- ✅ Install Docker
- ✅ Start Jenkins and SonarQube
- ✅ Run first build

### Day 2: Learn and Improve
- Read SonarQube reports
- Fix any bugs it finds
- Add more tests to increase coverage
- Understand each pipeline stage

### Day 3: Automation
- Set up GitHub webhook for automatic builds
- Configure email notifications
- Try making code changes and see pipeline run

### Future: Advanced Features
- Deploy to cloud (AWS, Azure, GCP)
- Add security scanning
- Implement blue-green deployment
- Add performance testing

---

## 📚 Learning Resources

### Docker:
- Official Docs: https://docs.docker.com/get-started/
- Docker 101 Tutorial: https://www.docker.com/101-tutorial/

### Jenkins:
- Official Docs: https://www.jenkins.io/doc/book/
- Pipeline Tutorial: https://www.jenkins.io/doc/pipeline/tour/hello-world/

### SonarQube:
- Official Docs: https://docs.sonarqube.org/
- Getting Started: https://docs.sonarqube.org/latest/setup/get-started-2-minutes/

### Jest:
- Official Docs: https://jestjs.io/docs/getting-started
- Testing Best Practices: https://jestjs.io/docs/tutorial-react

---

## 💪 You Did It!

Congratulations! You've successfully:
- ✅ Installed Docker from scratch
- ✅ Set up Jenkins CI/CD server
- ✅ Configured SonarQube for code quality
- ✅ Created your first automated pipeline
- ✅ Built and published Docker images

**This is professional-grade DevOps!** 🚀

---

## 🆘 Need More Help?

If you get stuck:

1. **Check this guide** first - most issues are covered
2. **Read error messages** - they usually tell you what's wrong
3. **Check Docker logs**: `docker logs container-name`
4. **Google the error** - you're probably not the first with this issue
5. **Ask for help** - Post the error with context

---

**Remember**: Everyone was a beginner once. Take your time, read error messages, and don't be afraid to experiment!

**Good luck!** 🎉

---

Last Updated: October 31, 2025  
Version: 1.0 - Complete Beginner's Edition
