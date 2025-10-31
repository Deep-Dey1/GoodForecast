# 🗺️ Your DevOps Journey Roadmap

## Start Here! → Complete in 3-4 Hours

---

## 📍 Step 1: Install Docker (30 minutes)

### What You Need:
- Windows 10/11 (64-bit) OR Mac OR Linux
- 8GB+ RAM
- Admin access

### What To Do:

#### ✅ Windows Users:
1. Download Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Install WSL 2: `wsl --install` in PowerShell (Admin)
3. Restart computer
4. Install Docker Desktop
5. Test: `docker run hello-world`

#### ✅ Mac Users:
1. Download Docker Desktop for Mac
2. Install by dragging to Applications
3. Open Docker from Applications
4. Test: `docker run hello-world`

#### ✅ Linux Users:
```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
# Log out and back in
docker run hello-world
```

**✅ Success Check**: Run `docker --version` - should show version 24.x or higher

---

## 📍 Step 2: Start CI/CD Services (10 minutes)

### What To Do:

```bash
# 1. Open Terminal/Command Prompt
cd C:\Users\deepd\home-dir-6\programming\weatherApp

# 2. Start Jenkins, SonarQube, Database
docker-compose -f docker-compose.cicd.yml up -d

# 3. Wait 3 minutes for services to start

# 4. Check if running
docker ps
```

**✅ Success Check**: You should see 3 containers running:
- weather-app-jenkins
- weather-app-sonarqube
- weather-app-sonarqube-db

---

## 📍 Step 3: Setup Jenkins (30 minutes)

### 3.1 First Login

1. **Open**: http://localhost:8080
2. **Get password**:
   ```bash
   docker exec weather-app-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. **Paste password** → Continue
4. **Install suggested plugins** → Wait 5-10 minutes
5. **Create admin user**:
   - Username: `admin`
   - Password: `your-password` ⚠️ Remember this!
   - Email: your email

### 3.2 Install Required Plugins

1. **Manage Jenkins** → **Manage Plugins** → **Available**
2. Search and install:
   - ✅ NodeJS Plugin
   - ✅ Docker Pipeline
   - ✅ Docker Plugin
   - ✅ SonarQube Scanner
3. **Install without restart**
4. ✅ Check "Restart when complete"
5. Wait 2-3 minutes

### 3.3 Configure Tools

1. **Manage Jenkins** → **Global Tool Configuration**

2. **NodeJS Section**:
   - Click "Add NodeJS"
   - Name: `NodeJS-18`
   - ✅ Install automatically
   - Version: Select latest 18.x

3. **Docker Section**:
   - Click "Add Docker"
   - Name: `docker`
   - ✅ Install automatically

4. **SonarQube Scanner**:
   - Click "Add SonarQube Scanner"
   - Name: `SonarQubeScanner`
   - ✅ Install automatically

5. **Save**

**✅ Success Check**: All three tools should be configured

---

## 📍 Step 4: Setup SonarQube (20 minutes)

### 4.1 First Login

1. **Open**: http://localhost:9000
2. **Wait** if "SonarQube is starting..." (2-3 min)
3. **Login**:
   - Username: `admin`
   - Password: `admin`
4. **Change password**: Create new password ⚠️ Remember this!

### 4.2 Create Project & Token

1. Click **"Create Project"** → **"Manually"**
2. Fill in:
   - Project key: `weather-app`
   - Display name: `Weather App`
3. Click **"Set Up"** → **"Locally"**
4. **Generate token**:
   - Name: `jenkins-token`
   - Click **"Generate"**
   - **⚠️ COPY THIS TOKEN!** (looks like: `sqp_abc123...`)
   - Click "Continue"

### 4.3 Add Token to Jenkins

1. Go to **Jenkins**: http://localhost:8080
2. **Manage Jenkins** → **Manage Credentials** → **(global)** → **Add Credentials**
3. Fill in:
   - Kind: **Secret text**
   - Secret: **[Paste SonarQube token]**
   - ID: `sonarqube-token`
4. Click **"Create"**

### 4.4 Configure SonarQube Server

1. **Manage Jenkins** → **Configure System**
2. Scroll to **SonarQube servers**
3. ✅ Check "Environment variables"
4. Click **"Add SonarQube"**
5. Fill in:
   - Name: `SonarQube`
   - URL: `http://sonarqube:9000`
   - Token: Select `sonarqube-token`
6. **Save**

**✅ Success Check**: Test connection should work

---

## 📍 Step 5: Setup Docker Hub (15 minutes)

### 5.1 Create Account

1. Go to: https://hub.docker.com
2. **Sign Up** (Free)
3. **Verify email**

### 5.2 Create Access Token

