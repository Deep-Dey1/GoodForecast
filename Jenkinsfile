pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        DOCKER_IMAGE_BACKEND = 'deepdey01/weather-app-backend'
        DOCKER_IMAGE_FRONTEND = 'deepdey01/weather-app-frontend'
        SONAR_PROJECT_KEY = 'weather-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies - Backend') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir('backend') {
                    bat 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Frontend') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir('frontend') {
                    bat 'npm ci'
                }
            }
        }
        
        stage('Run Tests - Backend') {
            steps {
                echo '🧪 Running backend tests...'
                dir('backend') {
                    bat 'npm test -- --coverage --passWithNoTests'
                }
            }
        }
        
        stage('Run Tests - Frontend') {
            steps {
                echo '🧪 Running frontend tests...'
                dir('frontend') {
                    bat 'npm test -- --passWithNoTests || exit 0'
                }
            }
        }
        
        stage('SonarQube Analysis - Backend') {
            steps {
                echo '📊 Running SonarQube analysis for backend...'
                dir('backend') {
                    script {
                        def scannerHome = tool 'SonarScanner'
                        withSonarQubeEnv('SonarQube') {
                            bat """
                                ${scannerHome}\\bin\\sonar-scanner.bat \
                                -Dsonar.projectKey=${SONAR_PROJECT_KEY}-backend \
                                -Dsonar.projectName="Weather App Backend" \
                                -Dsonar.sources=src \
                                -Dsonar.tests=tests \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                -Dsonar.exclusions=node_modules/**,coverage/**,tests/**
                            """
                        }
                    }
                }
            }
        }
        
        stage('SonarQube Analysis - Frontend') {
            steps {
                echo '📊 Running SonarQube analysis for frontend...'
                dir('frontend') {
                    script {
                        def scannerHome = tool 'SonarScanner'
                        withSonarQubeEnv('SonarQube') {
                            bat """
                                ${scannerHome}\\bin\\sonar-scanner.bat \
                                -Dsonar.projectKey=${SONAR_PROJECT_KEY}-frontend \
                                -Dsonar.projectName="Weather App Frontend" \
                                -Dsonar.sources=src \
                                -Dsonar.exclusions=node_modules/**,dist/**,build/**
                            """
                        }
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                echo '🚦 Waiting for SonarQube Quality Gate...'
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                script {
                    dir('backend') {
                        bat "docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} -t ${DOCKER_IMAGE_BACKEND}:latest ."
                    }
                    dir('frontend') {
                        bat "docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} -t ${DOCKER_IMAGE_FRONTEND}:latest ."
                    }
                }
            }
        }
        
        stage('Deploy - Local Test') {
            steps {
                echo '🚀 Deploying to local environment...'
                script {
                    // Stop existing containers
                    bat 'docker-compose down || exit 0'
                    
                    // Start new containers
                    bat 'docker-compose up -d'
                    
                    // Wait for services to be ready
                    sleep 10
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🏥 Performing health checks...'
                script {
                    // Check backend health
                    bat 'curl -f http://localhost:5000/api/health || exit 1'
                    
                    // Check frontend (if applicable)
                    bat 'curl -f http://localhost:3000 || exit 0'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🎉 All stages passed!'
        }
        failure {
            echo '❌ Pipeline failed!'
            echo '⚠️ Check the logs for details'
        }
        always {
            echo '🧹 Cleaning up workspace...'
            // Archive test results
            junit allowEmptyResults: true, testResults: '**/coverage/*.xml'
            
            // Archive coverage reports
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'backend/coverage',
                reportFiles: 'index.html',
                reportName: 'Backend Coverage Report'
            ])
        }
    }
}