1. **Login** → **Account Settings** → **Security**
2. Click **"New Access Token"**
3. Description: `Jenkins CI`
4. Permissions: **Read, Write, Delete**
5. **Generate**
6. **⚠️ COPY THE TOKEN!** (can't see it again)

### 5.3 Add to Jenkins

1. **Jenkins** → **Manage Jenkins** → **Manage Credentials** → **(global)**
2. **Add Credentials**
3. Fill in:
   - Kind: **Username with password**
   - Username: `your-dockerhub-username`
   - Password: **[Paste Docker Hub token]**
   - ID: `dockerhub-credentials`
4. **Create**

**✅ Success Check**: Credentials should be saved

---

## 📍 Step 6: Update Jenkinsfile (10 minutes)

### 6.1 Edit Jenkinsfile

**Windows**:
```bash
notepad Jenkinsfile
```

**Mac/Linux**:
```bash
nano Jenkinsfile
# or
code Jenkinsfile
```

### 6.2 Find and Replace

**Find** (around line 6-7):
```groovy
DOCKER_IMAGE_BACKEND = 'your-dockerhub-username/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'your-dockerhub-username/weather-app-frontend'
```

**Replace with YOUR username**:
```groovy
DOCKER_IMAGE_BACKEND = 'deepdey/weather-app-backend'
DOCKER_IMAGE_FRONTEND = 'deepdey/weather-app-frontend'
```

### 6.3 Save and Commit

```bash
git add Jenkinsfile
git commit -m "Update Docker Hub username"
git push origin main
```

**✅ Success Check**: Changes pushed to GitHub

---

## 📍 Step 7: Create Pipeline (15 minutes)

### 7.1 Create New Pipeline

1. **Jenkins Dashboard** → **New Item**
2. Name: `Weather-App-Pipeline`
3. Type: **Pipeline**
4. Click **OK**

### 7.2 Configure Pipeline

**General**:
- Description: `CI/CD for Weather App`
- ✅ GitHub project: `https://github.com/Deep-Dey1/GoodForecast/`

**Build Triggers**:
- ✅ Poll SCM
- Schedule: `H/5 * * * *`

**Pipeline**:
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/Deep-Dey1/GoodForecast.git`
- Branch: `*/main`
- Script Path: `Jenkinsfile`

### 7.3 Save

Click **"Save"**

**✅ Success Check**: Pipeline should be created

---

## 📍 Step 8: Run First Build! 🚀 (20 minutes)

### 8.1 Start Build

1. Click **"Build Now"** (left sidebar)
2. Watch build in "Build History"
3. Click **#1** → **"Console Output"**

### 8.2 Watch Progress

```
✓ Git Checkout
✓ Install Dependencies
✓ Code Quality
✓ Unit Testing
✓ Build Application
✓ SonarQube Analysis
✓ Quality Gate
✓ Build Docker Images
✓ Push Images
✓ Clean Up
```

**First build takes 15-20 minutes** (downloading everything)

### 8.3 Check Results

#### Jenkins:
- Should show **✅ SUCCESS**
- Build time: ~15-20 min

#### SonarQube:
1. Go to http://localhost:9000
2. Click on "weather-app"
3. See code quality metrics

#### Docker Hub:
1. Login to https://hub.docker.com
2. Check "Repositories"
3. Should see your 2 images

**✅ Success Check**: All green, images in Docker Hub!

---

## 🎉 You're Done!

### What You Achieved:

✅ **Installed Docker** - Container platform  
✅ **Setup Jenkins** - CI/CD automation  
✅ **Setup SonarQube** - Code quality  
✅ **Created Pipeline** - Automated workflow  
✅ **Built & Published** - Docker images  

### What Happens Now:

Every time you push code to GitHub:
1. Jenkins automatically starts
2. Code is tested
3. Quality is checked
4. Docker images are built
5. Images pushed to Docker Hub
6. You get notified!

---

## 🔄 Daily Workflow

```
Write Code → Git Push → Pipeline Runs Automatically → Get Results
```

That's it! No manual building anymore! 🚀

---

## 📊 What Each Tool Does

| Tool | What It Does | When You Use It |
|------|--------------|-----------------|
| **Docker** | Packages your app | Always running |
| **Jenkins** | Automates builds | Every code push |
| **SonarQube** | Checks code quality | Every build |
| **Docker Hub** | Stores images | After successful build |

---

## 🆘 Quick Help

### If Jenkins won't start:
```bash
docker restart weather-app-jenkins
docker logs weather-app-jenkins
```

### If SonarQube won't start:
```bash
docker restart weather-app-sonarqube
# Give Docker more memory (Settings → Resources → 6GB+)
```

### If build fails:
1. Check Console Output in Jenkins
2. Read the error message
3. Google the error
4. Check BEGINNER_GUIDE.md Troubleshooting

---

## 📚 Read These Next:

1. **BEGINNER_GUIDE.md** - Detailed explanations
2. **QUICKSTART_DEVOPS.md** - Quick reference
3. **JENKINS_SETUP.md** - Advanced Jenkins config
4. **DEVOPS_OVERVIEW.md** - Architecture details

---

## 🎯 Next Steps (Optional)

### Week 1:
- ✅ Everything working
- Explore Jenkins features
- Check SonarQube reports
- Fix any code issues it finds

### Week 2:
- Add more tests
- Increase code coverage
- Configure email notifications
- Setup GitHub webhook for auto-builds

### Month 1:
- Deploy to production
- Add monitoring
- Setup blue-green deployment
- Add performance testing

---

## 💡 Pro Tips

1. **Keep Docker running** - Jenkins needs it
2. **Check SonarQube weekly** - Improve code quality
3. **Review failed builds immediately** - Don't let them pile up
4. **Keep credentials safe** - Never commit tokens to Git
5. **Update regularly** - Keep tools up to date

---

## 🎓 You're Now a DevOps Engineer!

**Skills You Have**:
- Docker containerization ✅
- Jenkins CI/CD ✅
- SonarQube quality gates ✅
- Automated testing ✅
- Container registry ✅

**Add to Resume**:
- "Implemented CI/CD pipeline with Jenkins"
- "Containerized applications with Docker"
- "Integrated SonarQube for code quality"
- "Automated build and deployment process"

---

## 🚀 Ready to Build More?

Your pipeline is ready!

**Try this**:
1. Change something in your code
2. Push to GitHub
3. Watch Jenkins automatically:
   - Test it
   - Build it
   - Quality check it
   - Containerize it
   - Publish it

**That's the power of DevOps!** 🎉

---

**Questions?** Check BEGINNER_GUIDE.md → Troubleshooting section

**Good luck!** 🌟

---

Last Updated: October 31, 2025  
Total Time: 3-4 hours  
Difficulty: Beginner-Friendly ⭐⭐
